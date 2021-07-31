const router = require('express').Router();
const { MongoClient } = require("mongodb");
var ObjectID = require('mongodb').ObjectID;

const mongoUrl = "mongodb://localhost:27017/";
const client = new MongoClient(mongoUrl,{useNewUrlParser: true,useUnifiedTopology: true});
let db;
let canchas;
client.connect().then(a => {
    console.log("Conexión establecida con mongodb");
    db = client.db("deportes");
    canchas = db.collection("canchas");
});

router.get('/',  function (req, res) {
    canchas.find({}).toArray(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send( JSON.stringify(result));
        }
    })
});

router.post('/',  function (req, res) {
    console.log('VINO AL POST CANCHAS ')
    console.log(req.body)
    if(req.body.idCancha != "" && req.body.tipoCancha != "" && req.body.cantidad != "" && req.body.precio != ""){
        canchas.insertOne(req.body)
        res.json('Dio true' + req.body);
    }else {
        res.json('No se pueden agregar valores null' + req.body);
    }
   

});
router.put('/:idCancha',  function (req, res) {
    console.log('VINO AL PUT CANCHAS');
    canchas.updateOne({idCancha: req.params.idCancha}, {$set:{tipoCancha: req.body.tipoCancha, 
        cantidad: req.body.cantidad,precio: req.body.precio}}, (err, result) => {
          if(err) {
            throw err;
          }
          console.log(result);
          res.send('user updated sucessfully');
        }); 
});

router.delete('/:idCancha',  function (req, res) {
    console.log('VINO AL DELETE CANCHAS' + req.body.idCancha)
    canchas.deleteOne({ idCancha: req.params.idCancha}, (err, result) => {
        if(err) {
          throw err;
        }
        res.json('Dio true ' + req.body);
      });   
});


module.exports = router;