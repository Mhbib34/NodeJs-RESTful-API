# Address API Spec

## Create Address API

Enpoint: POST /api/contacts/:contactId/addresses

Headers :
-Authorization : token

Request Body :

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi Apa",
  "country": "Negara Anda",
  "postal_code": "Kode pas"
}
```

Response Body Success :

```json
{
  "data": {
    "id":1
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi Apa",
    "country": "Negara Anda",
    "postal_code": "Kode pas"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Update Address API

Enpoint: POST /api/contacts/:contactId/addresses/:addressId

Headers :
-Authorization : token

Request Body :

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi Apa",
  "country": "Negara Anda",
  "postal_code": "Kode pas"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi Apa",
    "country": "Negara Anda",
    "postal_code": "Kode pas"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Get Address API

Enpoint: GET /api/contacts/:contactId/addresses/:addressId

Headers :
-Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi Apa",
    "country": "Negara Anda",
    "postal_code": "Kode pas"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## List Address API

Enpoint: GET/api/contacts/:contactId/addresses

Headers :
-Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi Apa",
      "country": "Negara Anda",
      "postal_code": "Kode pas"
    },
    {
      "id": 1,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi Apa",
      "country": "Negara Anda",
      "postal_code": "Kode pas"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## Remove Address API

Enpoint: DELETE /api/contacts/:contactId/addresses/:addressId

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
  "errors": "Address is not found"
}
```
