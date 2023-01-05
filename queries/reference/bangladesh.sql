SELECT COUNT(*) FROM chn_events_test WHERE ActionGeo_FullName LIKE "Bangladesh"; 


SELECT * FROM chn_eventmentions_test LIMIT 1;


SELECT MAX(AvgTone) FROM chn_events_test WHERE ActionGeo_FullName LIKE "Bangladesh"; 

-- This query is broken
SELECT AVG(Confidence) FROM chn_eventmentions_test
WHERE (
    GLOBALEVENTID IN (SELECT * FROM chn_events_test WHERE ActionGeo_FullName LIKE "Bangladesh"; )
);

SELECT DISTINCT Actor1CountryCode FROM chn_events_test WHERE ActionGeo_FullName LIKE "Bangladesh"; 

SELECT DISTINCT Actor2CountryCode FROM chn_events_test WHERE ActionGeo_FullName LIKE "Bangladesh"; 

