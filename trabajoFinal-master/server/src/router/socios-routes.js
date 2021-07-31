const router = require('express').Router();
const { MongoClient } = require("mongodb");
var ObjectID = require('mongodb').ObjectID;

const mongoUrl = "mongodb://localhost:27017/";
const client = new MongoClient(mongoUrl,{useNewUrlParser: true,useUnifiedTopology: true});
let db;
let socios;
client.connect().then(a => {
    console.log("Conexión establecida con mongodb");
    db = client.db("deportes");
    socios = db.collection("socios");
});



router.get('/',  function (req, res) {
    socios.find({}).toArray(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send( JSON.stringify(result));
        }
    })
}); 
router.post('/',  function (req, res) {

 console.log('VINO AL POST SOCIOS');
console.log(req.body);
   if(req.body.dni !=  "" && req.body.nombre !=  "" && req.body.apellido != "" && req.body.telefono != ""){
            socios.insertOne(req.body)
            res.json('Dio true' + req.body);
    }else{
        res.json('No se pueden agregar valores null' + req.body);
    }

        //res.sendStatus(400).send('Error')

});
router.put('/:dni',  function (req, res) {
    console.log('VINO AL PUT SOCIOS');
    let dni = parseInt(req.params.dni);
      socios.updateOne({dni: dni},{$set:{nombre: req.body.nombre, 
      apellido: req.body.apellido,telefono: req.body.telefono}}, (err, result) => {
        if(err) {
          throw err;
        }
        console.log(result.result)
        res.send('user updated sucessfully');
      });   
});
router.delete('/:dni',  function (req, res) {
    console.log('VINO AL DELETE SOCIOS ' + req.body.dni)
    let dni = parseInt(req.params.dni);
    console.log(dni);
    socios.deleteOne({ dni: dni}, (err, result) => {
        if(err) {
          throw err;
        }
        res.json('Dio true ' + req.body);
      });   
});


module.exports = router;