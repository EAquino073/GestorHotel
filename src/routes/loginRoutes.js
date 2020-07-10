'use strict'

var express = require("express")
var loginController = require("../controllers/loginController")
var md_auth = require("../middlewares/authenticated")

//Rutas

var api = express.Router()
api.post('/registrarUsuario', loginController.registrarUsuario)
api.post('/registrarHotel', loginController.registrarHotel)
api.post('/login', loginController.login)
api.put('/editar/:idUsuario', md_auth.ensureAuth, loginController.editar)
api.put('/eliminar/:idUsuario', md_auth.ensureAuth, loginController.eliminar)
module.exports = api;