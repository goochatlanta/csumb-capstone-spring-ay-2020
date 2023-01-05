DELETE FROM gdelt.chn_events_test;
DELETE FROM gdelt.chn_eventmentions_test;

DROP TABLE gdelt.joined_chn_test;

DELETE FROM chn_events_test WHERE (Actor1Code != 'CHN' AND Actor2Code != 'CHN');

DELETE FROM chn_eventmentions_test;
DELETE FROM chn_events_test;

DROP TABLE tinymention;
DROP TABLE tinytest;