-- Mentions table creation/fill
CREATE TABLE chn_eventmentions_test LIKE eventmentions;
INSERT chn_eventmentions_test
SELECT * FROM eventmentions
WHERE (
    MentionSourceName LIKE '%xinhuanet.com%' OR
    MentionSourceName LIKE '%chinadaily.com.cn%' OR
    MentionSourceName LIKE '%china.org.cn%' OR
    MentionSourceName LIKE '%ecns.cn%' OR
    MentionSourceName LIKE '%peopledaily.com.cn%'
) 

-- Event table creation/fill
CREATE TABLE chn_events_test LIKE events;
INSERT chn_events_test
SELECT * FROM events
WHERE (Actor1Geo_CountryCode = 'CHN' OR Actor2Geo_CountryCode = 'CHN')
ON events.GLOBALEVENTID = chn_eventsmentions_test.GLOBALEVENTID;