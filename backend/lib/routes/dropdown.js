const express = require('express');
const router = express.Router();
const controller = require('../controllers/dropdown');

router.get('/countries', controller.countriesGET);
router.get('/pressOrigins', controller.pressOriginsGET);
router.get('/locations', controller.locationsGET);
router.get('/cameoCodes', controller.cameoCodesGET);

module.exports = router;

