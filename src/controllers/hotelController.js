
'use strict'


var bcrypt = require("bcrypt-nodejs");
var Hotel = require('../models/hotel')

function agregarHotel(req, res) {
    var hotel = new Hotel()
    var params = req.body

    if(req.user.rol === 'ROLE_USUARIO'){
        return res.status(500).send({message: 'no tienes los perimisos necesarios'})
    }

    if(params.nombre){
        hotel.nombre = params.nombre;
        hotel.calificacion = params.calificacion;
        hotel.fecha = params.fecha;
        hotel.precio = params.precio;

        Hotel.find({ $or: [
            { nombre: hotel.nombre}
        ] }).exec((err, usuarios)=>{
            if(err) return res.status(500).send({message: 'Error en la peticion de Usuario'})

            if(usuarios && usuarios.length >= 1){
                return res.status(500).send({message: 'El usuario ya existe'})
            }else{
                bcrypt.hash(params.password, null, null, (err, hash)=>{
                    hotel.password = hash;

                    hotel.save((err, usuariosGuardado)=>{
                        if(err) return res.status(500),send({message: 'Error al guardar el usuario'})

                        if(usuariosGuardado){
                            res.status(200).send({user: usuariosGuardado})
                        }else{
                            res.status(404).send({message: 'no se ha podido registrar el usuario'})
                        }
                    })
                })
            }
        })
    }else{
        res.status(200).send({
            message: 'Complete los datos necesarios'
        })
    }
}

function editar(req, res){
    var hotelId = req.params.idHotel
    var params = req.body

    // borrar la propiedad de password para no hacer editada
    delete params.password

    if(req.user.rol === 'ROLE_USUARIO'){
        return res.status(500).send({message: 'no tienes los perimisos necesarios'})
    }

    if(hotelId != req.user.sub){
        return res.status(500).send({message: 'No tiene los permisos para actualizar este usuario'})
    }

    Hotel.findByIdAndUpdate(hotelId, params, {new: true}, (err, usuarioActualizado)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'})
        if(!usuarioActualizado) return res.status(404).send({message: 'No se ha podido actualizar los datos de usuario'})
        
        return res.status(200).send({usuario: usuarioActualizado})
    })
}

function eliminar(req, res){
    var hotelId = req.params.idHotel

    if(req.user.rol === 'ROLE_USUARIO'){
        return res.status(500).send({message: 'no tienes los perimisos necesarios'})
    }
    
    if(hotelId != req.user.sub){
        return res.status(500).send({message: 'No tienes los permisos necesarios para eliminar este usuario'})
    }
    Hotel.findByIdAndDelete( hotelId, (err, usuarioEliminado)=>{
        if(err) return res.status(500).send({message: 'error en la peticion'})
        if(!usuarioEliminado) return res.status(404).send({message: 'No se ha podido eliminar este usuario'})

        return res.status(200).send({usuario: usuarioEliminado})
    })
}

function buscarCalificacion(req,res){
    var opcion = req.params.opcion

    Login.find({calificacion:{$regex:opcion, $options:'i'}},(err, respuesta)=>{
        if(err) return res.status(500).send({message:'error en la peticion del nombre'})
        if(!respuesta) return res.status(404).send({message:'no se ha podido encontrar el nombre desado'})

        return res.status(200).send({respuesta})
    })
}

function buscarfecha(req,res){
    var opcion = req.params.opcion

    Hotel.find({fecha:{$regex:opcion, $options:'i'}},(err, respuesta)=>{
        if(err) return res.status(500).send({message:'error en la peticion del nombre'})
        if(!respuesta) return res.status(404).send({message:'no se ha podido encontrar el nombre desado'})

        return res.status(200).send({respuesta})
    })
}

function ordenarMayor(req,res){

        Hotel.find((err, respuesta)=>{
            if(err) return res.status(500).send({message:'error en la peticion del nombre'})
            if(!respuesta) return res.status(404).send({message:'no se ha podido encontrar el nombre desado'})

            return res.status(200).send({respuesta})
        }).sort({precio:-1})
}

function ordenarMenor(req,res){

    Hotel.find((err, respuesta)=>{
        if(err) return res.status(500).send({message:'error en la peticion del nombre'})
        if(!respuesta) return res.status(404).send({message:'no se ha podido encontrar el nombre desado'})

        return res.status(200).send({respuesta})
    }).sort({precio:1})
}

function ordenarAlfabeticamente(req,res){

    Hotel.find((err, respuesta)=>{
        if(err) return res.status(500).send({message:'error en la peticion del nombre'})
        if(!respuesta) return res.status(404).send({message:'no se ha podido encontrar el nombre desado'})

        return res.status(200).send({respuesta})
    }).sort({nombre:1})
}
module.exports = {
    agregarHotel,
    editar,
    eliminar,
    buscarCalificacion,
    buscarfecha,
    ordenarMenor,
    ordenarMayor,
    ordenarAlfabeticamente
}