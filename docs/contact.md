## Contact API Spec

## Create Contact API

Enpoint : POST /api/contacts

Headers :
-Authorization : token

Request Body :

```json
{
  "firstName": "Muhammad",
  "lastName": "Habib",
  "email": "habib@gmail.com",
  "phone": "08082121212"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "Muhammad",
    "lastName": "Habib",
    "email": "habib@gmail.com",
    "phone": "08082121212"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email Is not valid format"
}
```

## Update Contact API

Enpoint : PUT /api/contacts/:id

Headers :
-Authorization : token

Request Body :

```json
{
  "firstName": "Muhammad",
  "lastName": "Habib",
  "email": "habib@gmail.com",
  "phone": "08082121212"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "Muhammad",
    "lastName": "Habib",
    "email": "habib@gmail.com",
    "phone": "08082121212"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email Is not valid format"
}
```

## Get Contact API

Enpoint : GET /api/contacts/:id

Headers :
-Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "Muhammad",
    "lastName": "Habib",
    "email": "habib@gmail.com",
    "phone": "08082121212"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## Search Contact API

Enpoint : GET/api/contacts

Headers :
-Authorization : token

Query Params :
-name : Search by first_name or last_name,using like, optional
-email : Search by email using like ,optional
-phone : Search by phone using like ,optional
-page : number of page, default 1
-size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "firstName": "Muhammad",
      "lastName": "Habib",
      "email": "habib@gmail.com",
      "phone": "08082121212"
    },
    {
      "id": 2,
      "firstName": "Muhammad",
      "lastName": "Habib",
      "email": "habib@gmail.com",
      "phone": "08082121212"
    }
  ],
  "paging": {
    "page": 1,
    "totalPage": 3,
    "totalItem": 30
  }
}
```

Response Body Error :

## Remove Contact API

Enpoint : DELETE /api/contacts/:id

Headers :
-Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```
