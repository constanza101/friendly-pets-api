
**Register address**
----
Saves and returns an address and address_id.(city_id of the city of the user is needed to make this POST call,  to generate a city_id you need to make a post call to city endpoint before. Check the section of city calls)

* **URL**

  /address

* **Method:**

  `POST`

*  **URL Params** **(Not required)**


* **Data Params**
* **Data Params**

      {"address": new_address, "postal_code": new_PC, "city_id": 1}

    `address=[string]`<br>
    `postal_code=[string]`<br>
    `city_id=[integer]` ->
(To generate an city_id to send in this POST call, you  need to make a post call to city endpoint before. Check the section of city calls).<br>

* **Success Response:**

  * **Code:** 200 <br />
  * **Content:**

    `{ id: 17,
  address: 'Tramuntana 64',
  postal_code: '08860',
  city_id: '1' }`

* **Error Response:** N/A


* **Sample Call:**

  ```javascript
  function saveAddress(){
  var data = {"address": "Tramuntana 64", "postal_code": "08860", "city_id": 1};
  var url = "http://localhost:8000/address"

  $.post(url, data, function(response) {
      console.log(response);
  });
}
  ```
**Register New User (sign up)**
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
