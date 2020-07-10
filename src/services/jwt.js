'use strict'

var jwt = require("jwt-simple")
var moment = require("moment")
var secret = 'clave_secreta_IN6BM'

exports.createToken = function(alumno){
    var payload = {
        sub: alumno._id,
        nombre: alumno.nombre,
        usuario: alumno.usuario,
        email: alumno.email,
        rol: alumno.rol,
        iat: moment().unix(),
        exp: moment().day(30, 'days').unix()
    }
    return jwt.encode(payload, secret)
}