const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all users
const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('users').find().toArray();
        res.setHeader('content-type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve users', error: err });
    }
};

// Get a single user by ID
const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });
        
        if (result) {
            res.setHeader('content-type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve user', error: err });
    }
};

module.exports = {
    getAll,
    getSingle
};
