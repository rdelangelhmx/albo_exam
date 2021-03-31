/**
 * Created by rda on 30/03/2021.
 */

 'use strict';
 const mongoose = require('mongoose'),
     Character = mongoose.model('Character');
     
async function find(filter){
    const doc = Character.findOne(filter).exec();
    return doc;
}

module.exports.find = find;