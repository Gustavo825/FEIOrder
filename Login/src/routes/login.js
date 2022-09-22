const express = require('express');
const { createServer } = require('telnet');
const router = express.Router();

const User = require('../models/User')

// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/newUser', async (req, res) => {

    const body = {
      nombre: req.body.nombre,
      email: req.body.email,
    }
  
    body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
    try {

        const userDB = await User.create(body);
        return res.json(userDB);
        
      } catch (error) {
        return res.status(500).json({
          mensaje: 'Ocurrio un error',
          error
        });
      }
    
    })

router.get('/',async (req,res) =>{
    const Users = await User.find();
    res.json(Users)
});

  router.post('/', async(req, res) => {

    let body = req.body;
  
    try {
      // Buscamos email en DB
      const usuarioDB = await User.findOne({email: body.email});
  
      // Evaluamos si existe el usuario en DB
      if(!usuarioDB){
        return res.status(400).json({
          mensaje: 'Usuario! o contraseña inválidos',
        });
      }
  
      // Evaluamos la contraseña correcta
      if( !bcrypt.compareSync(body.pass, usuarioDB.pass) ){
        return res.status(400).json({
          mensaje: 'Usuario o contraseña! inválidos',
        });
      }
  
      // Pasó las validaciones
      return res.json({
        usuarioDB,
        token: 'fkajsdkf'
      })
      
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      });
    }
  
  });

module.exports = router; 