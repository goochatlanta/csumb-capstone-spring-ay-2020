const selectBlock = require('../config/queryConstants').selectBlock;
const whereBlock = require('../config/queryConstants').whereBlock;
const groupBlock = require('../config/queryConstants').groupBlock;
const filterInsertNum = require('../config/queryConstants').filterInsertNum;

let createCondition = async (whereValues, whereName) => {
  if (whereValues.length == 0) {
    return "(1 = 1)";
  }
  else {
    let block = whereBlock[whereName];
    let repeatNum = whereValues.length - 1;
    let statement = (block + " OR ").repeat(repeatNum) + block;
    return "(" + statement + ")";
  }
};

let loadFilters = async (columnList, whereLists, whereNames) => {
  let filters = [];
  if (columnList.length != 0) {
    filters.push(columnList);
  }
  whereNames.forEach(whereName => {
    whereLists[whereName].forEach(value => {
      for (let i = 0; i < filterInsertNum[whereName]; i++) {
        filters.push(value);
      }
    })
  })
  return filters;
}

let queryBuilder = async (req) => {
  let queryString;
  let filters = [];
  let fields = req.body["fields"];
  let columnList = fields["column"];
  let visualizeName = fields["visualizeName"];
  let whereLists = {
    "otherActor": fields["otherActor"],
    "cameoCode": fields["cameoCode"],
    "location": fields["location"],
    "pressOrigin": fields["pressOrigin"]
  };

  // build SELECT section
  if (fields.hasOwnProperty("visualizeName")) {
    let selectPreBuilt = selectBlock[visualizeName];
    if (typeof selectPreBuilt === 'undefined') {
      throw new Error("visualizeName value " + visualizeName + " invalid");
    }
    queryString = selectPreBuilt;
  }
  else if (columnList.length == 0) {
    queryString = "SELECT * FROM joined_chn_test WHERE ";
  }
  else {
    queryString = "SELECT ?? FROM joined_chn_test WHERE ";
  }

  // build WHERE section
  let whereNames = Object.keys(whereLists);
  for (let i = 0; i < whereNames.length; i++) {
    let whereName = whereNames[i];
    queryString += await createCondition(whereLists[whereName], whereName);
    if (i != whereNames.length - 1) {
      queryString += " AND ";
    }
  }

  // build GROUP/ORDER section
  if (fields.hasOwnProperty("visualizeName") && typeof groupBlock[visualizeName] !== 'undefined') {
      queryString += groupBlock[visualizeName];
  }

  queryString += ";";

  filters = await loadFilters(columnList, whereLists, whereNames);
  return { queryString, filters };
};

module.exports = queryBuilder;