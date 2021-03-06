'use strict'

//variable globales
const express = require("express")
const app = express();
const bodyParser = require("body-parser")

//Carga de Rutas
var loginRoutes = require("./routes/loginRoutes")
var hotelRoute = require("./routes/hotelRoutes")

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Cabecera
app.use((rep, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-with, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GER, POST, OPTIONS, PUT, DELETE')

    next();
})

//RUTAS
app.use('/api', loginRoutes, hotelRoute)

//Exportar
module.exports = app;