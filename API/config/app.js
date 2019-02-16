'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

// cargar rutas
const userRoutes = require('../routes/user');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configurar cabeceras http

// rutas base
// middleware, para que cada ejecucion tenga una "api" delante en cada petcion http para los controladores.
app.use('/api', userRoutes);


module.exports = app;
