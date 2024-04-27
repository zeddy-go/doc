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