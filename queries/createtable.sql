-- CSUMB Capstone GDELT Project 
-- 3/13/2020
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
);
-- Extend mentions test table
-- ran 3/28
INSERT IGNORE INTO chn_eventmentions_test
SELECT * FROM eventmentions
WHERE (
    MentionSourceName LIKE '%wenxuecity.com%' OR
    MentionSourceName LIKE '%aboluowang.com%' OR
    MentionSourceName LIKE '%sina.com.cn%' OR
    MentionSourceName LIKE '%qianlong.com%' OR
    MentionSourceName LIKE '%nbd.com.cn%' OR
    MentionSourceName LIKE '%china.com.cn%' OR
    MentionSourceName LIKE '%cyol.com%' OR
    MentionSourceName LIKE '%caijing.com.cn%' OR
    MentionSourceName LIKE '%politics.gmw.cn%' OR
    MentionSourceName LIKE '%nxtv.com.cn%' OR
    MentionSourceName LIKE '%jyb.cn%' OR
    MentionSourceName LIKE '%dayoo.com%' OR
    MentionSourceName LIKE '%xiancn.com%' OR
    MentionSourceName LIKE '%eastmoney.com%' OR
    MentionSourceName LIKE '%gscn.com.cn%' OR
    MentionSourceName LIKE '%ynet.com%'
);

-- ran 3/27
INSERT IGNORE INTO chn_eventmentions_test
SELECT * FROM eventmentions
WHERE (
    MentionSourceName LIKE '%ifeng.com%' OR
    MentionSourceName LIKE '%udn.com%' OR
    MentionSourceName LIKE '%minghui.org%' OR
    MentionSourceName LIKE '%chinesepress.com%' OR
    MentionSourceName LIKE '%jrj.com.cn%' OR
    MentionSourceName LIKE '%365jia.cn%' OR
    MentionSourceName LIKE '%ltn.com.tw%' OR
    MentionSourceName LIKE '%sohu.com%' OR
    MentionSourceName LIKE '%jstv.com%' OR
    MentionSourceName LIKE '%shm.com.cn%' OR
    MentionSourceName LIKE '%cfi.net.cn%' OR
    MentionSourceName LIKE '%sxrtv.com%' OR
    MentionSourceName LIKE '%hebei.com.cn%' OR
    MentionSourceName LIKE '%cnbeta.com%' OR
    MentionSourceName LIKE '%techweb.com.cn%' OR
    MentionSourceName LIKE '%house.focus.cn%'
);

-- ran 3/28 2pm -- I am not sure if it completed
INSERT IGNORE INTO chn_eventmentions_test
SELECT * FROM eventmentions
WHERE (
    MentionSourceName LIKE '%sina.com.tw%' OR
    MentionSourceName LIKE '%sina.com.hk%' OR
    MentionSourceName LIKE '%fjsen.com%' OR
    MentionSourceName LIKE '%cna.com.tw%' OR
    MentionSourceName LIKE '%nmgnews.com.cn%' OR
    MentionSourceName LIKE '%zaobao.com.sg%' OR
    MentionSourceName LIKE '%iqilu.com%' OR
    MentionSourceName LIKE '%qhrb.com.cn%' OR
    MentionSourceName LIKE '%cnfol.com%' OR
    MentionSourceName LIKE '%huanqiu.com%' OR
    MentionSourceName LIKE '%1688.com.au%' OR
    MentionSourceName LIKE '%81.cn%' OR
    MentionSourceName LIKE '%news.bandao.cn%' OR
    MentionSourceName LIKE '%uschinapress.com%' OR
    MentionSourceName LIKE '%zjol.com.cn%' OR
    MentionSourceName LIKE '%syd.com.cn%'
);

-- ran 3/29 noon
INSERT IGNORE INTO chn_eventmentions_test
SELECT * FROM eventmentions
WHERE (
    MentionSourceName LIKE '%bjd.com.cn%' OR
    MentionSourceName LIKE '%news.k618.cn%' OR
    MentionSourceName LIKE '%news.dahe.cn%' OR
    MentionSourceName LIKE '%zjstv.com%' OR
    MentionSourceName LIKE '%baotounews.com.cn%' OR
    MentionSourceName LIKE '%21-sun.com%' OR
    MentionSourceName LIKE '%jlradio.cn%' OR
    MentionSourceName LIKE '%ben.com.cn%' OR
    MentionSourceName LIKE '%pconline.com.cn%' OR
    MentionSourceName LIKE '%jschina.com.cn%' OR
    MentionSourceName LIKE '%sznews.com%' OR
    MentionSourceName LIKE '%hupu.com%' OR
    MentionSourceName LIKE '%gov.cn%' OR
    MentionSourceName LIKE '%hebtv.com%' OR
    MentionSourceName LIKE '%nmtv.cn%' OR
    MentionSourceName LIKE '%china.com%'
);

