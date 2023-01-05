const path = require('path');
const { PROJECT_ROOT } = require('../../config/config');

exports.countriesGET = async function(req, res, next) {
  try {
    res.header("Content-Type",'application/json');
    res.sendFile(path.join(PROJECT_ROOT, 'lib/data/countries.json'));
  } catch (error) {
    next(error);
  }
};

exports.pressOriginsGET = async function(req, res, next) {
  try {
    res.header("Content-Type",'application/json');
    res.sendFile(path.join(PROJECT_ROOT, 'lib/data/pressOrigins.json'));
  } catch (error) {
    next(error);
  }
};

exports.locationsGET = async function(req, res, next) {
  try {
    res.header("Content-Type",'application/json');
    res.sendFile(path.join(PROJECT_ROOT, 'lib/data/locations.json'));
  } catch (error) {
    next(error);
  }
};

exports.cameoCodesGET = async function(req, res, next) {
  try {
    res.header("Content-Type",'application/json');
    res.sendFile(path.join(PROJECT_ROOT, 'lib/data/cameoCodes.json'));
  } catch (error) {
    next(error);
  }
};