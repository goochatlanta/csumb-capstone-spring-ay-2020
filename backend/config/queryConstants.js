exports.selectBlock = {
  "topCameoCodes":     "SELECT EventCode, COUNT(EventCode) AS matches FROM joined_chn_test WHERE ",
  "topEventLocations": "SELECT ActionGeo_CountryCode, COUNT(ActionGeo_CountryCode) AS matches FROM joined_chn_test WHERE ",
  "topActors":         "SELECT actors, COUNT(*) AS freq " +
                       "FROM ( " +
                       "SELECT joined_chn_test.Actor1Name AS actors, " +
                       "PressOrigin, EventCode, ActionGeo_CountryCode, " +
                       "Actor1CountryCode, Actor2CountryCode " +
                       "FROM gdelt.joined_chn_test " +
                       "UNION ALL " +
                       "SELECT joined_chn_test.Actor2Name AS actors, " +
                       "PressOrigin, EventCode, ActionGeo_CountryCode, " +
                       "Actor1CountryCode, Actor2CountryCode " +
                       "FROM gdelt.joined_chn_test " +
                       ") AS t WHERE ",
  "articleToneTime":   "SELECT MentionDocTone, SUBSTR(MentionTimeDate, 1, 6) AS MentionYearMonth FROM joined_chn_test WHERE ",
  "numArticlesTime":   "SELECT count(*) AS numArticles, SUBSTR(MentionTimeDate, 1, 6) AS MentionYearMonth FROM joined_chn_test WHERE "
}

exports.whereBlock = {
  "otherActor":  "(Actor1CountryCode LIKE ? OR Actor2CountryCode LIKE ?)",
  "cameoCode":   "EventCode LIKE ?",
  "location":    "ActionGeo_CountryCode LIKE ?",
  "pressOrigin": "PressOrigin LIKE ?"
};

exports.groupBlock = {
  "topCameoCodes":     " GROUP BY EventCode ORDER BY Matches DESC limit 10",
  "topEventLocations": " GROUP BY ActionGeo_CountryCode ORDER BY Matches DESC limit 10",
  "topActors":         " GROUP BY actors ORDER BY freq DESC LIMIT 10",
  "articleToneTime":   " GROUP BY MentionYearMonth ORDER BY MentionYearMonth",
  "numArticlesTime":   " GROUP BY MentionYearMonth ORDER BY MentionYearMonth"
}

exports.filterInsertNum = {
  "otherActor":  2,
  "cameoCode":   1,
  "location":    1,
  "pressOrigin": 1
};


exports.uniqueCountriesSQL = "SELECT DISTINCT Actor1CountryCode AS ActorCountryCode FROM joined_chn_test " +
                             "UNION " + 
                             "SELECT DISTINCT Actor2CountryCode AS ActorCountryCode FROM joined_chn_test";

exports.uniquePressOriginsSQL = "SELECT DISTINCT PressOrigin FROM joined_chn_test;";

exports.uniqueLocationsSQL = "SELECT DISTINCT ActionGeo_CountryCode FROM joined_chn_test;";

exports.uniqueCameoCodesSQL = "SELECT DISTINCT EventCode FROM joined_chn_test;";