const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all contacts
const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('contacts').find();
        result.toArray().then((contacts) => {
            
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single contact by ID
const getSingle = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('contacts').findOne({ _id: contactId });

        if (!result) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new contact
const createContact = async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({ message: 'All fields are required' });
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
        res.status(500).json({ message: error.message });
    }
};

// Update an existing contact by ID
const updateContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const updates = req.body;

    try {
        const result = await mongodb.getDatabase().db().collection('contacts').updateOne(
            { _id: contactId },
            { $set: updates }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a contact by ID
const deleteContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);

    try {
        const result = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(204).send();  // No content on success
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};
