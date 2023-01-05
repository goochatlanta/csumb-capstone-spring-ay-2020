SELECT  joined_chn_test.Actor1CountryCode, joined_chn_test.Actor2CountryCode,
        COUNT(joined_chn_test.Actor1CountryCode) AS `freq`, 
        COUNT(joined_chn_test.Actor2CountryCode) AS `freq` 
    FROM     gdelt.joined_chn_test
    GROUP BY joined_chn_test.Actor1CountryCode, joined_chn_test.Actor2CountryCode
    ORDER BY `freq` DESC
    LIMIT    12;

SELECT  joined_chn_test.Actor1CountryCode,
    COUNT(joined_chn_test.Actor1CountryCode) AS `freq`
    FROM     gdelt.joined_chn_test
    GROUP BY joined_chn_test.Actor1CountryCode
    ORDER BY `freq` DESC
    LIMIT    12;


SELECT  joined_chn_test.Actor1CountryCode 
    UNION joined_chn_test.Actor2CountryCode
    COUNT(joined_chn_test.Actor1CountryCode) AS `freq`
    FROM     gdelt.joined_chn_test
    GROUP BY joined_chn_test.Actor1CountryCode
    ORDER BY `freq` DESC
    LIMIT    12;



SELECT * FROM (
    SELECT joined_chn_test.Actor1CountryCode AS `actors`
    FROM gdelt.joined_chn_test
    UNION ALL 
    SELECT joined_chn_test.Actor2CountryCode
    FROM gdelt.joined_chn_test
    )
    COUNT(`actors`) AS `freq`
    GROUP BY `actors`
    ORDER BY `freq` DESC
    LIMIT    12;



SELECT * FROM (
    SELECT joined_chn_test.Actor1CountryCode AS `actors`
    FROM gdelt.joined_chn_test
    UNION ALL 
    SELECT joined_chn_test.Actor2CountryCode
    FROM gdelt.joined_chn_test
    )
    LIMIT 10;


-- yef 1
SELECT COUNT(actors) AS freq
FROM (
    SELECT joined_chn_test.Actor1CountryCode AS actors
    FROM gdelt.joined_chn_test
    UNION ALL 
    SELECT joined_chn_test.Actor2CountryCode AS actors
    FROM gdelt.joined_chn_test
    )
GROUP BY actors
ORDER BY freq DESC
LIMIT 12;

-- yef 2
SELECT actors, COUNT(*) AS freq
FROM (
    SELECT joined_chn_test.Actor1CountryCode AS actors
    FROM gdelt.joined_chn_test
    UNION ALL 
    SELECT joined_chn_test.Actor2CountryCode AS actors
    FROM gdelt.joined_chn_test
    ) AS t
GROUP BY actors
ORDER BY freq DESC
LIMIT 12;

-- uber yef
-- remember, this one works, and solves the problem
SELECT actors, COUNT(*) AS freq
FROM (
    SELECT joined_chn_test.Actor1CountryCode AS actors
    FROM gdelt.joined_chn_test
    UNION ALL 
    SELECT joined_chn_test.Actor2CountryCode AS actors
    FROM gdelt.joined_chn_test
    ) AS t
WHERE (actors != "CHN" AND actors IS NOT NULL AND actors != "")
GROUP BY actors
ORDER BY freq DESC
LIMIT 10;

-- son of yef...
SELECT actors, COUNT(*) AS freq
FROM (
    SELECT joined_chn_test.Actor1CountryCode AS actors,
    PressOrigin, EventCode, ActionGeo_CountryCode
    FROM gdelt.joined_chn_test
    UNION ALL 
    SELECT joined_chn_test.Actor2CountryCode AS actors,
    PressOrigin, EventCode, ActionGeo_CountryCode
    FROM gdelt.joined_chn_test
    ) AS top_table
WHERE (1 = 1)
GROUP BY actors
ORDER BY freq DESC
LIMIT 12;

-- cuz yef

CREATE VIEW topActors
AS
SELECT actors, COUNT(*) AS freq
FROM (
    SELECT joined_chn_test.Actor1CountryCode AS actors
    FROM gdelt.joined_chn_test
    UNION ALL 
    SELECT joined_chn_test.Actor2CountryCode AS actors
    FROM gdelt.joined_chn_test
    ) AS t
WHERE (actors != "CHN" AND actors IS NOT NULL AND actors != "")
GROUP BY actors
ORDER BY freq DESC
LIMIT 10;


-- Triage
CREATE VIEW topActors1
AS
SELECT  joined_chn_test.Actor1CountryCode,
    COUNT(joined_chn_test.Actor1CountryCode) AS `freq`
    FROM     gdelt.joined_chn_test
    GROUP BY joined_chn_test.Actor1CountryCode
    ORDER BY `freq` DESC
    LIMIT    12;


CREATE VIEW topActors2
AS
SELECT  joined_chn_test.Actor2CountryCode,
    COUNT(joined_chn_test.Actor2CountryCode) AS `freq`
    FROM     gdelt.joined_chn_test
    GROUP BY joined_chn_test.Actor2CountryCode
    ORDER BY `freq` DESC
    LIMIT    12;

CREATE VIEW topActors
AS
SELECT * 



SELECT * FROM topActors;


-- cousin of yef
SELECT Actor1CountryCode AS actors, COUNT(*) AS freq1 
FROM joined_chn_test
GROUP BY actors
ORDER BY freq1 DESC;

DROP VIEW topActors;
DROP VIEW topActors1;
DROP VIEW topActors2;


CREATE VIEW topActors1
AS
SELECT  PressOrigin,
        EventCode,
        ActionGeo_CountryCode,
        Actor1CountryCode,
        Actor2CountryCode,
        joined_chn_test.Actor1CountryCode AS actors, 
        COUNT(*) AS freq1 
FROM joined_chn_test
GROUP BY actors
ORDER BY freq1 DESC;

DROP VIEW topActors1;
SELECT * FROM topActors1;

CREATE VIEW topActors2
AS
SELECT  joined_chn_test.Actor2CountryCode AS actors,
        COUNT(*) AS freq2 
FROM joined_chn_test
GROUP BY actors
ORDER BY freq2 DESC;

CREATE VIEW topActors
AS
SELECT  PressOrigin,
        EventCode,
        ActionGeo_CountryCode,
        topActors1.actors as actors, (topActors1.freq1 + topActors2.freq2) as freq
FROM topActors1
INNER JOIN topActors2 ON topActors1.actors = topActors2.actors
WHERE (
    (topActors1.actors != '') AND 
    (topActors1.actors IS NOT NULL) AND 
    (topActors1.actors != 'CHN')
)
ORDER BY freq DESC
LIMIT 10;

DROP VIEW topActors;

SELECT * FROM topActors;

-- THE REAL MCCOY
    SELECT * FROM topActors;


