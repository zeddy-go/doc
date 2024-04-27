# ginx

The `ginx` module is used to handle corresponding requests with a given handler, with an underlying Gin framework.
The module encapsulates the routing operations of Gin, enabling the characteristic of not limiting the list of input and output parameters for handler methods.
The `ginx` module provides two option methods upon instantiation:
* `ginx.WithCustomEngine` is used for using a custom instance of Gin.
* `ginx.WithPrefix` is used to set the level at which to read the configuration, with the default being the root level.

Upon initialization, the `ginx` module registers itself with the container as an interface type of `ginx.Router`.

## Handler Parameters
`ginx`, when transferring a request to the corresponding `handler`, will iterate over the parameters through reflection.
If the parameter type can be found in the container, then the object from the container is used for passing the argument.
If the parameter type cannot be found in the container, it attempts to parse the request to obtain it.

```go
//-----------userHandler-----------------
//Parse Request
type HelloReq struct {  //Identical to gin's definition
    Username string `form:"username" binding:"required"`
}
type HelloResp struct {
    Text string `json:"text"`
}

func (uh *UserHandler) Hello(req *HelloReq) {}

//Retrieve Object from Container
func (uh *UserHandler) Hello(c *viper.Viper) {}

//Can also do both, the order does not matter.
func (uh *UserHandler) Hello(req *HelloReq, c *viper.Viper) {}

//----------------module.Boot--------------------
err = container.Invoke(func(r ginx.Router, userHandler *http.UserHandler) {
    r.GET("/hello", userHandler.Hello)
})
if err != nil {
    return
}
```

Additionally, `ginx` has defined some specific parameter types to simplify the code:
```go
// Directly obtain the Gin Context object.
func (uh *UserHandler) Hello(ctx *gin.Context) {}

// Retrieve pagination, parsing the two fields named `page` and `size` from the URL query string.
func (uh *UserHandler) Hello(page *ginx.Page) {}

// Retrieve filter conditions by parsing all fields in the URL query string that are in the format of `filters[xxx]`.
// The `ginx.Filters` type can convert these fields into query conditions understandable by the `gormx` module.
func (uh *UserHandler) Hello(filters *ginx.Filters) {}

// Retrieve sorting conditions by parsing all fields in the URL query string that are in the format of `sorts[xxx]`.
// The `ginx.Sorts` type can convert these fields into sorting conditions understandable by the `gormx` module.
func (uh *UserHandler) Hello(sorts *ginx.Sorts) {}
```
Just like the previous examples, these examples can also be included together as parameters for the same `handler`.

## Handler Outputs
Although the outputs are still variable, outputs must follow certain rules for `ginx` to correctly process them and return the appropriate response.

The default response structure used by `ginx` adheres to the RESTful style.

Firstly, there may be no output parameters, in which case `ginx` will assume that the function will always execute successfully without a response body, and the returned `HTTP status code` will be 204.
```
HttpStatusCode: 204
body: (none)
```

In cases where there are output parameters, the last one must always be of the `error` type. 
`ginx` will determine the response `HTTP status code` by checking whether the error is nil.
When the error is not nil, the default `HTTP status code` is 500.
```
HttpStatusCode: 500
body: {"message": err.Error(), "data": null}
```
If you use the errors returned by the `errx` package, you will be able to customize the `HTTP status code` and details:
```go
errx.New("The data is currently in use and cannot be deleted.", errx.WithDetailMap(map[string]any{"detail": "this is detail"}), errx.WithCode(http.StatusConflict))  //This will set the status code to 409.
```
```
HttpStatusCode: 409
body: {"message": "The data is currently in use and cannot be deleted.", "data": {"detail": "this is detail"}}
```

That is to say, when there is one output parameter, this parameter must be of the `error` type.

When there are two output parameters, the last one must be of the `error` type, and the first one is the data you wish to return. 
If the error is not nil, it behaves the same as the examples mentioned above.
When the error is nil, the effect is as follows:
```
HttpStatusCode: 200
body: {"message": "", "data": <Your response data>}
```

When there are three output parameters, the rules for the error are consistent with the above. 
The first output parameter is for metadata, and the second output parameter is for the data you wish to return.
The metadata is either a struct that implements the `ginx.IMeta` interface or an integer (int). 
The integer represents the total number of records for pagination purposes:
```
func (uh *UserHandler) Hello(page *ginx.Page) (total int, list []*Xxx, err error) {}

will be returned:
HttpStatusCode: 200
body: {"message": "", "data": <Your response data>, "meta": {"total": <number>}}
```
And a struct that implements the `ginx.IMeta` interface will be converted into a JSON string. 
If it contains a field named code, that field will be used as the `HTTP status code` for the response:
```
func (uh *UserHandler) Hello(page *ginx.Page) (meta ginx.IMeta, list []*any, err error) {
	return &ginx.Meta{CurrentPage: 1, Code: http.StatusCreated}, []*any{}, nil
}

will be returned:
HttpStatusCode: 201
body: {"message": "", "data": <Your response data>, "meta": {"currentPage": 1}}
```

A maximum of three output parameters are allowed.

So, how is file download defined? The code is as follows:
```go
func (uh *UserHandler) Hello(req *HelloReq) (file ginx.IFile, err error) {
    f, err := os.Open("/path/to/file.mp3")
    if err != nil {
        return
    }
    defer f.Close()
    content, err := io.ReadAll(f)
    if err != nil {
        return
    }
    file = ginx.NewFile(content)
    return
}
```
