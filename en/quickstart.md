# Quick Start
Here are some project examples for you to get started quickly. In theory, as long as the app package can run the framework modules you define, any directory structure is feasible.

## HTTP Service
Clone the code to your local machine:
```bash
git clone -b step1 --single-branch git@github.com:zeddy-go/quickstart.git
```
We can see the following directory structure:
```
.
├── conf                       // Configuration
│   ├── config.go
│   └── config.yaml
├── go.mod
├── go.sum
├── main.go                     // Entry file
└── module                      // Modules
    └── user                    // User module
        ├── iface               // Interface layer
        │     └── http          // HTTP interface
        │         └── user.go   // User handler
        └── module.go           // Module entry
```
We use the `embed` method to load configurations, then make changes to the configurations through environment variables. This approach is very convenient for containerized deployment scenarios.

We reference the `ginx` module and the `user` module. The `ginx` module is a built-in framework module that handles HTTP requests, using `gin` at the bottom layer.

::: tip
You can use any HTTP library you like to write your own HTTP processing module. Or you can reinvent the wheel :100:.
:::

The `user` module is our own business module. The `user` module implements a handler method that outputs a JSON response of "hello xxxx!" when it receives a request (`module/user/iface/http/user.go`). Then, it registers a route with the `ginx` module to handle the corresponding requests (`module/user/module.go:30`).

Here you will notice the `container.Invoke` method. Yes, the framework uses dependency injection (we are trying to find a balance between development efficiency and execution efficiency).

The object instantiation method is bound in the `Init` method mentioned above (`module/user/module.go:21`).

::: tip
Please bind the instantiation method in the `Init` method, and use them in the `Boot` method or elsewhere.
:::

Start the service with `go run .`, then access `http://localhost:8080/hello?username=zed`.

## More Complete Example
Clone the code to your local machine:
```bash
git clone -b step2 --single-branch git@github.com:zeddy-go/quickstart.git
```
In this example, the directory structure is as follows:
```
.
├── config                                // Configuration
│   ├── config.go
│   └── config.yaml
├── docker-compose.yaml                   // This example uses Docker to start the MySQL database
├── go.mod
├── go.sum
├── main.go                               // Entry file
└── module
    └── user
        ├── domain                        // Domain layer
        │         ├── contract.go         // Some interfaces
        │         ├── svc                 // Services
        │         │     └── user.go
        │         └── user.go             // Domain entity
        ├── iface                         // Interface layer
        │         └── http
        │               ├── payload.go
        │               └── user.go       // User handler
        ├── infra
        │         ├── migration           // Migration
        │         │     ├── 20240408063653_create_users_table.down.sql
        │         │     ├── 20240408063653_create_users_table.up.sql
        │         │     └── migration.go
        │         ├── model               // Data model
        │         │     └── user.go
        │         ├── repo                // Repository
        │         │     └── user.go
        │         └── seed                // Data seeding
        │               └── user.go
        └── module.go                     // Module entry
```

## Data Operations

In this example, the data model is similar to the domain entity, but in actual projects, a domain entity may also be composed of data from multiple data models. Business logic only uses domain entities, so when operating on data through a repository, the repository will help us with bidirectional conversion.

::: tip
The repository has a simple conversion logic built-in, but it may not suffice for complex situations. In this case, you will need to define your own conversion logic.
:::

## Data Migration

The built-in migration module of the framework uses the `github.com/golang-migrate/migrate` package to implement migrations. This also needs to be registered in the module entry (`module/user/module.go:41`). After the program starts, the database tables will be automatically created.

## Data Seeding

The framework has built-in data seeding, which is quite simple in principle; it utilizes the container to execute functions. This also needs to be registered in the module entry (`module/user/module.go:42`). After the program starts, the data will be automatically seeded into the database.

## User Handler

In the `user` handler, we have added two methods: one for creating a user and another for retrieving user information. Like the first example, we have also registered two new routes in `module.go`.

You will notice that these two new methods have a different number of return values compared to the methods in the first example. This is another feature of the framework: variable parameters and return values for each handler function.

The framework allows you to design your own parameters and return values for each handler function. For parameters, the framework will iterate through the parameter list, looking for objects in the container (dependency injection) or parsing request parameters. For return values, the framework will iterate through the return value list to decide how to return the response.

## Adding gRPC Service

Clone the code to your local machine:
```bash
git clone -b step3 --single-branch git@github.com:zeddy-go/quickstart.git
```
We add gRPC service on top of the previous project, allowing our service to handle both HTTP and gRPC, and also to demonstrate the characteristic of code reuse. Of course, if your project only requires gRPC, you can completely ignore the HTTP-related code.

The project directory structure is as follows:
```
.
├── conf
│    ├── config.go
│    └── config.yaml
├── docker-compose.yaml
├── go.mod
├── go.sum
├── main.go
├── module
│       └── user
│             ├── domain
│             │       ├── contract.go
│             │       ├── svc
│             │       │     └── user.go
│             │       └── user.go
│             ├── iface
│             │       ├── grpc
│             │       │     └── user.go            // gRPC interface implementation
│             │       └── http
│             │           ├── payload.go
│             │           └── user.go
│             ├── infra
│             │       ├── migration
│             │       │     ├── 20240408063653_create_users_table.down.sql
│             │       │     ├── 20240408063653_create_users_table.up.sql
│             │       │     └── migration.go
│             │       ├── model
│             │       │     └── user.go
│             │       ├── repo
│             │       │     └── user.go
│             │       └── seed
│             │             └── user.go
│             └── module.go
├── pb                                             // Protocol Buffers (pb) files
│    ├── user_grpc.pb.go
│    └── user.pb.go
├── readme.md
└── user.proto                                     // Protocol Buffers (proto) file
```
In the `main.go` file, we add the built-in gRPC module (main.go:21). To register our own service, simply obtain the instantiated `*grpc.Server` from the container in the `module/user/module.go` file (module/user/module.go:44,module/user/module.go:65).Additionally, you can see that in the gRPC interface implementation file, we have reused the `userService`.

::: tip
You can definitely solidify your frequently used code into framework modules.
:::

Each object in the container defaults to a singleton pattern. Thanks to being resident in memory, instantiated objects will not be instantiated again, which is beneficial for execution efficiency.

::: tip
The `github.com/zeddy-go/zeddy/errx` package silently collects the error stack. You can use the following code to print it: `fmt.Printf("%#v", err)`. Moreover, this information will not be lost even after being transmitted via gRPC.
:::
