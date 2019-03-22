var fs = require ("fs");
var colors = require ("colors");
var express = require("express");
var mysql = require("mysql");
var connectionData  = process.argv[2]; /*eslint no-undef: "off"*/

fs.readFile( connectionData+".json", function (err, data) {
  if (err) throw err;
  var objServerData = JSON.parse(data);

  var connection = mysql.createConnection(objServerData);

  //abro la conexión
  connection.connect();
  console.log("conectado!");

  //creo mi servidor:
  var app = express();

  //configuro el server para que parsee el body de las peticiones post
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    next();
  });


  //POST/city
  app.post("/city", function(req, res){
    var new_city = req.body.name;
    //condición para saber si la nueva ciudad ya existe.
    connection.query("SELECT * FROM city", function (err, data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].name == req.body.name) {
          if(err) throw err;
          console.log("ya existe esta ciudad en la base de datos".green);
          return res.send(data[i]) ; // devuelve un JSON con la ciudad y el id, y lo puedo usar para crear el address.
        }
      }
    //query para agregar una nueva ciudad
    connection.query( "INSERT INTO city (name) VALUES('"+new_city+"');",function (err, data) {
          if(err) throw err;
          return res.send({"id":data.insertId, "city": new_city});
            });
      });
    });


//GET city/:id
    app.get("/city/:id", function(req, res){
      var id = req.params.id;

      connection.query("SELECT * FROM city WHERE id =("+id+");"
        ,function (err, data) {
          if(err) throw err;
          return res.send(data);
          });
      });



  //POST/address
  app.post("/address", function(req, res){
    var new_address = req.body.address;
    var new_PC = req.body.postal_code;
    var new_cityID = req.body.city_id;
    connection.query(
      "INSERT INTO address (address, postal_code, city_id) VALUES("
          +"'"+new_address+"','"+new_PC+"',"+new_cityID+");"
      ,function (err, data) {
          if(err) throw err;
          console.log({"id":data.insertId, "address": new_address,"postal_code": new_PC, "city_id": new_cityID});
          return res.send({"id":data.insertId, "address": new_address,"postal_code": new_PC, "city_id": new_cityID});
        });
    });


    //GET address/:id
        app.get("/address/:id", function(req, res){
          var id = req.params.id;

          connection.query("SELECT * FROM address WHERE id =("+id+");"
            ,function (err, data) {
              if(err) throw err;
              return res.send(data);
              });
          });




//UPDATE/address/:user_id

  app.put("/user_address/:user_id", function(req, res){
    var user_id = req.params.user_id;
    var new_value = req.body;
//first get address_id from user, by user_id
    connection.query("SELECT address_id FROM user WHERE id =("+user_id+");"
      ,function (err, data) {
       address_id = data[0]["address_id"];

//UPDATE ADDRESS by address_id:
    for(var i= 0; i<new_value.length; i++){
    console.log("UPDATE address SET "+new_value[i]['key']+" = '"+new_value[i]['value']+"' WHERE id =("+address_id+");");

      connection.query("UPDATE address SET "+new_value[i]['key']+" = '"+new_value[i]['value']+"' WHERE id =("+address_id+");"
        ,function (err, data) {
          if(err) throw err;
      })   //UPDATE
    }  //for
    connection.query("SELECT * FROM address WHERE id =("+address_id+");"
      ,function (err, data) {
          return res.send(data);
        });//query select user by id
      });//query select address_id
}); //app.put


