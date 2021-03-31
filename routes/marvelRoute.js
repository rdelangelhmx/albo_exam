/**
 * Created by rda on 30/03/2021.
 */

'use strict';

let bodyParser = require('body-parser');

module.exports = function(app) {
  let characterApi = require('../api/controllers/characterController');
  let characterService = require('../marvel/services/characterService'); 

  // Route to list Creators by Character
  app.route('/marvel/creators/:character')
    .get(characterApi.listCharacter);

  // Route to Update by Character
  app.route('/marvel/update/:character')
    .get(characterService.Update);

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  // parse application/json
  app.use(bodyParser.json());
  // catch 404 and forward to error handler
  app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'});
  });

};