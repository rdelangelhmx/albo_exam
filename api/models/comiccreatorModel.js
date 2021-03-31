/**
 * Created by rda on 30/03/2021.
 * Schema for Comic and Creators
*/
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComicCreatorsSchema = new Schema(
{
    idComic: { type: Number },
    idCreator: { type: Number },
    lastUpdate: { type: Date }
});

module.exports = mongoose.model('ComicCreators', ComicCreatorsSchema);