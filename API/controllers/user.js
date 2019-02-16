'use strict';

const bcrypt = require('bcrypt-nodejs'); // encryptador para passwords.
const User = require('../models/user'); // cargar modelo usuarios a constiable para ser ocupada en el controaldor.
const jwt = require('../services/jwt');


// funcion para guardar nuevos usuarios
function saveQuery(req, res) {
  const user = new User();

  const params = req.body; // constiable para asignar todo lo que llegue del navegador por post.
  user.name = params.name;
  user.zone = params.zone;
  user.rfid = params.rfid;
  user.status = params.status;
  user.updateAt = Date.Now;
  if (params.password) {
    // Encriptar y guardar password
    bcrypt.hash(params.password, null, null, (err, hash) => {
      user.password = hash;
      if (user.name != null || user.status != null || user.zone != null) {
        // Guardar el usuario
        console.log(user);
        user.save((err_, userStored) => {
          if (err_) {
            res.status(500).send({ message: 'Error al guardar el usuario' });
          } else if (!userStored) {
            res.status(404).send({ message: 'No se ha registrado el usuario' });
          } else {
            res.status(200).send(JSON.stringify(userStored));
          }
        });
      } else {
        res.status(200).send({ message: 'Rellena todos los campos' });
      }
    });
  } else {
    res.status(200).send({ message: 'Introduce la contrase�a' });
  }
}

// funcion para actualizar usuarios
function updateQuery(req, res) {
  const userId = req.params.id;
  const update = req.body;

  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) {
      res.status(500).send({ message: 'Error al actualizar usuario' });
    } else if (!userUpdated) {
      res.status(404).send({ message: 'No se ha podido actualizar usuario' });
    } else {
      res.status(200).send(JSON.stringify(userUpdated));
    }
  });
}

// funcion para login de usuarios
function loginUser(req, res) {
  const params = req.body;
  const pass = params.password;
  User.findOne({ name: params.name }, (err, user) => {
    if (err) {
      res.status(500).send({ message: 'Error en la peticion' });
    } else if (!user) {
      res.status(404).send({ message: 'El usuario no existe' });
    } else {
      // Comprobar la contrasena
      bcrypt.compare(pass, user.password, (err_, check) => {
        if (err_) res.status(500).send({ message: 'Error al intentar autenticar' });
        if (check) {
          // Devolver datos del usuario logeado
          if (params.gethash) {
            // devolver un token de jwt si tiene la propiedad gethash
            res.status(200).send({
              token: jwt.createToken(user),
            });
          } else {
            res.status(200).send({ user });
          }
        } else {
          res.status(404).send({ message: 'El usuario no ha podido loguearse' });
        }
      });
    }
  });
}

function deleteQuery(req, res) {
  const objectId = req.params.id;
  User.findByIdAndRemove(objectId, (err, UserRemove) => {
    if (err) {
      res.status(500).send({ message: 'Error al borrar el objeto' });
    } else if (!UserRemove) {
      res.status(404).send({ message: 'El objeto no a sido eliminado o no existe' });
    } else {
      res.status(200).send(JSON.stringify(UserRemove));
    }
  });
}

module.exports = {
  saveQuery,
  loginUser,
  updateQuery,
  deleteQuery,
};
