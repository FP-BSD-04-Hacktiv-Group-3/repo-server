## Tech Stacks:
1. cors
1. prisma
1. express
1. axios
1. @google-cloud/vision

## Endpoint
#### Products:
```
GET http://localhost:4001/products/
return:
{
    statusCode: 200
    data: {
        //[data]
    }
}

GET http://localhost:4001/products/:id

return:
{
    statusCode: 200
    data: {
        //data
    }
}

POST http://localhost:4001/products/

return:
{
    statusCode: 201
    data: "Successfully create a product"
}

POST 
``` 