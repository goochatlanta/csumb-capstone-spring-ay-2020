const pool = require('../../config/mysqlConnector');
const { Transform }  = require('json2csv');
const JSONStream = require('JSONStream');
const queryBuilder = require('../builder');
const stream = require('stream');
const util = require('util');
const pipeline = util.promisify(stream.pipeline);

exports.queryPOST = async function(req, res, next) {
  try {
    let {queryString, filters} = await queryBuilder(req);
    res.header("Content-Type",'application/json');
    const ps = stream.PassThrough();
    pipeline(
      pool.query(queryString, filters).stream({highWaterMark: 5}),
      JSONStream.stringify(),
      ps
    ).catch((err) => {return next(err);})
    ps.pipe(res);
  } catch (err) {
    next(err);
  }
};

exports.queryTestPOST = async function(req, res, next) {
  try {
    let builtQuery = await queryBuilder(req);
    res.json(builtQuery);
  } catch (err) {
    next(err);
  }
};

exports.downloadPOST = async function(req, res, next) {
  try {
    let opts = { };
    let transformOpts = { objectMode: true };
    let json2csv = new Transform(opts, transformOpts);
    let { queryString, filters } = await queryBuilder(req);
    res.attachment('Results.csv');  
    const ps = stream.PassThrough();
    pipeline(
      pool.query(queryString, filters).stream({highWaterMark: 5}),
      json2csv,
      ps
    ).catch((err) => {return next(err);})
    ps.pipe(res);
  } catch (err) {
    next(err);
  }
};