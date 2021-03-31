/**
 * Created by rda on 30/03/2021.
 * Schema for Comic
 */

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComicSchema = new Schema(
{
    id: { type: Number },
    digitalId: { type: Number },
    title: { type: String },
    issueNumber: { type: Number },
    variantDescription: { type: String },
    description: { type: String },
    modified: { type: Date },
    isbn: { type: String },
    upc: { type: String },
    diamondCode: { type: String },
    ean: { type: String },
    issn: { type: String },
    format: { type: String },
    pageCount: { type: Number },
    textObjects: { type: Array },
    resourceURI: { type: String },
    lastUpdate: { type: Date }
});

module.exports = mongoose.model('Comic', ComicSchema);