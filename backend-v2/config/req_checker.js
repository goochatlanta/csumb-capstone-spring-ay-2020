const util = require('util')
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const path = require('path');
const PROJECT_ROOT = __dirname + "/..";

let visualizeNameOptions = [
  null,
  "topCameoCodes",
  "topEventLocations"
]

let getVals = async (filename) => {
  let rawdata = await readFile(path.join(PROJECT_ROOT, `data/${filename}.json`));
  let vals = JSON.parse(rawdata);
  return vals
}

// TODO: check req.body["events"]["columns"] values

exports.manualEscape = async (req, res, next) => {
  try {
    for (actor of req.body["events"]["where"]["otherActor"]) {
      otherActorVals = await getVals("otherActor");
      if (!otherActorVals.includes(actor)) {
        throw new Error(`'${actor}' is not a valid otherActor value`);
      }
    }
    for (location of req.body["events"]["where"]["location"]) {
      locationVals = await getVals("location");
      if (!locationVals.includes(location)) {
        throw new Error(`'${location}' is not a valid location value`);
      }
    }
    if (!visualizeNameOptions.includes(req.body["events"]["visualizeName"])) {
      throw new Error(`'${req.body["events"]["visualizeName"]}' is not a valid visualizeName value`);
    }
    next();
  } catch (err) {
    next(err);
  }
}
