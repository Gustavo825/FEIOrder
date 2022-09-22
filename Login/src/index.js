const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const history = require('connect-history-api-fallback');
const path = __dirname + '/app/views';

const app = express();
mongoose.connect('mongodb+srv://admin:1234@feiorder.1xhfttc.mongodb.net/?retryWrites=true&w=majority')
.then(db => console.log('ok'))
.catch(err => console.error(err))
//Settings
app.set('port',3018 )
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