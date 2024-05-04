# IoC/DI container
In the sample project, you can see that the module.go file utilizes the package github.com/zeddy-go/zeddy/container.
It is the core of the framework, around which both the framework and other code revolve.
The concept of IoC/DI will not be further elaborated here. Its usage is also very straightforward.
Below are two examples:
```go
type A struct{}

type B struct {
    *A
}

_ = container.Bind[*A](func() *A {
    return &A{}
})

_ = container.Bind[*B](func(a *A) *B {
    return &B{
        A: a,
    }
})

//Operation 1
b, _ := container.Resolve[*B]()
fmt.Printf("%+v\n", b)

//Operation 2
container.Invoke(func(b *B) {
    fmt.Printf("%+v\n", b)
})
```
The effect of Operation 1 is equivalent to the effect of Operation 2.

The `Bind` function defaults to binding objects in a singleton pattern. 
If you need to bind without a singleton pattern, you can use the `container.NoSingleton` option:

```go
container.Bind[*A](func() *A {
    return &A{}
}, container.NoSingleton())
```

## Issues and Solutions of Implicit Interfaces
Because Go is an implicit interface, when the container processes objects, the behavior of binding or looking up objects may be inconsistent with expectations due to different objects implementing the same interface.
The container package implements the feature of binding based on a string-type key.
Objects with keys and those without are independent of each other. 
When you have two objects that implement the same interface and you need to put them into the container, use keys to distinguish them.
```go
type Human interface {
    Say()
}

func NewStudent() *Student {
    return &Student{}
}
type Student struct {}
func (*Student) Say() {
    println("I am student!")
}

func NewTeacher() *Teacher {
    return &Teacher{}
}
type Teacher struct {}
func (*Teacher) Say() {
    println("I am teacher!")
}

container.Bind[Human](NewStudent, container.WithKey("student"))
container.Bind[Human](NewTeacher, container.WithKey("teacher"))

s, _ := container.Resolve[Human](container.WithResolveKey("student")) //Student Object
t, _ := container.Resolve[Human](container.WithResolveKey("teacher")) //Teacher Object

foo, err := container.Resolve[Human]() //err is not nil, unable to find a non-key bound object implementing Human.
```