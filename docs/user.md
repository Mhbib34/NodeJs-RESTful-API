## User API Spec

## Register User API

Endpoint : POST /api/users

Request body :

```json
{
  "username": "mhb",
  "password": "rahasia",
  "name": "Muhammad Habib"
}
```

Response Body Succes

```json
{
  "data": {
    "username": "mhb",
    "name": "Muhammad Habib"
  }
}
```

Response Body Error

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoint: POST /api/users/login

Request body :

```json
{
  "username": "mhb",
  "password": "rahasia"
}
```

Response Body Succes

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error

```json
{
  "errors": "Username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :
-Authorization : token

Request Body :

```json
{
  "name": "Muhammad Habib baru", //optional
  "password": "ini password baru" //optional
}
```

Response Body Succes

```json
{
  "data": {
    "username": "mhb",
    "name": "Muhammad Habib baru"
  }
}
```

Response Body Error

```json
{
  "errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :
-Authorization : token

Response Body Success :

```json
{
  "data": {
    "username": "mhb",
    "name": "Muhammad Habib baru"
  }
}
```

Response Body Error

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :
-Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error

```json
{
  "errors": "Unauthorized"
}
```
