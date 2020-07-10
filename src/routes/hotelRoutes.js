'use strict'

var express = require("express")
var hotelController = require("../controllers/hotelController")
var md_auth = require("../middlewares/authenticated")

//Rutas

var api = express.Router()
api.post('/agregarHotel',md_auth.ensureAuth ,hotelController.agregarHotel)
api.put('/editar/:idUsuario', md_auth.ensureAuth, hotelController.editar)
api.put('/eliminar/:idUsuario', md_auth.ensureAuth, hotelController.eliminar)
api.get('/ordenarmenor', md_auth.ensureAuth, hotelController.ordenarMenor)
api.get('/ordenarmayor', md_auth.ensureAuth, hotelController.ordenarMayor)
api.get('/ordenaralfabeticamente', md_auth.ensureAuth, hotelController.ordenarAlfabeticamente)
api.get('/buscarfecha/:opcion', md_auth.ensureAuth, hotelController.buscarfecha)
module.exports = api;