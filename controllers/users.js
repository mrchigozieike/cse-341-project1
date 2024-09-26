const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all users
const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) =>{
        res.setHeader('content-type', 'application/json');
        res.status(200).json(users);
    });

};

// Get a single user by ID
const getSingle = async (req, res) => {    
    const userId = new ObjectId(req.prams.id);
    const result = await mongodb.getDatabase().db().collection('users').find();
     
    result.toArray().then((users) =>{
        res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users[0]);
        });
};

module.exports = {
    getAll,
    getSingle
};
