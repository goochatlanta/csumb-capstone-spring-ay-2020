const athena = require('../config/athena');
const builder = require('../config/builder');

exports.sqlTest = async (req, res, next) => {
	try {
		let sql = await builder.buildEvents(req.body['events']);
		res.json(sql);
	} catch (error) {
		next(error);
	}
}

exports.query = async (req, res, next) => {
  try {
	  let sql = await builder.buildEvents(req.body['events']);
    let queryBody = {
      sql: sql,
      pagination: 999,
    }
    if (req.body['NextToken']) {
      queryBody.QueryExecutionId = req.body['QueryExecutionId'];
      queryBody.NextToken = req.body['NextToken'];
    }
    let results = await athena.query(queryBody);
    res.json(results);
  } catch (err) {
    next(err);
  }
}

// exports.download = async (req, res, next) => {
// // possibly use object-to-csv package
// // consider how to do this with pagination?
// // currently front end use regular query to get json data and front end create csv files
// }
