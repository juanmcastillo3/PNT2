const fs = require("fs");
const path = require("path");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//app.use(cors(corsOptions));
app.use(cors());
// ----

let sociosRoutes = require("../router/socios-routes.js");
let canchasRoutes = require("../router/canchas-routes.js");
let reservasRoutes = require("../router/reservas-routes.js");

app.use('/api/socios', sociosRoutes);
app.use('/api/canchas', canchasRoutes);
app.use('/api/reservas', reservasRoutes); 




const puerto = 3001;
const server = app.listen(puerto, () => {
    console.log(`servidor inicializado en puerto ${server.address().port}`)
});
