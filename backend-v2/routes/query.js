const express = require('express');
const router = express.Router();
const controller = require('../controllers/query');
var checker = require('../config/req_checker').manualEscape;

router.use(checker);
router.post('/sqlTest', controller.sqlTest);
router.post('/query', controller.query);
// router.post('/download', controller.download);

module.exports = router;
