const util = require('util');
const fs = require('fs');
const path = require('path');
const pool = require('../config/mysqlConnector');
const writeFile = util.promisify(fs.writeFile);
const { PROJECT_ROOT } = require('../config/config');
const uniqueCountriesSQL = require('../config/queryConstants').uniqueCountriesSQL;
const uniquePressOriginsSQL = require('../config/queryConstants').uniquePressOriginsSQL;
const uniqueLocationsSQL = require('../config/queryConstants').uniqueLocationsSQL;
const uniqueCameoCodesSQL = require('../config/queryConstants').uniqueCameoCodesSQL;

let generateCountries = async () => {
  let result = await pool.queryPromise(uniqueCountriesSQL);
  result = JSON.stringify(result);
  await writeFile(path.join(PROJECT_ROOT, 'lib/data/countries.json'), result);
  console.log('- countries.json generated');
}

let generatePressOrigins = async () => {
  result = await pool.queryPromise(uniquePressOriginsSQL);
  result = JSON.stringify(result);
  await writeFile(path.join(PROJECT_ROOT, 'lib/data/pressOrigins.json'), result);
  console.log('- pressOrigins.json generated');
}

let generateLocations = async () => {
  result = await pool.queryPromise(uniqueLocationsSQL);
  result = JSON.stringify(result);
  await writeFile(path.join(PROJECT_ROOT, 'lib/data/locations.json'), result);
  console.log('- locations.json generated');
}

let generateCameoCodes = async () => {
  result = await pool.queryPromise(uniqueCameoCodesSQL);
  result = JSON.stringify(result);
  await writeFile(path.join(PROJECT_ROOT, 'lib/data/cameoCodes.json'), result);
  console.log('- cameoCodes.json generated');
}

exports.generateFiles = async () => {
  return Promise.all([
    generateCountries(),
    generatePressOrigins(),
    generateLocations(),
    generateCameoCodes()
  ])
}