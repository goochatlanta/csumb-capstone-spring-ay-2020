// Request body format: 
// req.body: {
//   "NextToken": null,
//   "QueryExecutionId": null,
//   "events": {
//       "columns": [],
//       "where": {
//           "otherActor": [],
//           "location": []
//       },
//       "visualizeName": null
//   }
// }

// select statements for each visualizeName value
let visualizeSelect = {
  // TODO: need to change the SQL to work with new joined tables after they're created below
  "topCameoCodes":     "SELECT eventcode, COUNT(eventcode) AS matches FROM events ",
  "topEventLocations": "SELECT actiongeo_countrycode, COUNT(actiongeo_countrycode) AS matches FROM events ",
  // "topActors":         "SELECT actors, COUNT(*) AS freq " +
  //                      "FROM ( " +
  //                      "SELECT actor1name AS actors, " +
  //                      "pressorigin, eventcode, actiongeo_countrycode, " + //TODO: create pressorigin
  //                      "actor1countrycode, actor2countrycode " +
  //                      "FROM joined_chn_test " +
  //                      "UNION ALL " +
  //                      "SELECT actor2name AS actors, " +
  //                      "pressorigin, eventcode, actiongeo_countrycode, " + //TODO: create pressorigin
  //                      "actor1countrycode, actor2countrycode " +
  //                      "FROM joined_chn_test " +
  //                      ") AS t ",
  // // TODO: both below use columns from new events + eventmentions table (previous backend called joined_chn_test)
  // "articleToneTime":   "SELECT mentiondoctone, SUBSTR(cast(mentiontimedate as varchar(100)), 1, 6) AS mentionyearmonth FROM joined_chn_test ",
  // "numArticlesTime":   "SELECT count(*) AS numarticles, SUBSTR(cast(mentiondatetime as varchar(100)), 1, 6) AS mentionyearmonth FROM joined_chn_test "
}

// group and order by statements for each visualizeName value
let visualizeGroup = {
  "topCameoCodes":     " GROUP BY eventcode ORDER BY matches DESC LIMIT 10",
  "topEventLocations": " GROUP BY actiongeo_countrycode ORDER BY matches DESC LIMIT 10",
  // TODO: fix select and uncomment below for corresponding group/order by
  // "topActors":         " GROUP BY actors ORDER BY freq DESC LIMIT 10",
  // "articleToneTime":   " GROUP BY mentionyearmonth ORDER BY mentionyearmonth",
  // "numArticlesTime":   " GROUP BY mentionyearmonth ORDER BY mentionyearmonth"
}

// Columns we query for each req key
let eventColumns = {
  "otherActor": ["actor1countrycode", "actor2countrycode"],
  "cameoCode": ["eventcode"],
  "location": ["actiongeo_countrycode"],
  "pressOrigin": ["pressorigin"],
}

exports.buildEvents = async (events) => {
  let sql = "";

  // SELECT builder
	if (events["visualizeName"]) {
		sql += visualizeSelect[events["visualizeName"]];
	} else {
		let columns = "";
		if (events["columns"].length > 0) {
      let lastIndex = events["columns"].length-1;
			for (let i = 0; i < lastIndex; i++) {
        columns += events["columns"][i]+", ";
      }
      columns += events["columns"][lastIndex];
		} else {
      columns = "*";
    }
    sql += `SELECT ${columns} FROM events `;
	}

  // WHERE builder
  sql += "WHERE (actor1countrycode = 'CHN' OR actor2countrycode = 'CHN') AND ";
  sql += buildWhere(events["where"]);

  // GROUP/ORDER builder
  if (events["visualizeName"]) {
    sql += visualizeGroup[events["visualizeName"]];
  }

	return sql
}

let buildWhere = (where) => {
  let whereBlock = "";
  // for key in where
  for (let key in where) {
    if (where[key].length == 1) {
      whereBlock += setColsVal(key, where[key][0]);
    } else if (where[key].length > 1) {
      let lastIndex = where[key].length - 1;
      whereBlock += "( "
      // for value in key
      for (let i = 0; i < lastIndex; i++) {
        whereBlock += setColsVal(key, where[key][i]);
        whereBlock += "OR ";
      }
      whereBlock += setColsVal(key, where[key][lastIndex]) + ") ";
    } else {
      continue;
    }
    whereBlock += "AND ";
  }
  whereBlock += "(1 = 1)";
  return whereBlock;
}

let setColsVal = (key, value) => {
  let lastIndex = eventColumns[key].length - 1;
  let values = "(";
  // for columnvalue in column
  for (let i = 0; i < lastIndex; i++) {
    // columnvalue = value
    values += `${eventColumns[key][i]} LIKE '${value}' OR `;
  }
  values += `${eventColumns[key][lastIndex]} LIKE '${value}') `;
  return values;
}
