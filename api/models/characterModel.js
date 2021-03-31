/**
 * Created by rda on 30/03/2021.
 * Schema for Character
*/
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CharacterSchema = new Schema(
{
    id: { type: Number },
    name: { type: String },
    description: { type: String },
    modified: { type: Date },
    thumbnail: {
        path: { type: String },
        extension: { type: String }
    },
    resourceURI: { type: String },
    lastUpdate: { type: Date }
});

module.exports = mongoose.model('Character', CharacterSchema);