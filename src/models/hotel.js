'use strict'

var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var HotelSchema = Schema({
    nombre: String,
    calificacion: String,
    fecha: String,
    precio: String
})

module.exports = mongoose.model('hotel', HotelSchema)