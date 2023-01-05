const express = require('express');
const router = express.Router();
const controller = require('../controllers/attribute');

/* GET users listing. */
router.get('/location', controller.location);
router.get('/otherActor', controller.otherActor);

router.get('/files', controller.generateFiles);

module.exports = router;
