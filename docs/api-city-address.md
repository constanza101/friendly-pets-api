**Index:**
===
  * <a href="https://github.com/constanza101/friendly-pets-api/blob/master/docs/api-city-address.md#save-city">Save City</a>
  * user:  <a href="api-user.md">/api-user.md</a>


**Save City**
----
Saves and returns the saved city name and and city_id.

* **URL**

  /city

* **Method:**

  `POST`

*  **URL Params** **(Not required)**


* **Data Params**
* **Data Params**

      {"name": new_city}

    `name=[string]`<br>

* **Success Response:**

  * **Code:** 200 <br />
  * **Content:**

    `{ id: 1,
  name: 'Barcelona' }`

* **Error Response:** N/A


* **Sample Call:**

```javascript
  function saveCity(){
  var data = {"name": "Barcelona"};
  var url = "http://localhost:8000/city"

  $.post(url, data, function(response) {
      console.log(response);
  });
}
```

  **Save address**
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