//DELETE/address/:user_id
app.delete("/address/:id", function(req, res){
  var id = req.params.id;
  connection.query("DELETE FROM address WHERE id =("+id+");"
    ,function (err, data) {
      if(err) throw err;
        return res.send("user deleted");
      });
  });


  //*** END OF ADDRESS

  //POST/user
  app.post("/user", function(req, res){
    var new_name = req.body.name;
    var new_email = req.body.email;
    var new_password = req.body.password;
    var new_addressID = req.body.address_id;


connection.query("SELECT COUNT(email) FROM user WHERE user.email = '"+new_email+"';"
      ,function (err, data) {
        //console.log(data);
        //console.log(data[0]["COUNT(email)"]);
        var didEmailExist = data[0]["COUNT(email)"]
       if (didEmailExist < 1) {
          connection.query("INSERT INTO user (name, email, password, address_id) VALUES("
                    +"'"+new_name+"','"+new_email+"',"+"SHA1("+"'"+new_password+"'"+")"+","+new_addressID+");"
                ,function (err, data) {
                  var new_userID = data.insertId
                  //console.log(data);
                  connection.query("SELECT * FROM user WHERE id =("+new_userID+");"
                        ,function (err, data) {
                          if(err) throw err;
                          return res.send(data);
                          });
          });//insert into user
      }else{
        return res.send("emailExistedInDB")}
  });//select count
});




  //POST/userlogin
  app.post("/userlogin", function(req, res){
    var email = req.body.email;
    var password = req.body.password;


    connection.query("SELECT sha1('"+password+"')"
          ,function (err, data) {
            if(err) throw err;
            var passToCheck = data[0]["sha1('"+password+"')"];

            connection.query("SELECT id, email, password FROM user WHERE email =('"+email+"');"
                  ,function (err, data) {
                    if(err) throw err;
                    if(data[0] == undefined){
                      return res.send("wrongEmail")
                    } else if (passToCheck == data[0].password) {
                        console.log("contraseña correcta".green);
                        return res.send(data);
                        } else{
                          console.log("contraseña incorrecta".red)
                          return res.send("wrongPass")
                      }
                    });
            });
  });//post login


    //GET/user/:id - GET USER INFO FOR PROFILE
    app.get("/user/:id", function(req, res){
      var id = req.params.id;
      connection.query("SELECT * FROM user WHERE id =("+id+");"
        ,function (err, data) {
          if(err) throw err;
          return res.send(data);
          });
      });


      //UPDATE/user/:id
      app.put("/user/:id", function(req, res){
        var id = req.params.id;
        var new_value = req.body

        for(var i= 0; i<new_value.length; i++){
          //console.log(new_value[i].key);
          connection.query("UPDATE user SET "+new_value[i].key+" = '"+new_value[i].value+"' WHERE id =("+id+");"
            ,function (err, data) {
              if(err) throw err;
              //console.log(new_value[i].key.green);
          })   //UPDATE
        }  //for

        connection.query("SELECT * FROM user WHERE id =("+id+");"
          ,function (err, data) {
              return res.send(data);
            });//query select user by id
      }); //app.put


//DELETE/user/:id
app.delete("/user/:id", function(req, res){
  var id = req.params.id;
  connection.query("DELETE FROM user WHERE id =("+id+");"
    ,function (err, data) {
      if(err) throw err;
        return res.send("user deleted");
      });
  });


//POST/animal
app.post("/animal", function(req, res){
//  var new_animal_id = data.insertId // se agrega solo al registrar el animal
  var owner_user_id = req.body.owner_user_id;
  var name = req.body.name;
  var animal_type_id = req.body.animal_type_id;
  var animal_breed_id = req.body.animal_breed_id;
  var birthdate = new Date(req.body.birthdate);
  var gender = req.body.gender;
  var size = req.body.size;
  var picture = req.body.picture;
  var description = req.body.description;
  var creation_date = new Date(req.body.creation_date); //se agrega sola al registrar el animal
  var status = req.body.status;
  //update to lost
  var lost_date = new Date(req.body.lost_date);
  var lost_address_id = req.body.lost_address_id;
  //update to found
  var found_date = new Date(req.body.found_date);
  var found_address_id = req.body.found_address_id;

  connection.query("INSERT INTO animal (owner_user_id, name, animal_type_id, birthdate, gender, size, picture, description) VALUES("
              +owner_user_id+",'"+name+"',"+animal_type_id+","+connection.escape(birthdate)+",'"+gender+"','"+size+"','"+picture+"','"+description+"');"
        ,function (err, result) {
          if (err) throw err;
          var new_animal_id = result.insertId;

      connection.query("INSERT INTO log_animal_user (animal_id, user_id) VALUES("
                            +new_animal_id+","+owner_user_id+");"
              ,function (err, result) {
                if (err) throw err;
              var new_record = req.body;
              new_record['id'] = result.insertId;
            });
      var new_record = req.body;
      new_record['id'] = result.insertId;
      return res.send(new_record);
      });
});


//GET/animalById/:id - GET animal according its id
    app.get("/animal/:id", function(req, res){
      var id = req.params.id;
     connection.query("SELECT * FROM animal WHERE id =("+id+");"
            ,function (err, data) {
              if(err) throw err;
              return res.send(data)
              });
      });

//GET/animals/:owner_user_id - GET owner_user_id from animal.
app.get("/animals/:owner_user_id", function(req, res){
  var owner_user_id = req.params.owner_user_id;

  connection.query("SELECT name, gender, picture, status, description, size FROM animal WHERE owner_user_id =("+owner_user_id+");"
        ,function (err, data) {
          if(err) throw err;

          //console.log(data);
          return res.send(data)
          });
  });