-- ran 4/2
INSERT IGNORE INTO chn_eventmentions_test
SELECT * FROM eventmentions
WHERE (
    MentionSourceName LIKE '%hangzhou.com.cn%' OR
    MentionSourceName LIKE '%qq.com%' OR
    MentionSourceName LIKE '%people.com.cn%' OR
    MentionSourceName LIKE '%leiphone.com%' OR
    MentionSourceName LIKE '%online.sh.cn%' OR
    MentionSourceName LIKE '%ofweek.com%' OR
    MentionSourceName LIKE '%itbear.com.cn%' OR
    MentionSourceName LIKE '%chinaiiss.com%' OR
    MentionSourceName LIKE '%mina.com.cn%' OR
    MentionSourceName LIKE '%verycd.com%' OR
    MentionSourceName LIKE '%chinanews.com%' OR
    MentionSourceName LIKE '%mitbbs.com%' OR
    MentionSourceName LIKE '%stcn.com%' OR
    MentionSourceName LIKE '%taizhou.com.cn%' OR
    MentionSourceName LIKE '%cheshi.com%' OR
    MentionSourceName LIKE '%zsnews.cn%'
);

-- ran 3/30 9 pm
INSERT IGNORE INTO chn_eventmentions_test
SELECT * FROM eventmentions
WHERE (
    MentionSourceName LIKE '%yangtse.com%' OR
    MentionSourceName LIKE '%liuyangshi.cn%' OR
    MentionSourceName LIKE '%hehechengde.cn%' OR
    MentionSourceName LIKE '%hljtv.com%' OR
    MentionSourceName LIKE '%chinaso.com%' OR
    MentionSourceName LIKE '%epochtimes.com%' OR
    MentionSourceName LIKE '%ycwb.com%' OR
    MentionSourceName LIKE '%ce.cn%' OR
    MentionSourceName LIKE '%guancha.gmw.cn%' OR
    MentionSourceName LIKE '%chinabyte.com%' OR
    MentionSourceName LIKE '%society.workercn.cn%' OR
    MentionSourceName LIKE '%163.com%' OR
    MentionSourceName LIKE '%rayli.com.cn%' OR
    MentionSourceName LIKE '%legaldaily.com.cn%' OR
    MentionSourceName LIKE '%szdushi.com.cn%' OR
    MentionSourceName LIKE '%mnw.cn%' OR
    MentionSourceName LIKE '%cnii.com.cn%' OR
    MentionSourceName LIKE '%cqnews.net%' OR
    MentionSourceName LIKE '%en.ce.cn%' OR
    MentionSourceName LIKE '%en.people.cn%' OR
    MentionSourceName LIKE '%chinamil.com.cn%' OR
    MentionSourceName LIKE '%german.cri.cn%' OR
    MentionSourceName LIKE '%arabic.news.cn%'
);

--ran 4/2
INSERT IGNORE INTO chn_eventmentions_test
SELECT * FROM eventmentions
WHERE (
    MentionSourceName LIKE '%fmprc.gov.cn%' OR
    MentionSourceName LIKE '%globaltimes.cn%' OR
    MentionSourceName LIKE '%french.cri.cn%' OR
    MentionSourceName LIKE '%womenofchina.cn%' OR
    MentionSourceName LIKE '%english.cntv.cn%' OR
    MentionSourceName LIKE '%espanol.cri.cn%' OR
    MentionSourceName LIKE '%espanol.cntv.cn%' OR
    MentionSourceName LIKE '%arabic.cri.cn%' OR
    MentionSourceName LIKE '%voc.com.cn%' OR
    MentionSourceName LIKE '%english.cri.cn%' OR
    MentionSourceName LIKE '%hindi.cri.cn%' OR
    MentionSourceName LIKE '%hungarian.cri.cn%' OR
    MentionSourceName LIKE '%bjreview.com.cn%' OR
    MentionSourceName LIKE '%en.gmw.cn%' OR
    MentionSourceName LIKE '%russian.cri.cn%' OR
    MentionSourceName LIKE '%beijingreview.com.cn%' OR
    MentionSourceName LIKE '%indiatimes.com%' OR
    MentionSourceName LIKE '%business-standard.com%' OR
    MentionSourceName LIKE '%india.com%' OR
    MentionSourceName LIKE '%indianexpress.com%' OR
    MentionSourceName LIKE '%dnaindia.com%'
);


-- Event table creation/fill
CREATE TABLE chn_events_test LIKE events;
INSERT chn_events_test
SELECT * FROM events
WHERE (
    Actor1CountryCode = 'CHN' OR Actor2CountryCode = 'CHN'
);


-- building joined table
CREATE TABLE joined_chn_test
SELECT 
    chn_events_test.GLOBALEVENTID,
	chn_events_test.ID AS EventID,
	chn_eventmentions_test.ID AS MentionID,
	chn_eventmentions_test.MentionSourceName,
    -- event date
	chn_events_test.SQLDATE AS EventSQLDATE,
    chn_events_test.Y,
    -- mention date
	chn_eventmentions_test.MentionTimeDate,
    chn_events_test.Actor1CountryCode,
    chn_events_test.Actor2CountryCode,
    chn_events_test.Actor1Name,
    chn_events_test.Actor2Name,
	chn_events_test.ActionGeo_FullName,
	chn_events_test.ActionGeo_CountryCode,
	chn_eventmentions_test.MentionDocTone,
    -- raw CAMEO code
    chn_events_test.EventCode
FROM
	chn_events_test
INNER JOIN chn_eventmentions_test ON chn_events_test.GLOBALEVENTID = chn_eventmentions_test.GLOBALEVENTID;