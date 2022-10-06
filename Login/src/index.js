const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const history = require('connect-history-api-fallback');
const path = __dirname + '/app/views';
require('dotenv').config({path: './.env'});


const app = express();
mongoose.connect(process.env.DB_STRING)
.then(db => console.log('ok'))
.catch(err => console.error(err))

//Settings
app.set('port',3021 )
//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(history());
app.use(express.static(path));
//Routes
app.use('/login',require('./routes/login'));
//Static files
app.use(express.static(__dirname + '/public'))

//Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})