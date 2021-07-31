const router = require('express').Router();
const { MongoClient } = require("mongodb");
var ObjectID = require('mongodb').ObjectID;

const mongoUrl = "mongodb://localhost:27017/";
const client = new MongoClient(mongoUrl,{useNewUrlParser: true,useUnifiedTopology: true});
let db;
let reservas;
client.connect().then(a => {
    console.log("Conexión establecida con mongodb");
    db = client.db("deportes");
    reservas = db.collection("reservas");
});



router.get('/',  function (req, res) {
    reservas.find({}).toArray(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send( JSON.stringify(result));
        }
    })
});

router.post('/',  function (req, res) {
        console.log('VINO AL POST RESERVAS ')
        console.log(req.body)
        if(req.body.idReserva !=  "" && req.body.nombre !=   ""  && req.body.apellido !=  ""  && req.body.telefono !=  "" 
            && req.body.tipoCancha !=  ""  && req.body.precio !=  ""  && req.body.email !=  ""  &&  req.body.fecha !=  ""  && req.body.hora !=  ""  ){
            reservas.insertOne(req.body)
            res.json('Dio true' + req.body);
        }else{
            res.json('No se pueden agregar valores null' + req.body);
        }
     
    
});

router.put('/:idReserva',  function (req, res) {
    console.log('VINO AL PUT RESERVAS');
    let idReserva = parseInt(req.params.idReserva);
    
    reservas.updateOne({idReserva: idReserva}, {$set:{idReserva:req.body.idReserva,
    nombre: req.body.nombre, apellido: req.body.apellido,telefono: req.body.telefono,
    tipoCancha: req.body.tipoCancha, email: req.body.email,precio: req.body.precio ,hora: req.body.hora ,
    fecha: req.body.fecha}}, (err, result) => {
    if(err) {
        throw err;
    }
    res.send('user updated sucessfully');
    });   
});

router.delete('/:idReserva',  function (req, res) {
    console.log('VINO AL DELETE RESERVA ')
    let idReserva = parseInt(req.params.idReserva);
    console.log(idReserva);
    reservas.deleteOne({ idReserva: idReserva}, (err, result) => {
        if(err) {
          throw err;
        }
        res.json('Dio true ' + req.body);
      });   
});

module.exports = router;