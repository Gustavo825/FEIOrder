const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://admin:admin@cluster0.g64tnu7.mongodb.net/?retryWrites=true&w=majority').then(db => console.log("Conectado"));

const app = express();

//MiddleWare
app.use(bodyParser.json());
app.use(cors());

const restaurants = require('./routes/restaurant');

app.use('/restaurant', restaurants);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Hola"));
