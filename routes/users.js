const express = require('express');
const router = express.Router();

const users = require('../controllers/users');

router.get('/', users.getAll);
router.get('/:id', users.getSingle);

module.exports = router;