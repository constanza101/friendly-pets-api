**Index:**
===
  * <a href="">Save New Animal</a>
  * <a href="">Show User (user profile)</a>
  * <a href="">Update User (update profile)</a>
  * <a href="">Delete User (update profile)
</a>


**Save New User (sign up)**
----
Saves and returns all data of a single animal.(owner_id must come from an existing User, who is the one to register the new animal).

* **URL**

  /animal

* **Method:**

  `POST`

*  **URL Params** **(Not required)**


* **Data Params**

      {
        "owner_user_id": 1,
        "name": "Frida",
        "animal_type_id"
        "birthdate": "1999-12-31",
        "gender": "F",// F = female; M = male
        "size": "medium", //small, medium, large, extralarge
        "picture": "url",
        "description": "es una gatita bebe"
      }

    `owner_user_id=[integer]`-> must be the id of the User who is registering their pet.<br>
    `name=[string]`<br>
    `animal_type_id=[integer]`-> 1 = perro;   2 = gato.<br>
    `birthdate =[string]`-> [YYY-MM-DD]<br>
    `gender =[string]`-> F = Female; M = Male <br>
    `size=[string]`->small / medium / large / extralarge.<br>
    `picture=[string]`-> url <br>
    `description=[string]`<br>

* **Success Response:**

  * **Code:** 200 <br />
  * **Content:**

    `[{"id": 27,
    "owner_user_id": 1,
    "name": "Frida",
    "animal_type_id": 1,
    "birthdate": "1999-12-31",
    "gender": "F",
    "size": "medium",
    "picture": "www.google.com",
    "description": "es una gatita bebe"}]`

* **Error Response:** N/A


* **Sample Call:**

```javascript
  function saveNewAnimal(){
  var data = {
    "owner_user_id": 1,
    "name": "Frida",
    "animal_type_id": 1,
    "birthdate": "1999-12-31",
    "gender": "F",// F = female; M = male
    "size": "medium", //small, medium, large, extralarge
    "picture": "url.jpg",
    "description": "es una gatita bebe"
  };
  var url = "http://localhost:8000/animal"

    $.post(url, data, function(response) {
        console.log(response);
    });
  }
```

**Show Animal (animal detail)**
----
Returns all data of a single animal.

* **URL**

  /animal/:id

* **Method:**

  `GET`

*  **URL Params** **(Required)**

  `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
  * **Content:**

    `[{ "id": 2, "name": "Alfredo", "animal_type_id": 2, "birthdate": "2015-02-01T23:00:00.000Z", "gender": "M", "size": "small", "picture": null, "status": "default", "description": "Alfredo esta loquito de amor", "creation_date": "2019-02-26T15:56:03.000Z", "lost_date": null, "lost_address_id": null, "found_date": null, "found_address_id": null, "owner_user_id": 2, "animal_breed_id": 2},]`

* **Error Response:** N/A


* **Sample Call:**

```javascript
function getAnimalDetails(){
  var url = "localhost:8000/animal/1"
  $.get(url, function(response) {
      console.log(response);
  });
}
```

**Update User (update profile)**
----
 Returns all new data of a single user.

* **URL**

  /user/:id

* **Method:**

  `PUT`

*  **URL Params** **(Required)**

* **Data Params**

  ```
  [{"key":"email", "value":"hola@hotmail.com"},
    {"key":"name", "value":"Jose"},
    {"key":"address_id", "value":1}]
  ```

  `key = [string]` -> must be exactly the key of what will be updated. <br>
  `value` ->  type according to the key:<br>
    if key = name : `value =[string]`<br>
    if key = email :`value =[string]`<br>
    if key = password : `password=[string]`<br>
    if key = address_id : `value =[integer]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    `[{"id": 1,"name": "Jose",  "email": "hola@hotmail.com",  "password": "7110eda4d09e062aa5e4a390b0a572ac0d2c0220",  "address_id": 1,  "creation_date": "2019-03-04T13:38:41.000Z"}]`

* **Error Response:** N/A


* **Sample Call:**

  ```javascript
  function updateUserDetails(){

      var url = "http://localhost:8000/user/10"
      var data = [{"key":"email",     "value":"betito@hotmail.com"},
        {"key":"name", "value":"Betito"},
        {"key":"address_id", "value":1}]

      return $.ajax({
      url: url,
      type: 'PUT',
      success: function(response) {console.log(response);},
      data: JSON.stringify(data),
      contentType: "application/json"
      });
  }
  ```

**Delete User (update profile)**
----
Returns all new data of a single user.

* **URL**

/user/:id

* **Method:**

`DELETE`

*  **URL Params** **(Required)**

`id=[integer]`

* **Data Params**: N/A

* **Success Response:**

* **Code:** 200 <br />
  **Content:** N/A

* **Error Response:** N/A


* **Sample Call:**

```javascript
function deleteUser(){
    var url = "http://localhost:8000/user/11"
    return $.ajax({
    url: url,
    type: 'DELETE',
    success: function(response) {console.log("user deleted from database");},
    });
}
```
