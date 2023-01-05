-- CSUMB Capstone GDELT Project 
-- 3/3/2020


-- Event table creation/fill
CREATE TABLE chn_events_test LIKE events;
INSERT chn_events_test
SELECT * FROM events
WHERE (
    SOURCEURL LIKE '%xinhuanet.com%' OR
    SOURCEURL LIKE '%chinadaily.com.cn%' OR
    SOURCEURL LIKE '%china.org.cn%' OR
    SOURCEURL LIKE '%ecns.cn%' OR
    SOURCEURL LIKE '%peopledaily.com.cn%'
);
DELETE FROM chn_events_test WHERE (Actor1CountryCode != 'CHN' AND Actor2CountryCode != 'CHN');

-- Mentions table creation/fill
CREATE TABLE chn_eventmentions_test LIKE eventmentions;
INSERT chn_eventmentions_test
SELECT * FROM eventmentions
WHERE (
    GLOBALEVENTID IN (SELECT GLOBALEVENTID FROM chn_events_test)
);