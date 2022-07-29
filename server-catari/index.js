//archivo index.js
var express = require('express');
const fs = require('fs');
var app = express();
var cors = require("cors");

const PUERTO = 5000;


/**
 *  App Configuration
 */
 app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  }) 
  //app.use(helmet());
  app.use(cors());
  // parse application/x-www-form-urlencoded
 app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

app.listen(PUERTO, function(){
	console.log('Servidor http correindo en el puerto 5000');
});

app.get('/servicio', function(req, res){
    // array aux 
    var myArray = [];
    var acum = 0;
    var cont=0;
    var promedio=0;
    let rawdata = fs.readFileSync('students.json');
    let student = JSON.parse(rawdata);
    for (const object in student) {
        
        if(student[object].active){
            myArray.push(student[object]);
        }
        acum+=student[object].grades;
        cont++;
    }
    promedio=acum/cont;
    res.send({students: myArray, promedio});
});