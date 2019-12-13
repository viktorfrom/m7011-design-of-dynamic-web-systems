const express = require('express');
const router = express.Router();
const House = require('../schemas/houseschema');
const prompt = require('prompt');

prompt.start();

/*
exports.houseInformation = function (req, res) {
    House.findById(req.params.id, function (err, House) {
        if (err) return next (err);
        res.send(House);
    })
}
*/

router.get('/findhouse', (req, res) => {
   let query =  House.findOne({ owner: req.body.owner}, function(err, obj) {
       console.log(obj);
       res.send(query);
   });
});

module.exports = router;