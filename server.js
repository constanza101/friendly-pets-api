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
          return res.send({"id":data.insertId, "address": new_address,"postal_code": new_PC, "city_id": new_cityID});
        });
    });

  //POST/user
  app.post("/user", function(req, res){
    var new_name = req.body.name;
    var new_email = req.body.email;
    var new_password = req.body.password;
    var new_addressID = req.body.address_id;
    connection.query("INSERT INTO user (name, email, password, address_id) VALUES("
              +"'"+new_name+"','"+new_email+"',"+"SHA1("+"'"+new_password+"'"+")"+","+new_addressID+");"
          ,function (err, data) {
            var new_userID = data.insertId
            console.log(data);
            connection.query("SELECT * FROM user WHERE id =("+new_userID+");"
                  ,function (err, data) {
                    if(err) throw err;
                    return res.send(data);
                    });
    });
  });


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
              return res.send(data);
            });
        });


//POST/animal  nofunciona: birthdate.por ahora poniendo null puedo cargar todo lo demas pero no puedo dar con el formato de la fecha.

//POST  - owner_user_id id, name, animal_type_id, birthdate, gender, size, picture, description, creation_date, status
//update for adoption: just change: status = adoption
//update to lost: status=lost, lost_date, lost_address_id,
//update to found: status=found, found_date, found_address_id, owner_user_id, animal_breed_id

app.post("/animal", function(req, res){
  var new_animal_id = data.insertId // se agrega solo al registrar el animal
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

/*
  console.log("INSERT INTO animal (owner_user_id, name, animal_type_id, birthdate, gender, size, picture, description) VALUES("
              +owner_user_id+",'"+name+"',"+animal_type_id+","+birthdate+",'"+gender+"','"+size+"','"+picture+"','"+description+"');");
*/
  connection.query("INSERT INTO animal (owner_user_id, name, animal_type_id, birthdate, gender, size, picture, description) VALUES("
              +owner_user_id+",'"+name+"',"+animal_type_id+","+connection.escape(birthdate)+",'"+gender+"','"+size+"','"+picture+"','"+description+"');"
        ,function (err, result) {
          if (err) throw err;
        console.log(result.insertId);
        var new_record = req.body;
        new_record['id'] = result.insertId;
        return res.send(new_record);
          });


});


//GET//animals/:owner_user_id - GET owner_user_id from animal.
app.get("/animals/:owner_user_id", function(req, res){
  var owner_user_id = req.params.owner_user_id;

  connection.query("SELECT * FROM animal WHERE owner_user_id =("+owner_user_id+");"
        ,function (err, data) {
          if(err) throw err;

          //console.log(data);
          return res.send(data)
          });

  });

  //UPDATE/animal/:id
  app.put("/animal/:id", function(req, res){
    var id = req.params.id;
    var new_value = req.body

    for(var i= 0; i<new_value.length; i++){
      //console.log(new_value[i].key);
      connection.query("UPDATE animal SET "+new_value[i].key+" = '"+new_value[i].value+"' WHERE id =("+id+");"
        ,function (err, data) {
          if(err) throw err;
          //console.log(new_value[i].key.green);
      })   //UPDATE
    }  //for

    connection.query("SELECT * FROM user WHERE id =("+id+");"
      ,function (err, data) {
        if(err) throw err;
          return res.send(data);
        });//query select user by id
  }); //app.put




















    app.listen(8000, function(){
      console.log("Server is listening in port 8000")
    })

});
