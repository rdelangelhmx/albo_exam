/**
 * Created by rda on 30/03/2021.
 */

let express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Character = require('./api/models/characterModel'),
  Comic = require('./api/models/comicModel'),
  CharacterComics = require('./api/models/charactercomicModel'),
  Creator = require('./api/models/creatorModel'),
  ComicCreators = require('./api/models/comiccreatorModel');

// mongoose instance connection url connection
const uri = 'mongodb+srv://dbMarvelAlbo:M@rvelC0mics@marveldata.t9dq7.mongodb.net/AlboComics?retryWrites=true&w=majority';
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
// Connect to database
mongoose.connect(uri, {
  useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
// Get the default connection
let db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var routes = require('./routes/marvelRoute'); //importing route
routes(app); //register the routes

app.listen(port);

console.log('Marvel RESTful API started on: ' + port);