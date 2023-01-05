-- tiny event mentions pull test
CREATE TABLE tinytest LIKE events;
INSERT tinytest
SELECT * FROM events
WHERE (
    SOURCEURL LIKE '%xinhuanet.com%' OR
    SOURCEURL LIKE '%chinadaily.com.cn%' OR
    SOURCEURL LIKE '%china.org.cn%' OR
    SOURCEURL LIKE '%ecns.cn%' OR
    SOURCEURL LIKE '%peopledaily.com.cn%'
) LIMIT 100;
DELETE FROM tinytest WHERE (Actor1Code != 'CHN' AND Actor2Code != 'CHN');


-- build mentions from events
CREATE TABLE tinymention LIKE eventmentions;
INSERT tinymention
SELECT * FROM eventmentions
WHERE (
    GLOBALEVENTID IN (SELECT GLOBALEVENTID FROM tinytest)
);

-- view/count
SELECT * FROM tinytest;
SELECT * FROM tinymention;
SELECT COUNT(*) FROM tinymention;
SELECT COUNT(*) FROM tinytest;

-- clear/clean up
DELETE FROM tinytest;
DELETE FROM tinymention;
DROP TABLE tinytest;
DROP TABLE tinymention;