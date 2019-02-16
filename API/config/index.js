'use strict';

// Configurando variables, "mongoose" para la base de datos, "app" para asignar el archivo de rutas en la web
// y "port" para el puerto. En este caso, por ser visual studio, asignara el puerto automatico, sino lo asignase usaria el puerto 3977.
const mongoose = require('mongoose');
const app = require('./app');
// var port = process.env.port || 3977
const port = 3977;

// conectando a base de datos, donde si no conecta expulsa el mensaje de error en consola.
mongoose.connect('mongodb://localhost:27017/app_bares', { auth: { authdb: 'admin' } }, (err) => {
  // este es un callback "(err, res)" cuando conecta a la base de datos"
  if (err) {
    throw err;
  } else {
    console.log('La base de datos esta corriendo correctamente...');
  }

  // introducimos dentro del callback el inicio del servidor web que esta en app.js
  app.listen(port, () => {
    console.log(`Servidor del api rest escuchando en http://localhost:${port}`);
  });
});
