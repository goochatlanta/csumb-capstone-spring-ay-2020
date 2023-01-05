-- global counts
SELECT COUNT(*) FROM gdelt.chn_events_test;
SELECT COUNT(*) FROM gdelt.chn_eventmentions_test;
SELECT COUNT(*) FROM gdelt.joined_chn_dev;
SELECT COUNT(*) FROM gdelt.joined_chn_test;

-- curiosity counts
SELECT COUNT(*) FROM chn_events_test WHERE (Actor1CountryCode != 'CHN' AND Actor2CountryCode != 'CHN');
SELECT COUNT(*) FROM events WHERE SOURCEURL LIKE '%ecns.cn%';
SELECT COUNT(*) FROM chn_events_test WHERE SOURCEURL LIKE '%ecns.cn%';
SELECT COUNT(*) FROM events WHERE SOURCEURL LIKE 'http_://www.peopledaily.com.cn%';
SELECT COUNT(*) FROM events WHERE SOURCEURL LIKE '%peopledaily.com.cn%';
SELECT COUNT(*) FROM chn_events_test WHERE (Actor1Code = 'CHN' OR Actor2Code = 'CHN');
SELECT COUNT(*) FROM eventmentions WHERE (
    GLOBALEVENTID IN (SELECT GLOBALEVENTID FROM chn_events_test)
);
SELECT COUNT(*) FROM eventmentions
WHERE (
    MentionSourceName LIKE '%xinhuanet.com%' OR
    MentionSourceName LIKE '%chinadaily.com.cn%' OR
    MentionSourceName LIKE '%china.org.cn%' OR
    MentionSourceName LIKE '%ecns.cn%' OR
    MentionSourceName LIKE '%peopledaily.com.cn%'
);
SELECT COUNT(*) FROM events
WHERE (
    SOURCEURL LIKE 'http_://www.xinhuanet.com%' OR
    SOURCEURL LIKE 'http_://www.chinadaily.com.cn%' OR
    SOURCEURL LIKE 'http_://www.china.org.cn%' OR
    SOURCEURL LIKE 'http_://www.ecns.cn%' OR
    SOURCEURL LIKE 'http_://www.peopledaily.com.cn%'
);