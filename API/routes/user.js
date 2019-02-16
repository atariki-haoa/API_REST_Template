'use strict';

// Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
const express = require('express');
const UserController = require('../controllers/user');


// enroutador para los controladores
const api = express.Router();
const mdAuth = require('../middlewares/authenticated');


// creando rutas para metodos en UserController
api.post('/register', UserController.saveQuery);
api.post('/login', UserController.loginUser);

// ruta para actualizar usuarios, uso obligatorio de headers y la id para poder actualizar (/:id hace obligatoria la id).
api.put('/user/:id', mdAuth.ensureAuth, UserController.updateQuery);
api.delete('/user/:id', mdAuth.ensureAuth, UserController.deleteQuery);


// exportando la ruta para ocuparla en otro fichero js
module.exports = api;
