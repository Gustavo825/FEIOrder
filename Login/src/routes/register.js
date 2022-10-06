const express = require('express');
const { createServer } = require('telnet');
const router = express.Router();

const User = require('../models/User')
const saltRounds = 10;
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    let body = req.body;
    body.pass = bcrypt.hashSync(body.pass, saltRounds);
    try {
        // Buscamos email en DB
        let usuarioDB = await User.findOne({ email: body.email });
        // Evaluamos si existe el correo en DB
        if (usuarioDB) {
            return res.status(409).json({
                mensaje: 'El correo ya está registrado',
            });
        }

        // Evaluamos si existe el usuario en DB
        usuarioDB = await User.findOne({ username: body.username });
        if (usuarioDB) {
            return res.status(409).json({
                mensaje: 'El nombre de usuario ya se encuentra en uso',
            });
        }

        const userDB = await User.create(body);
        return res.json(userDB);

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }

})

module.exports = router; 