'use strict'

var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var LoginSchema = Schema({
    nombre: String,
    usuario: String,
    email: String,
    password: String,
    rol: String,
})

module.exports = mongoose.model('login', LoginSchema)