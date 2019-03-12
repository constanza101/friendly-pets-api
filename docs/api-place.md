**Index:**
===
  * <a href="">Post comment</a>
  * <a href="">List comments of one place</a>
  * <a href="">Delete comment</a>

**Post comment**
----
Saves new comment about a place.

* **URL**

  /comment

* **Method:**

  `POST`

*  **URL Params(Not required)**


* **Data Params**

    {
    "comment":"me gusta mucho este sitio",
    "score": 5,
    "place_id":1,
    "user_id":1
    }

    `comment=[string]`
    `score=[integer]`-> [1 to 5]<br>
    `place_id=[integer]`.<br>
    `user_id =[integer]`<br>

* **Success Response:**

  * **Code:** 200 <br />
  * **Content:**

    `[{
      "id": 4,
      "comment": "me gusta mucho este sitio",
      "score": 5,
      "creation_date": "2019-03-12T14:22:04.000Z",
      "place_id": 1,
      "user_id": 1
    }]`

* **Error Response:** N/A


* **Sample Call:**

```javascript
  function postComment(){
  var data = {
              "comment":"me gusta mucho este sitio",
              "score": 5,
              "place_id":1,
              "user_id":1
              }
  var url = "http://localhost:8000/comment"

    $.post(url, data, function(response) {
        console.log(response);
    });
  }
```

**List all comments of one place**
----
Returns a list with all details of all the comments about a place, by the place_id.

* **URL**

  /commentsByPlaceId/:place_id

* **Method:**

  `GET`

*  **URL Params** **(Required)**

  `place_id =[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
  * **Content:**

```
    [{
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
      }]
```

* **Error Response:** N/A


* **Sample Call:**

```javascript
function getPlaceComments(){
  var url = "http://localhost:8000/commentsByPlaceId/1"
  $.get(url, function(response) {
      console.log(response);
  });
}
```


**Delete comment**
----
Deletes single comment from data base, by its id.

* **URL**

  /comment/:id

* **Method:**

  `DELETE`

* **URL Params** **(Required)**

  `id=[integer]`

* **Data Params**: N/A

* **Success Response:**

* **Code:** 200 <br/>
  **Content:** "eliminado"

* **Error Response:** N/A


* **Sample Call:**

```javascript
function deleteAnimal(){
    var url = "http://localhost:8000/comment/1"
    return $.ajax({
    url: url,
    type: 'DELETE',
    success: function(response) {console.log("comment deleted from database", response);},
    });
}
```
