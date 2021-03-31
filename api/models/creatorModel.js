/**
 * Created by rda on 30/03/2021.
 * Schema for Creator
 */

'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CreatorSchema = new Schema(
{
    id: { type: Number },
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    suffix: { type: String },
    fullName: { type: String },
    modified: { type: Date },
    thumbnail: {
        path: { type: String },
        extension: { type: String }
    },
    resourceURI: { type: String },
    lastUpdate: { type: Date }
});

module.exports = mongoose.model('Creator', CreatorSchema);