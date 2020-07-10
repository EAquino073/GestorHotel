'use strict'


var bcrypt = require("bcrypt-nodejs");
var Login = require('../models/login')
var jwt = require("../services/jwt")

function registrarUsuario(req, res) {
    var usuario = new Login()
    var params = req.body

    if(params.nombre && params.usuario && params.password){
        usuario.nombre = params.nombre;
        usuario.usuario = params.usuario;
        usuario.email = params.email;
        usuario.rol = 'ROLE_USUARIO';

        Login.find({ $or: [
            { usuario: usuario.usuario },
            { email: usuario.email }
        ] }).exec((err, usuarios)=>{
            if(err) return res.status(500).send({message: 'Error en la peticion de Usuario'})

            if(usuarios && usuarios.length >= 1){
                return res.status(500).send({message: 'El usuario ya existe'})
            }else{
                bcrypt.hash(params.password, null, null, (err, hash)=>{
                    usuario.password = hash;

                    usuario.save((err, usuariosGuardado)=>{
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

function registrarHotel(req, res) {
    var hotel = new Login()
    var params = req.body

    if(params.nombre && params.usuario && params.password){
        hotel.nombre = params.nombre;
        hotel.usuario = params.usuario;
        hotel.email = params.email;
        hotel.rol = 'ROLE_HOTEl';

        Login.find({ $or: [
            { usuario: hotel.usuario },
            { email: hotel.email }
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

function login(req, res){
    var params = req.body;

    Login.findOne({email: params.email}, (err, user)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'})
        
        if(user){
            bcrypt.compare(params.password, user.password, (err, check)=>{
                if(check){
                    if (params.gettoken){
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        })
                    }else{
                        user.password = undefined;
                        return res.status(200).send({user})
                    }
                }else{
                    return res.status(404).send({message: 'El usuario o contraseña no han sido identificado'})
                }
            })
        }else{
            return res.status(404).send({message: 'El usuario no se ha podido logear'})
        }
    })
}

function editar(req, res){
    var userId = req.params.idUsuario
    var params = req.body

    // borrar la propiedad de password para no hacer editada
    delete params.password

    if(userId != req.user.sub){
        return res.status(500).send({message: 'No tiene los permisos para actualizar este usuario'})
    }

    Login.findByIdAndUpdate(userId, params, {new: true}, (err, usuarioActualizado)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'})
        if(!usuarioActualizado) return res.status(404).send({message: 'No se ha podido actualizar los datos de usuario'})
        
        return res.status(200).send({usuario: usuarioActualizado})
    })
}

function eliminar(req, res){
    var userId = req.params.idUsuario
    
    if(userId != req.user.sub){
        return res.status(500).send({message: 'No tienes los permisos necesarios para eliminar este usuario'})
    }
    Login.findByIdAndDelete( userId, (err, usuarioEliminado)=>{
        if(err) return res.status(500).send({message: 'error en la peticion'})
        if(!usuarioEliminado) return res.status(404).send({message: 'No se ha podido eliminar este usuario'})

        return res.status(200).send({usuario: usuarioEliminado})
    })
}



module.exports = {
    registrarUsuario,
    login,
    registrarHotel,
    editar,
    eliminar,
}