//GET/animalsByStatus/:status - GET list of animals according its status: (found, lost, adoption)
  app.get("/animalsByStatus/:status", function(req, res){
    var status = req.params.status;
   connection.query("SELECT name, gender, picture, status, description, size, lost_date, found_date, lost_address_id, found_address_id, birthdate FROM animal WHERE status =('"+status+"');"
          ,function (err, data) {
            if(err) throw err;
            return res.send(data)
            });
    });



  //UPDATE/animal/:id
  app.put("/animal/:id", function(req, res){
    var id = req.params.id;
    var new_value = req.body

    for(var i= 0; i<new_value.length; i++){
      connection.query("UPDATE animal SET "+new_value[i]['key']+" = '"+new_value[i]['value']+"' WHERE id =("+id+");"
        ,function (err, data) {
          if(err) throw err;
      })   //UPDATE
    }  //for
    connection.query("SELECT * FROM animal WHERE id =("+id+");"
      ,function (err, data) {
          return res.send(data);
        });//query select user by id
  }); //app.put



//DELETE/animalById/:id - DELETE animal according its id
  app.delete("/animal/:id", function(req, res){
    var id = req.params.id;
   connection.query("DELETE FROM animal WHERE id =("+id+");"
          ,function (err, data) {
            if(err) throw err;
            return res.send("eliminado")
            });
    });

  //GET/places
  app.get('/places', function(req, res){
    connection.query('SELECT * FROM place', function(err, data){
      if (err) throw err;
      return res.send(data);
    })
  })


  //POST/place
  app.post("/place", function(req, res){
    var name = req.body.name;
    var description = req.body.description;
    var picture = req.body.picture;
    var address_id = req.body.address_id;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;

    connection.query("INSERT INTO place (name, description, picture, address_id, latitude, longitude) VALUES("
              +"'"+name+"','"+description+"','"+picture+"','"+address_id+"','"+latitude+"','"+longitude+"');"
          ,function (err, data) {
            var new_place_id = data.insertId
            connection.query("SELECT * FROM place WHERE id =("+new_place_id+");"
                  ,function (err, data) {
                    if(err) throw err;
                    return res.send(data);
                    });
    });
  });



  //GET/place/:id - GET ONE PLACE INFO
  app.get("/place/:id", function(req, res){
    var id = req.params.id;

    connection.query("SELECT * FROM place WHERE id =("+id+");"
      ,function (err, data) {
        if(err) throw err;
        return res.send(data);
        });
    });


  //UPDATE/place/:id
  app.put("/place/:id", function(req, res){
    var id = req.params.id;
    var new_value = req.body

    for(var i= 0; i<new_value.length; i++){
      connection.query("UPDATE place SET "+new_value[i]['key']+" = '"+new_value[i]['value']+"' WHERE id =("+id+");"
        ,function (err, data) {
          if(err) throw err;

      })   //UPDATE
    }  //for

    connection.query("SELECT * FROM place WHERE id =("+id+");"
      ,function (err, data) {
          return res.send(data);
        });//query select place by id
  }); //app.put

//DELETE/place/:id
app.delete("/place/:id", function(req, res){
  var id = req.params.id;
  connection.query("DELETE FROM place WHERE id =("+id+");"
    ,function (err, data) {
      if(err) throw err;
        return res.send("place deleted");
      });
  });

  //POST/comment/:place_id
  app.post("/comment", function(req, res){
    var comment = req.body.comment;
    var score = req.body.score;
    var place_id = req.body.place_id;
    var user_id = req.body.user_id;

    connection.query("INSERT INTO place_comment (comment, score, place_id, user_id) VALUES("
              +"'"+comment+"',"+score+","+place_id+","+user_id+");"
          ,function (err, data) {
            var new_comment_id = data.insertId
            connection.query("SELECT * FROM place_comment WHERE id =("+new_comment_id+");"
                  ,function (err, data) {
                    if(err) throw err;
                    return res.send(data);
                    });
    });
  });


  //GET/commentByPlaceId/:place_id - GET list of comments according its place_id
    app.get("/commentsByPlaceId/:place_id", function(req, res){
      var place_id = req.params.place_id;
      console.log(place_id);
      connection.query("SELECT * FROM place_comment WHERE place_id =("+place_id+");"
            ,function (err, data) {
              if(err) throw err;
              return res.send(data);
              });
      });


      //DELETE/comment/:id
      app.delete("/comment/:id", function(req, res){
        var id = req.params.id;
        connection.query("DELETE FROM place_comment WHERE id =("+id+");"
          ,function (err, data) {
            if(err) throw err;
              return res.send("comment deleted");
            });
        });



    app.listen(443, function(){
      console.log("Server is listening in port 443")
    })
});
