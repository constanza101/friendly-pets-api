"This document is a guide/index of api/server.js"
*************************************************************
"READ LIKE:"
METHOD/path -> (posting order) -->

-> response type
-(if value = 1 -> value_type: number)
*************************************************************
>> USER
//signup:
*POST/city -> (1) -- {"id": 1,"name": "Barcelona"}
*POST/address -> (2) -- {"id":address_id, "address": new_address,"postal_code": new_PC, "city_id": new_cityID }
*POST/user -> (3) -- [{ "id": 26, "name": "Rosario", "email": "rosario@gmail.com", "password": "7110eda4d09e062aa5e4a390b0a572ac0d2c0220", "address_id": 1, "creation_date": "2019-03-04T14:43:10.000Z"}]
//USER profile:
*GET/user/:id -> [{ "id": 1, "name": user_name, "email": user_email, "password": user_pass, "address_id": 1, "creation_date": "2019-02-26T15:48:48.000Z"}]
//USER update profile:
UPDATE/user/:id
      -> receives_req.body:
      [
        {"key":"email", "value":"mauritoelchacarerito@hotmail.com"},
        {"key":"name", "value":"Mauro"},
        {"key":"address_id", "value":1}
      ]
      -> response_res.send():
      [{
        "id": 10,
        "name": "Betito",
        "email": "norberto@hotmail.com",
        "password": "7110eda4d09e062aa5e4a390b0a572ac0d2c0220",
        "address_id": 1,
        "creation_date": "2019-03-04T13:38:41.000Z"
      }]

POST/userlogin
              -> receives:
              {
              "email":"sil@gmail.com",
              "password": 1234
              }
              ->returns:
              if email and password are correct:
              [{
              "id": 16,
              "email": "sil@gmail.com",
              "password": "7110eda4d09e062aa5e4a390b0a572ac0d2c0220"
              }]
              if email does not exist:
              "wrongEmail";
              if password does not match:
              "wrongPass";



DELETE/user/:id -> response_res.send("user deleted");



*******************************************************
>> ANIMAL
*******************************************************

//NANIMAL register new.
owner_user_id >> id
id,
name,
animal_type_id, >> id
//animal_breed_id >> id
birthdate,
gender,
size,
picture,
description,
creation_date
status = default
//status changes --> updates
>> ADOPTION :
new_status = adoption
//care = quiet/energetic/special care
>> LOST :
new_status = lost
lost_address_id >> id
lost_date
>> FOUND :
new_status = found
found_address_id >> id
found_date


POST/animal
    --> req.body
      {
        "owner_user_id": 1,
        "name": "Frida",
        "animal_type_id": 1, //>>>> 1 = perro; 2 = gato
        "birthdate": "1999-12-31",
        "gender": "F",// F = female; M = male
        "size": "medium", //small, medium, large, extralarge
        "picture": "url",
        "description": "es una gatita bebe"
      }
  --> res.send(new_record):
      {
        "id": 27,
        "owner_user_id": 1,
        "name": "Frida",
        "animal_type_id": 1,
        "birthdate": "1999-12-31",
        "gender": "F",
        "size": "medium",
        "picture": "www.google.com",
        "description": "es una gatita bebe"
      }

GET/animal/:id
        ->returns all details of one animal: [{}]
        [{ "id": 2, "name": "Alfredo", "animal_type_id": 2, "birthdate": "2015-02-01T23:00:00.000Z", "gender": "M", "size": "small", "picture": null, "status": "default", "description": "Alfredo esta loquito de amor", "creation_date": "2019-02-26T15:56:03.000Z", "lost_date": null, "lost_address_id": null, "found_date": null, "found_address_id": null, "owner_user_id": 2, "animal_breed_id": 2},]

GET/animals/:owner_user_id --> (returns all the pets of one user) -> [{},{}]
   -> returns only: name, gender, picture, status, description, size
[
{ "name": "Alfredo", "gender": "M", "size": "large", "picture": null, "status": "default", "description": "Alfredo esta loquito"},
{ "name": "Calu", "gender": "F", "size": "large", "picture": "www.google.com", "status": "default", "description": "es una gatita bebe"}
]

GET/animalsByStatus/:status
          status:lost/found/adption;
          ->returns all animalsByStatus: [{},{},{}]

UPDATE/animal/:id
        POST/city -> (1) -- {"id": 1,"name": "Barcelona"}
        POST/address -> (2) -- {"id":address_id, "address": new_address,"postal_code": new_PC, "city_id": new_cityID }
        -> (3)receives_req.body:
        [
         {"key":"status", "value":"lost"},
         {"key":"picture", "value":"url2"},
         {"key":"lost_address_id", "value":1},
         {"key":"lost_date", "value": "2018-12-31"}
        ]
        ->returns: "* FROM animal/:id"

DELETE/animal/:id


*******************************************************
PLACES
*******************************************************

POST/place
      -> recieves:
      {
      "name": "MarChalo",
      "picture": "url2",
      "description": "restaurante con terraza calefaccionada",
      "address_id": 1
      }
      -> returns:
      {
      "id": 4,
      "name": "MarChalo",
      "picture": "url2",
      "description": "restaurante con terraza calefaccionada",
      "address_id": 1
      }

GET/place/:id
    -> returns * from one place, by its id.
    [{
    "id": 3,
    "name": "Marae",
    "description": "restaurante con terraza calefaccionada",
    "picture": "url2",
    "address_id": 1
    }]

UPDATE/place/:id
receives ->
    [{"key":"name", "value":"Malbec Restaurante"},
    {"key":"description", "value":"restaurante con terraza descubierta"}
    ]
returns all details of place updated ->
    [{
    "id": 1,
    "name": "Malbec Restaurante",
    "description": "restaurante con terraza descubierta",
    "picture": "url2",
    "address_id": 1
    }]

***********************************
COMMENTS
***********************************
POST/comment
-> recieves:
      {
      "comment":"me gusta mucho este sitio",
      "score": 5,
      "place_id":1,
      "user_id":1
      }
-> returns:
      [{
        "id": 4,
        "comment": "me gusta mucho este sitio",
        "score": 5,
        "creation_date": "2019-03-12T14:22:04.000Z",
        "place_id": 1,
        "user_id": 1
      }]

GET/commentsByPlaceId/:place_id
  -> returns all comments of one place:
  [
    {
        "id": 4,
        "comment": "buenísima atención",
        "score": 5,
        "creation_date": "2019-03-12T14:22:04.000Z",
        "place_id": 1,
        "user_id": 1
    },
    {
        "id": 5,
        "comment": "me gusta mucho este sitio",
        "score": 5,
        "creation_date": "2019-03-12T14:30:14.000Z",
        "place_id": 1,
        "user_id": 1
    }
]

DELETE/comment/:id





.
