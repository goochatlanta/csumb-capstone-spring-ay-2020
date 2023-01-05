const util = require('util');
const athenaExpress = require('athena-express');
const aws = require('aws-sdk');
const awsCredentials = {region: "us-east-2"};
const athenaExpressConfig = {
	aws,
	s3: 's3://aws-athena-query-results-dsag/api-results',
	db: 'gdelt',
	getStats: true
};
aws.config.update(awsCredentials);
const athena = new athenaExpress(athenaExpressConfig);

module.exports = athena;
