const athena = require('../config/athena');
const util = require('util');
const fs = require('fs');
const writeFile = util.promisify(fs.writeFile);
const path = require('path');
const PROJECT_ROOT = __dirname + "/..";

exports.location = async (req, res, next) => {
	try {
		res.sendFile(path.join(PROJECT_ROOT, 'data/location.json'));
	} catch (error) {
		next(error);
	}
}

exports.otherActor = async (req, res, next) => {
  try {
		res.sendFile(path.join(PROJECT_ROOT, 'data/otherActor.json'));
	} catch (error) {
		next(error);
	}
}

/* Creating attribute JSON files */
let resultValues = (arr) => {
	let temp = [];
	for (item of arr) {
		temp.push(Object.values(item)[0]);
	}
	return temp;
}

let generateLocation = async () => {
	let locationSQL = "SELECT DISTINCT actiongeo_countrycode FROM events";
	let locationResult = await athena.query(locationSQL);
	await writeFile(path.join(PROJECT_ROOT, 'data/location.json'), JSON.stringify(resultValues(locationResult["Items"])));
	console.log('- location.json generated');
}

let generateOtherActor = async () => {
  let otherActorSQL = "SELECT DISTINCT actor1countrycode AS otherActor FROM events " +
						"UNION " + 
						"SELECT DISTINCT actor2countrycode AS otherActor FROM events";
	let actorResult = await athena.query(otherActorSQL);
  await writeFile(path.join(PROJECT_ROOT, 'data/otherActor.json'), JSON.stringify(resultValues(actorResult["Items"])));
  console.log('- otherActor.json generated');
}

let generateCameoCodes = async () => {
	let eventCodeSQL = "SELECT DISTINCT eventcode FROM events";
	let result = await athena.query(eventCodeSQL);
	await writeFile(path.join(PROJECT_ROOT, 'data/cameoCodes.json'), JSON.stringify(resultValues(result["Items"])));
	console.log('- cameocodes.json generated');
}

exports.generateFiles = async (req, res, next) => {
	try {
		await generateLocation();
		await generateOtherActor();
		res.end();
	} catch (err) {
		next(err);
	}
}
