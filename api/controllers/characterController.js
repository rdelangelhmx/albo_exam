/**
 * Created by rda on 30/03/2021.
 */

'use strict';

let mongoose = require('mongoose'),
  Character = mongoose.model('Character');

exports.listCharacter = function(req, res) {
  console.log(req.params);
    Character.find({}, function(err, character) {
        if (err)
            res.send(err);
        res.json(character);
    });
};

exports.updateCharacter = function(req, res) {
    Character.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, function(err, character) {
      if (err)
        res.send(err);
      res.json(character);
    });
};