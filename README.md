
**Register New User (sign up)**
----
 Saves and returns all data of a single user.

* **URL**

  /users

* **Method:**

  `POST`

*  **URL Params** **(Required)**



* **Data Params**

      [{"name": user_name, "email": user_email, "password": user_pass, "address_id": 1, "creation_date": "2019-02-26T15:48:48.000Z"}]

    `name=[string]`<br>
    `email=[string]`<br>
    `password=[string]`<br>
    `address_id=[integer]` ->
(To generate an address_id to send in this POST call, you  need to make a post call to address endpoint before. Check the section of address calls).<br>

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    `[{ "id": 1, "name": user_name, "email": user_email, "password": user_pass, "address_id": 1, "creation_date": "2019-02-26T15:48:48.000Z"}]`

* **Error Response:** N/A


* **Sample Call:**

  ```javascript
  function registerNewUser(){
  var data = {"name":"Claudia","email":"clau@gmail.com","password":"1234", "address_id": 1};
  var url = "http://localhost:8000/user"

  $.post(url, data, function(response) {
      console.log(response);
  });
}
  ```

***

  **Show User (user profile)**
  ----
   Returns all data of a single user.

  * **URL**

    /users/:id

  * **Method:**

    `GET`

  *  **URL Params** **(Required)**

    `id=[integer]`

    `address_id=[integer]`

    To know which address_id to send, you may need to make a post call to address endpoint before. Check the section of address calls.

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
