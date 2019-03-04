"This document is a guide/index of api/server.js"
*************************************************************
"READ LIKE:"
METHOD/path -> (posting order) -- response type
(if value = 1 -> value_type: number)
*************************************************************
>> USER
//signup:
POST/city -> (1) -- {"id": 1,"name": "Barcelona"}
POST/address -> (2) -- {"id":address_id, "address": new_address,"postal_code": new_PC, "city_id": new_cityID }
POST/user -> (3) -- [{ "id": 26, "name": "Rosario", "email": "rosario@gmail.com", "password": "7110eda4d09e062aa5e4a390b0a572ac0d2c0220", "address_id": 1, "creation_date": "2019-03-04T14:43:10.000Z"}]
//USER profile:
GET/user/:id -> [{ "id": 1, "name": user_name, "email": user_email, "password": user_pass, "address_id": 1, "creation_date": "2019-02-26T15:48:48.000Z"}]
//USER update profile:
UPDATE/user/:id -> nofunciona
      -> debe recibir el tipo:
      /*[{"key":"email", "value":"mauritoelchacarerito@hotmail.com"},
      {"key":"name", "value":"hgjhg"},
      {"key":"address_id", "value":1}]*/
------------------------------------------------------------------------------
>> ANIMAL
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
care = quiet/energetic/special care
>> LOST :
new_status = lost
lost_address_id >> id
lost_date
>> FOUND :
new_status = found
found_address_id >> id
found_date

POST/animal --> {"owner_user_id": 1, "name": "Calu", "animal_type_id": 1, "birthdate": null, "gender": "F", "size": "large", "picture": "www.google.com", "description": "es una gatita bebe"}
GET/animals/:owner_user_id --> (returns all the pets of one user) -> [{},{}]
[
{ "id": 2, "name": "Alfredo", "animal_type_id": 2, "birthdate": "2015-02-01T23:00:00.000Z", "gender": "M", "size": "small", "picture": null, "status": "default", "description": "Alfredo esta loquito de amor", "creation_date": "2019-02-26T15:56:03.000Z", "lost_date": null, "lost_address_id": null, "found_date": null, "found_address_id": null, "owner_user_id": 2, "animal_breed_id": 2},
{ "id": 21, "name": "Calu", "animal_type_id": 1, "birthdate": null, "gender": "F", "size": "large", "picture": "www.google.com", "status": "default", "description": "es una gatita bebe", "creation_date": "2019-03-03T16:55:49.000Z", "lost_date": null, "lost_address_id": null, "found_date": null, "found_address_id": null, "owner_user_id": 2, "animal_breed_id": null}
]
UPDATE/animal_lost/:id












.
