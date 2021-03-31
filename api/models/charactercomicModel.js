/**
 * Created by rda on 30/03/2021.
 * Schema for Character and Comics
*/
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CharacterComicsSchema = new Schema(
{
    idCharacter: { type: Number },
    idComic: { type: Number },
    lastUpdate: { type: Date }
});

module.exports = mongoose.model('CharacterComics', CharacterComicsSchema);