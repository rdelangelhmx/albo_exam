/**
 * Created by rda on 30/03/2021.
 */

'use strict';
const mongoose = require('mongoose'),
    Character = mongoose.model('Character'),
    CharacterComics = mongoose.model('CharacterComics'),
    Comic = mongoose.model('Comic'),
    ComicCreators = mongoose.model('ComicCreators'),
    Creator = mongoose.model('Creator'),
    crypto = require('crypto'),
    request = require('request'),
    apikey = '8c9a6f2989deaf416fff762396ccaf96';
let ts = 0,
    hash = '',
    character = '',
    message = '',
    dataCharacter = [],
    dataComic = [],
    dataCreator = [];

exports.Update = (req, res) => {
    mongoose.set('useFindAndModify', false);
    ts = Math.round(Math.random() * 10000);
    hash = crypto.createHash('md5').update(`${ts}bdbf218d0de961da63d1ce21d020d07684ff469a8c9a6f2989deaf416fff762396ccaf96`).digest('hex');

    switch(req.params.character) {
        case 'capamerica':
            character = 'name=Captain America&';
            break;
        case 'ironman':
            character = 'name=Iron Man&';
            break;
        default:
            character = '';
            break;
    }
    // Get data from Marvel
    dataCharacter = [];
    getDataCharacter(0, req, res);
};

// Get Character Data from Marvel
function getDataCharacter(page, req, res){
    request(`http://gateway.marvel.com/v1/public/characters?${character}limit=100&offset=${page*100}&apikey=${apikey}&ts=${ts}&hash=${hash}`, (error, response, body) => {
        try {
            console.log(`Get Character ${page*100+100}`);
            dataCharacter = JSON.parse(body).data.results;
            procCharacter(req, res);

            page = page + 1;
            var obtenidos = (page*100);
            if(obtenidos <= JSON.parse(body).data.total) {
                getDataCharacter(page, req, res);
            }
        } catch (error) {
            console.error(error);
            res.send('Error: no data can retrieved from uri');
            return;
        }
    });
}

// Process Character Data
async function procCharacter(req, res) { 
    message = '';
    if(dataCharacter.length > 0) {
        dataCharacter.forEach(element => {
            try {
                element.lastUpdate = new Date();
                // Find Character
                let char = Character.findOne({ id: element.id });
                char instanceof Character;

                Character.findOne({ id: element.id }, (err, doc) => {                    
                    if(doc == null) {
                        // Perform Insert command
                        Character.create(element, (err, doc) => {
                            if(!err) message = `${message}Character ${element.id} has been inserted\n\r`;
                            else message = `${message}Character ${element.id} cannot be inserted\n\r`;
                            // Get Comic data
                            dataComic = [];
                            getDataComic(0, req, res, element.id);
                        }); 
                    }
                    else {
                        // Perform Update command
                        Character.updateOne({ id: element.id }, element, (err, doc) => {
                            if(!err) message = `${message}Character ${element.id} has been updated\n\r`;
                            else message = `${message}Character ${element.id} cannot be updated\n\r`;
                            // Get Comic data
                            dataComic = [];
                            getDataComic(0, req, res, element.id);
                        });
                    }
                });
            } catch (err) {
                console.error(err);
                message = `Error: No data has been altered`;
            }
        });
    }
    else {
        message = 'Data not found\n\r';
        dataCharacter = [];
    }
}

// Get Comic Data for Character from Marvel
function getDataComic(page1, req, res, idCharacter){
    request(`http://gateway.marvel.com/v1/public/characters/${idCharacter}/comics?limit=100&offset=${page1*100}&apikey=${apikey}&ts=${ts}&hash=${hash}`, (error, response, body) => {
        try {
            console.log(`Get Comics ${page1*100+100}`);
            dataComic = JSON.parse(body).data.results;
            procComic(req, res, idCharacter);

            page1 = page1 + 1;
            var obtenidos = (page1*100);
            if(obtenidos <= JSON.parse(body).data.total) {
                getDataComic(page1, req, res, idCharacter);
            } 
        } catch (error) {
            console.error(error);
            res.send('Error: no data can retrieved from uri');
            return;
        }
    });
}

