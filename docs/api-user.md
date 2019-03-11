**Index:**
===
  * <a href="https://github.com/constanza101/friendly-pets-api/blob/master/docs/api-user.md#save-new-user-sign-up">Save New User (sign up)</a>
  * <a href="https://github.com/constanza101/friendly-pets-api/blob/master/docs/api-user.md#show-user-user-profile">Show User (user profile)</a>
  * <a href="https://github.com/constanza101/friendly-pets-api/blob/master/docs/api-user.md#update-user-update-profile">Update User (update profile)</a>
  * <a href="https://github.com/constanza101/friendly-pets-api/blob/master/docs/api-user.md#delete-user-update-profile">Delete User (update profile)
</a>


**Save New User (sign up)**
----
Saves and returns all data of a single user.(address_id of the address of the user is needed to make this POST call, to generate an address_id you need to make a post call to address endpoint before. Check the section of address calls)

* **URL**

  /user

* **Method:**

  `POST`

*  **URL Params** **(Not required)**


* **Data Params**

      [{"name": user_name, "email": user_email, "password": user_pass, "address_id": 1, "creation_date": "2019-02-26T15:48:48.000Z"}]

    `name=[string]`<br>
    `email=[string]`<br>
    `password=[string]`<br>
    `address_id=[integer]` ->
(To generate an address_id to send in this POST call, you  need to make a post call to address endpoint before. Check the section of address calls).<br>

* **Success Response:**

  * **Code:** 200 <br />
  * **Content:**

    `[{ "id": 1, "name": user_name, "email": user_email, "password": user_pass, "address_id": 1, "creation_date": "2019-02-26T15:48:48.000Z"}]`

* **Error Response:** N/A


* **Sample Call:**

```javascript
  function saveNewUser(){
  var data = {"name":"Claudia","email":"clau@gmail.com","password":"1234", "address_id": 1};
  var url = "http://localhost:8000/user"

    $.post(url, data, function(response) {
        console.log(response);
    });
  }
```

**Show User (user profile)**
----
Returns all data of a single user.

* **URL**

  /user/:id

* **Method:**

  `GET`

*  **URL Params** **(Required)**

  `id=[integer]`

* **Data Params**

  None

* **Success Response:**

* **Code:** 200 <br />
  **Content:**

  `[{ "id": 1, "name": user_name, "email": user_email, "password": user_pass, "address_id": 1, "creation_date": "2019-02-26T15:48:48.000Z"}]`

* **Error Response:** N/A


* **Sample Call:**

```javascript
function getUserDetails(){

  var url = "localhost:8000/user/1"
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
