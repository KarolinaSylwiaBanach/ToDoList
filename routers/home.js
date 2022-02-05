const express = require('express');
const homeRouter = express.Router();

homeRouter
    .get('/', (req, res) => {
        //redirect to another page
        res.redirect('/todo');
    });


module.exports = {
    homeRouter,
}