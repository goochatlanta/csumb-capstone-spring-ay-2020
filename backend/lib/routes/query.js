const express = require('express');
const router = express.Router();
const controller = require('../controllers/query');

router.post('/', controller.queryPOST);
router.post('/test', controller.queryTestPOST);
router.post('/download', controller.downloadPOST);

module.exports = router;