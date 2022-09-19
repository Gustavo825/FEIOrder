const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const restaurant = require('../')

module.exports = router;


//GET
router.get('/', async (req, res) => {
    const restaurants = await loadRestaurantsCollection();
    res.send(await restaurants.find({}).toArray());
});


