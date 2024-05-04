# IoC/DI容器
在示例项目中您能看到 module.go 文件中使用了 github.com/zeddy-go/zeddy/container 包。
它是框架的核心，框架和其他代码都围绕着它运作。
IoC/DI 的概念，这里不再赘述。它的用法也是非常简单。
下面是两个例子：
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

//操作1
b, _ := container.Resolve[*B]()
fmt.Printf("%+v\n", b)

//操作2
container.Invoke(func(b *B) {
    fmt.Printf("%+v\n", b)
})
```
操作1的效果等于操作2的效果。

Bind函数默认以单件模式绑定对象，若需以非单件模式绑定可以使用 `container.NoSingleton` 选项：
```go
container.Bind[*A](func() *A {
    return &A{}
}, container.NoSingleton())
```

## 隐式接口的问题以及解决方案
因为golang为隐式接口，容器在处理对象时，可能因为不同对象都实现了同一接口而导致绑定或查找对象的行为与预期不一致。
container 包实现了按照一个字符串类型的key来绑定的特性。
有key和无key的对象是相互独立的，当你有两个实现了同一个接口的对象需要放到容器中时，使用key开区分他们。
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

s, _ := container.Resolve[Human](container.WithResolveKey("student")) //学生对象
t, _ := container.Resolve[Human](container.WithResolveKey("teacher")) //老师对象

foo, err := container.Resolve[Human]() //err为非nil,找不到实现了Human的非key绑定对象
```