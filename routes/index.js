
const router = require('express').Router();
router.get('/', (req, res) => { res.send('Hello World One');});

router.use('/users', require('./users'));
module.exports = router;