# Journal



# Timeline (draft)

End of week of Feb. 17
- Get everyone access to the data in AWS
- Get everyone working in the GitLab repo

End of week of Feb. 24
- Get beginnings of GUI in GitLab
- Specify the characteristics of data to hold in our subset

Early March
- Get basic functionality of GUI working
- Further refine subset of data
- Figure out how to translate data from GUI into SQL queries

Mid/late March
- Decide how to populate search fields/drop down menus of GUI with dynamic data from data set
- Begin styling of GUI
- Add indexes, optimize for speed

Early April
- Figure out how to send data from GUI
- Figure out how to receive data from GUI

Mid/Late April
- Finish GUI styling
- Ensure communication between GUI and backend is fast
- Automatic updates?

Early May
- Finalize design
- Bug testing
- 

# GUI Development 

2/26/20
- Sal was able to get pagination working for the results part of the page, and right now that section is filled with dummy data. Howver, it could easily be adapted to work with real data that we would get from real queries. Similarly, Chris got some placeholder selection forms for actor countries, reporter countries and data ranges in order to provide a mockup of what the final version could look like.
- The next step will now be to begin tailoring the input fields to what specifically Liz wants the user to be able to query on and what the backend team need to successfully run a query.

# Data Discoveries

Queries Tested
 - SELECT COUNT(*) FROM gdelt.events WHERE Actor1CountryCode = "CHN"
    - Took ~ 15 min and 21 sec
    - Returned: '6366191'

 - SELECT COUNT(*) FROM events WHERE SOURCEURL LIKE 'http_://www.ecns.cn%';
    - Took ~ 30 minutes
    - Returned: '895'

 - SELECT COUNT(*) FROM events WHERE SOURCEURL LIKE 'http_://www.peopledaily.com.cn%';
    - Still running...

 -  CREATE TABLE chn_events_test LIKE events;
    INSERT chn_events_test
    SELECT * FROM events
    WHERE (
        SOURCEURL LIKE 'http_://www.xinhuanet.com%' OR
        SOURCEURL LIKE 'http_://www.chinadaily.com.cn%' OR
        SOURCEURL LIKE 'http_://www.china.org.cn%' OR
        SOURCEURL LIKE 'http_://www.ecns.cn%' OR
        SOURCEURL LIKE 'http_://www.peopledaily.com.cn%'
    );
        - This query took considerable time, and it only partially worked. It seems to only have gotten data from 'www.ecns.cn' as well as two entries from one other source. The data is no longer sorted by date, and instead seems to be sorted by the source url. I am not sure if the solution to this is to sort it, or to change the initial construction query. I also need to confirm that the event IDs are still correlated correctly with the event mentions and, eventually, the gkg table. 
        - I am not sure if this query timed out, or if the syntax has an error.

# Paul Whipp - Database Update

I have working version of the necessary SQL to create the events and event mentions tables for the project. This is uploaded to this repository as 'createtable.sql.'  I have done some (unscientific) sanity testing to make sure that the data contained is what we are looking for, and it seems like everything worked correctly. 
   - revision: I have changed 'ActorXCode' to 'ActorXCountryCode' and rebuilt the tables.