// Process Colmic Data
async function procComic(req, res, idCharacter) { 
    if(dataComic.length > 0) {
        dataComic.forEach(element => {
            try {
                element.lastUpdate = new Date();
                // Find Character
                Comic.findOne({ id: element.id }, (err, doc) => {
                    if(doc == null) {
                        // Perform Insert command
                        Comic.create(element, (err, doc) => {
                            if(!err) message = `${message}Comic ${element.id} has been inserted\n\r`;
                            else message = `${message}Comic ${element.id} cannot be inserted\n\r`;
                            CharacterComics.deleteMany({ idCharacter: idCharacter }, (err) => {              
                                // Insert into CharacterComics
                                CharacterComics.create({ idCharacter: idCharacter, idComic: element.id }, (err, doc) => {
                                    if(!err) message = `${message}Comic ${element.id} has been inserted\n\r`;
                                    else message = `${message}Comic ${element.id} cannot be inserted\n\r`;
                                });
                            });
                            // Get Creator data
                            dataCreator = [];
                            getDataCreator(0, req, res, element.id);
                        }); 
                    }
                    else {
                        // Perform Update command
                        Comic.updateOne({ id: element.id }, element, (err, doc) => {
                            if(!err) message = `${message}Comic ${req.params.character} has been updated\n\r`;
                            else message = `${message}Comic ${req.params.character} cannot be updated\n\r`;
                            CharacterComics.deleteMany({ idCharacter: idCharacter }, (err) => {              
                                // Insert into CharacterComics
                                CharacterComics.create({ idCharacter: idCharacter, idComic: element.id }, (err, doc) => {
                                    if(!err) message = `${message}Comic ${element.id} has been inserted\n\r`;
                                    else message = `${message}Comic ${element.id} cannot be inserted\n\r`;
                                });
                            });
                            dataCreator = [];
                            getDataCreator(0, req, res, element.id);
                        });
                    }
                });
            } catch (err) {
                console.error(err);
                message = `Error: No data has been altered`;
            }
        });
    }
    else {
        message = 'Data not found\n\r';
        dataComic = [];
    }
}

// Get Creator Data for Comic from Marvel
function getDataCreator(page2, req, res, idComic){    
    request(`http://gateway.marvel.com/v1/public/comics/${idComic}/creators?limit=100&offset=${page2*100}&apikey=${apikey}&ts=${ts}&hash=${hash}`, (error, response, body) => {
        try {
            console.log(`Get Creators ${page2*100+100}`);
            dataCreator = JSON.parse(body).data.results;
            procCreator(req, res, idComic);

            page2 = page2 + 1;
            var obtenidos = (page2*100);
            if(obtenidos <= JSON.parse(body).data.total) {
                getDataCreator(page2, req, res, idComic);
            }
        } catch (error) {
            console.error(error);
            res.send('Error: no data can retrieved from uri');
            return;
        }
    });
}

// Process Creator Data
async function procCreator(req, res, idComic) { 
    if(dataCreator.length > 0) {
        dataCreator.forEach(element => {
            try {
                element.lastUpdate = new Date();
                // Find Character
                Creator.findOne({ id: element.id }, (err, doc) => {
                    if(doc == null) {
                        // Perform Insert command
                        Creator.create(element, (err, doc) => {
                            if(!err) message = `${message}Comic ${element.id} has been inserted\n\r`;
                            else message = `${message}Comic ${element.id} cannot be inserted\n\r`;
                            ComicCreators.deleteMany({ idComic: idComic }, (err) => {
                                // Insert into CharacterComics
                                ComicCreators.create({ idComic: idComic, idCreator: element.id }, (err, doc) => {
                                    if(!err) message = `${message}Creator ${element.id} has been inserted\n\r`;
                                    else message = `${message}Creator ${element.id} cannot be inserted\n\r`;
                                });
                            });
                        }); 
                    }
                    else {
                        // Perform Update command
                        Creator.updateOne({ id: element.id }, element, (err, doc) => {
                            if(!err) message = `${message}Creator ${req.params.character} has been updated\n\r`;
                            else message = `${message}Creator ${req.params.character} cannot be updated\n\r`;
                            ComicCreators.deleteMany({ idComic: idComic }, (err) => {
                                // Insert into CharacterComics
                                ComicCreators.create({ idComic: idComic, idCreator: element.id }, (err, doc) => {
                                    if(!err) message = `${message}Creator ${element.id} has been inserted\n\r`;
                                    else message = `${message}Creator ${element.id} cannot be inserted\n\r`;
                                });
                            });
                        });
                    }
                });
            } catch (err) {
                console.error(err);
                message = `Error: No data has been altered`;
            }
        });
    }
    else {
        message = 'Data not found\n\r';
        dataCreator = [];
    }
}
