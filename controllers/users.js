const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

// Get all contacts
const getAll = async (req, res, next) => {
    try {
        const result = await mongodb.getDatabase().db().collection('contacts').find();
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        });
    } catch (error) {
        next(createError(500, error.message)); // Pass error to the error handler
    }
};

// Get a single contact by ID
const getSingle = async (req, res, next) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('contacts').findOne({ _id: contactId });

        if (!result) {
            return next(createError(404, 'Contact not found'));
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        next(createError(500, error.message)); // Pass error to the error handler
    }
};

// Create a new contact
const createContact = async (req, res, next) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return next(createError(400, 'All fields are required'));
    }

    try {
        const contact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday,
        };

        const result = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
        res.status(201).json({ contactId: result.insertedId });
    } catch (error) {
        next(createError(500, error.message)); // Pass error to the error handler
    }
};

// Update an existing contact by ID
const updateContact = async (req, res, next) => {
    const contactId = new ObjectId(req.params.id);
    const updates = req.body;

    try {
        const result = await mongodb.getDatabase().db().collection('contacts').updateOne(
            { _id: contactId },
            { $set: updates }
        );

        if (result.matchedCount === 0) {
            return next(createError(404, 'Contact not found'));
        }

        res.status(200).json({ message: 'Contact updated successfully' });
    } catch (error) {
        next(createError(500, error.message)); // Pass error to the error handler
    }
};

// Delete a contact by ID
const deleteContact = async (req, res, next) => {
    const contactId = new ObjectId(req.params.id);

    try {
        const result = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });

        if (result.deletedCount === 0) {
            return next(createError(404, 'Contact not found'));
        }

        res.status(204).send();  // No content on success
    } catch (error) {
        next(createError(500, error.message)); // Pass error to the error handler
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};
