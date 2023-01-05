SHOW INDEX FROM gdelt.chn_eventmentions_test;
SHOW INDEX FROM gdelt.chn_events_test;
SHOW INDEX FROM gdelt.events;
SHOW INDEX FROM gdelt.eventmentions;
SHOW INDEX FROM gdelt.joined_chn_test;


-- chn_eventmentions_test (confirm completion)
    CREATE INDEX idx_GLOBALEVENTID
    ON chn_eventmentions_test (GLOBALEVENTID);
    CREATE INDEX Actor1CountryCode_idx
    ON chn_eventmentions_test (MentionTimeDate);
    CREATE INDEX Actor1CountryCode_idx
    ON chn_eventmentions_test (MentionTimeDate);

-- chn_events_test (confirm completion)
    CREATE INDEX Actor1CountryCode_idx
    ON chn_events_test (Actor1CountryCode(3));
    CREATE INDEX Actor2CountryCode_idx
    ON chn_events_test (Actor2CountryCode(3));
    CREATE INDEX ActionGeo_CountryCode_idx
    ON chn_events_test (ActionGeo_CountryCode(3));

-- eventsmentions (confirm completion)
    CREATE INDEX eventmentions_mention_source_name_idx
    ON eventmentions (MentionSourceName(48));
    CREATE INDEX idx_GLOBALEVENTID
    ON eventmentions (GLOBALEVENTID);

-- events (need to be applied)
    CREATE INDEX idx_GLOBALEVENTID
    ON events (GLOBALEVENTID);
    CREATE INDEX Actor1CountryCode_idx
    ON events (Actor1CountryCode(3));
    CREATE INDEX Actor2CountryCode_idx
    ON events (Actor2CountryCode(3));
    CREATE INDEX ActionGeo_CountryCode_idx
    ON events (ActionGeo_CountryCode(3));
    CREATE INDEX NumMentions_idx
    ON events (NumMentions);

-- joined_chn_test (all complete 4/19)
    CREATE INDEX Actor1CountryCode_idx
    ON joined_chn_test (Actor1CountryCode(3));
    CREATE INDEX Actor2CountryCode_idx
    ON joined_chn_test (Actor2CountryCode(3));
    CREATE INDEX ActionGeo_CountryCode_idx
    ON joined_chn_test (ActionGeo_CountryCode(2));
    CREATE INDEX PressOrigin_idx
    ON joined_chn_test (PressOrigin(3));
    CREATE INDEX EventCode_idx
    ON joined_chn_test (EventCode(3));
