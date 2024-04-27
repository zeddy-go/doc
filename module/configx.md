# configx

The module `configx` is responsible for reading configurations for use by other modules.
`configx` utilizes github.com/spf13/viper for managing configurations, and it is set up to automatically read environment variables after loading the configurations. 
This means that environment variables will override the values of existing configuration items.
Configurations are used directly through the Viper package, which reduces cognitive load.

## Read Configuration
In the quick start example, we use the embed package to embed the configuration file as a string within the program (example project in the conf directory), and the relevant code is as follows:
```go
app.Use(
    configx.NewModule(configx.WithContent(conf.Config)),
)
```
The `configx.WithContent` method accepts a string, so after compilation, we have a program that already includes default configurations. 
When deploying, we only need to modify the environment variables to change the program's configuration.

You may also, as before, attach a configuration file to each program, in which case the code would be as follows:
```go
app.Use(
    configx.NewModule(configx.WithPath("/path/to/config.yaml")),
)
```
The `configx.WithPath` method accepts a path. 
Similarly, environment variables can override existing configuration items.

## Use Configuration
The code for using the configuration is as follows:

Use via Dependency Injection
```go
container.Invoke(func(c *viper.Viper) {
    c.GetString("xxx")
})
```
Or use it directly
```go
viper.GetString("xxx")
```

## Use Environment Variables to Represent Hierarchical Relationships
Since the use of a period (.) is not allowed in environment variable names, we use `__` (two underscores) as a substitute for the period (.).
For example, in the configuration file, we have the following configuration:
```yaml
database:
    dsn: "xxxxxxxxxx"
```

Therefore, the environment variable should be written as follows:

```bash
DATABASE__DSN=xxxxxxxxxxx
```

## mode
`configx` comes with four built-in modes:
* local：Local Development Mode
* develop: Online Development Environment Mode
* staging：Staging Environment Mode
* release：Production Environment Mode

The framework may need to know the current mode when handling certain tasks.

## slog
The framework defaults to using the slog package as the logging tool, and it will configure the slog package during the initialization of `configx`.
If the current mode is local, the `configx` package will set the minimum log level for slog to debug.
