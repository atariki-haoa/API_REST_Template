'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'dMCcRzDpj1'

exports.createToken = function (user) {
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surename,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(), //fecha de creacion
        exp: moment().add(30, 'days').unix //fecha de expiracion
    };

    return jwt.encode(payload, secret);
};