const athena = require('../config/athena');

exports.helloworld = function(req, res, next) {
	res.send("Hello, World!");
}

exports.test = async (req, res, next) => {
	// QUERY STATS: change sql below
	let sql = "SELECT * FROM events LIMIT 1";
	try {
		let results = await athena.query(sql);
		res.send(results);
	} catch (error) {
		next(error);
	}
}
