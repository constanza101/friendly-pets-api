**Index:**
===
  * <a href="">Save New Animal</a>
  * <a href="">Show Animal (animal details)</a>
  * <a href="">List all animals of one owner</a>
  * <a href="">List all animals by status (lost / found / adoption)</a>
  * <a href="">Update Animal (change details or update status)</a>
    * <a href="">Delete Animal</a>


**Save New Animal**
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
        "gender": "F",
        "size": "medium",
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

     **Optional or not required data:**<br>
     These can be added later if needed or are automatically generated. <br>

     `id=[integer]`-> automatically generated<br>
     `status=[string]`-> default: can be updated to lost / found / adoption.<br>
     `creation_date=[date]`-> automatically generated<br>
     `lost_date=[string]`-> [YYY-MM-DD]<br>
     `lost_address_id=[integer]` -> must first generate an address and use its id here <br>
     `found_date=[string]`-> [YYY-MM-DD]<br>
     `found_address_id=[integer]` -> must first generate an address and use its id here <br>
     `animal_breed_id=[string]`-> we may later add a breed list.<br>


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
    "gender": "F",
    "size": "medium",
    "picture": "url.jpg",
    "description": "es una gatita bebe"
  };
  var url = "http://localhost:8000/animal"

    $.post(url, data, function(response) {
        console.log(response);
    });
  }
```

**Show Animal (animal details)**
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

    `[{
      "id": 2,
      "name": "Alfredo",
      "animal_type_id": 2,
      "birthdate": "2015-02-01T23:00:00.000Z",
      "gender": "M",
      "size": "small",
      "picture": null,
      "status": "default",
      "description": "Alfredo esta loquito",
      "creation_date": "2019-02-26T15:56:03.000Z",
      "lost_date": null,
      "lost_address_id": null,
      "found_date": null,
      "found_address_id": null,
      "owner_user_id": 2,
      "animal_breed_id": 2},]`

* **Error Response:** N/A


* **Sample Call:**

```javascript
function getAnimalDetails(){
  var url = "http://localhost:8000/animal/1"
  $.get(url, function(response) {
      console.log(response);
  });
}
```


**List all animals of one owner**
----
Returns a list with some details of all the pets of one user, by the owner_user_id.

* **URL**

  /animals/:owner_user_id

* **Method:**

  `GET`

*  **URL Params** **(Required)**

  `owner_user_id =[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
  * **Content:**

```
    [
    { "name": "Alfredo", "gender": "M", "size": "large", "picture": null, "status": "default", "description": "Alfredo esta loquito"},
    { "name": "Calu", "gender": "F", "size": "large", "picture": "www.google.com", "status": "default", "description": "es una gatita bebe"}
    ]
```

* **Error Response:** N/A


* **Sample Call:**

```javascript
function getAnimalsByOwnerId(){
  var url = "http://localhost:8000/animals/1"
  $.get(url, function(response) {
      console.log(response);
  });
}
```


**List all animals by status (lost / found / adoption)**
----
Returns a list with some details of all the pets according to the status value (not all details).

* **URL**

/animalsByStatus/:status

* **Method:**

  `GET`

*  **URL Params** **(Required)**

  `status =[string]` -> lost / found / adoption

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
  * **Content:**

```
[    
    {
        "name": "Frida",
        "gender": "F",
        "picture": "url2",
        "status": "lost",
        "description": "es una gatita LINDA",
        "size": "medium",
        "lost_date": "2018-12-30T23:00:00.000Z",
        "found_date": null,
        "lost_address_id": 1,
        "found_address_id": null,
        "birthdate": "1999-12-30T23:00:00.000Z"
    },
    {
        "name": "Pepe",
        "gender": "F",
        "picture": "www.google.com",
        "status": "lost",
        "description": "es un perrito mediano",
        "size": "medium",
        "lost_date": null,
        "found_date": null,
        "lost_address_id": null,
        "found_address_id": null,
        "birthdate": "1999-12-30T23:00:00.000Z"
    }
]

```

* **Error Response:** N/A


* **Sample Call:**

```javascript
function getAnimalsByStatus(){
  var url = "http://localhost:8000/animalsByStatus/lost"
  $.get(url, function(response) {
      console.log(response);
  });
}
```

**Update Animal (change details or update status)**
----
 If the animal status needs to be changed from 'default' to 'lost' or 'found' it is necessary to first make a POST call to '/city' and '/address'.
 For status 'adoption' we are not generating the address, we will use the owner's address if we need it (there is no adoption_address_id parameter though).

* **URL**
  /animal/:id

* **Method:**

  `PUT`

*  **URL Params** **(Required)**

* **Data Params**

  ```
  [
   {"key":"status", "value":"lost"},
   {"key":"picture", "value":"url2"},
   {"key":"lost_address_id", "value":1},
   {"key":"lost_date", "value": "2018-12-31"}
  ]
  ```

  `key = [string]` -> must be exactly the key of what will be updated. <br>
  `value` ->  type according to the key:<br>
    if key = status : `value =[string]` -> lost / found / adoption <br>
    if key = lost_address_id or found_address_id :`value =[integer]`<br>
    if key = lost_date or found_date : `value=[string]` -> [YYY-MM-DD]<br>


* **Success Response:**

  * **Code:** 200 <br />
  * **Content:**

        [{
        "id": 12,
        "name": "Frida",
        "animal_type_id": 1,
        "birthdate": null,
        "gender": "F",
        "size": "medium",
        "picture": "url2",
        "status": "lost",
        "description": "es una gatita LINDA",
        "creation_date": "2019-03-05T15:09:40.000Z",
        "lost_date": "2018-12-30T23:00:00.000Z",
        "lost_address_id": 1,
        "found_date": null,
        "found_address_id": null,
        "owner_user_id": 1,
        "animal_breed_id": null
        }]


* **Error Response:** N/A


* **Sample Call:**

```javascript
  function updateAnimalDetails(){

      var url = "http://localhost:8000/animal/10"
      var data =   [
         {"key":"status", "value":"lost"},
         {"key":"picture", "value":"url2"},
         {"key":"lost_address_id", "value":1},
         {"key":"lost_date", "value": "2018-12-31"}
        ]

      return $.ajax({
      url: url,
      type: 'PUT',
      success: function(response) {console.log(response);},
      data: JSON.stringify(data),
      contentType: "application/json"
      });
  }
```

**Delete Animal**
----
Deletes single animal from data base, by its id.

* **URL**

  /animal/:id

* **Method:**

  `DELETE`

*  **URL Params** **(Required)**

  `id=[integer]`

* **Data Params**: N/A

* **Success Response:**

* **Code:** 200 <br/>
  **Content:** "eliminado"

* **Error Response:** N/A


* **Sample Call:**

```javascript
function deleteAnimal(){
    var url = "http://localhost:8000/animal/16"
    return $.ajax({
    url: url,
    type: 'DELETE',
    success: function(response) {console.log("animal deleted from database", response);},
    });
}
```
