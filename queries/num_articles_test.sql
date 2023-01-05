SELECT MentionTimeDate, COUNT(*) as numArticles
FROM joined_chn_dev
GROUP by MentionTimeDate
ORDER by MentionTimeDate ASC;

SELECT MentionTimeDate FROM joined_chn_test LIMIT 10;

STR_TO_DATE(str,format)

SELECT STR_TO_DATE(CAST(MentionTimeDate AS STRING), "yyyymmddhhmmss")
