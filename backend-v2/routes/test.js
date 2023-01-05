const express = require('express');
const router = express.Router();
const controller = require('../controllers/test');

/* GET home page. */
router.get('/', controller.helloworld);
router.get('/test', controller.test);

module.exports = router;
