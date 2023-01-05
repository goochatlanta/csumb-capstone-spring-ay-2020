-- adding column: complete
ALTER TABLE gdelt.joined_chn_test 
ADD COLUMN PressOrigin VARCHAR(3)
AFTER Actor2Name;

-- SYNTAX TESTS --
-- mini table to test
CREATE TABLE tiny_test LIKE joined_chn_test;
INSERT tiny_test
SELECT * FROM joined_chn_test LIMIT 100;

-- check data
SELECT * FROM tiny_test;


-- syntax checking...
UPDATE tiny_test
SET
PressOrigin = "CHN"
WHERE (
    MentionSourceName LIKE '%xinhuanet.com%' OR
    MentionSourceName LIKE '%chinadaily.com.cn%' OR
    MentionSourceName LIKE '%china.org.cn%' OR
    MentionSourceName LIKE '%ecns.cn%' OR
    MentionSourceName LIKE '%peopledaily.com.cn%'
);

-- UPDATE VALUES

-- inserting values, syntax untested
UPDATE gdelt.joined_chn_test
SET
PressOrigin = "IND"
WHERE ( MentionSourceName LIKE '%indiatimes.com%' OR
        MentionSourceName LIKE '%business-standard.com%' OR
        MentionSourceName LIKE '%india.com%' OR
        MentionSourceName LIKE '%indianexpress.com%' OR
        MentionSourceName LIKE '%dnaindia.com%' 
);

UPDATE gdelt.joined_chn_test
SET
PressOrigin = "CHN"
WHERE PressOrigin IS NULL;

SELECT * FROM joined_chn_test LIMIT 50;

SELECT COUNT(*) FROM joined_chn_test
WHERE PressOrigin = "IND";

SELECT COUNT(*) FROM joined_chn_test
WHERE PressOrigin IS NULL;