const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all users
const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

// Get a single user by ID
const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id); 
        const result = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });
        
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        


        
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result); // Return the found user
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAll,
    getSingle
};
