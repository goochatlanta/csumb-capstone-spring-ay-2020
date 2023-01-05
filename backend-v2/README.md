# GDELT Express API v2

## Table of Contents
- [Running Locally](#running-locally)
- [Run in EC2](#run-in-ec2-persistently)
- [Connect to Remote Server](#connect-to-remote-server)
- [API Documentation](#api-documentation)
- [SQL](#sql)
- [Future Work](#future-work)

---

## Running Locally
Node version: 16.13

`$ npm install` to install required dependencies

`$ npm start` to start local server

---

## Run in EC2 Persistently

In the Athena EC2:

`$ screen -ls` to list open screens

`$ screen -r [screen name]` to reconnect to existing screen

`$ ctrl-a d` inside screen to disconnnect from screen

`$ exit` inside screen to terminate screen

**If EC2 has been restarted**, create a new screen:

`$ screen -S athena-express-api` to create a screen

`$ cd ~/csumb-capstone-spring-ay-2020/backend-v2` to navigate to the directory

`$ npm start` to start the server

---

## Connect to Remote Server

Enter the following into your terminal and change the file path to the permission file to begin port forwarding:

```bash
$ ssh -L 8080:localhost:3000 -i <path to gbbat_athena.pem> ec2-user@18.188.192.191
```

In the Athena EC2 instance, navigate to the **backend-v2** directory in the **express-api** branch and start server using 

```bash
$ npm start
```

Open Postman or your browser with http://localhost:8080

---

## API Documentation

### Current supported routes:

**POST /query/query**

The request must be made with a body following this format:
```json
{
    "NextToken": null,
    "QueryExecutionId": null,
    "events": {
        "columns": [],
        "where": {
            "otherActor": [],
            "location": []
        },
        "visualizeName": null
    }
}
```

"visualizeName" can accept the following values:
```
 null
 "topCameoCodes"
 "topEventLocations"
```

Returns JSON with the following format:
```json
{
    "Items": [],
    "NextToken": "", // if absent, no next page
    "QueryExecutionId": "", // always present but beneath NextToken if more pages
    // other stats
}
```
If the response includes `NextToken`, the front end needs to query again to get the next page and pass the `NextToken` and `QueryExecutionId` values back through the request body. If `NextToken` is not present, there are no more pages.

**GET /attribute/location**

Parameters: None

Returns: location.json file in [backend-v2/data](data) created by the **/attribute/files** scheduled query. Lists all distinct actiongeo_countrycode in events table.

**GET /attribute/otherActor**

Parameters: None

Returns: otherActor.json file in [backend-v2/data](data) created by the **/attribute/files** scheduled query. Lists all distinct actor1countrycode and actor2countrycode in events table.

**GET /attribute/files**

Parameters: None

Returns: Creates json files in [backend-v2/data](data) for available selection attributes. Currently creates event location (location) and other nationality (otherActor) for the [two-step query](https://balsamiq.cloud/ssf0e6r/p3l8gjw/r90F2).

This query is called in a cronjob in the Athena EC2 every hour to update the files.

**GET /query**

Parameters: None

Returns: JSON object of hardcoded DB query

[backend-v2/controllers/test.js](controllers/test.js) line 9 to change the query SQL

**GET /query/sqlTest**

Parameters: None

Returns: Built SQL from request

-----

## SQL

All queries start with:
```sql
FROM events WHERE (actor1countrycode = 'CHN' OR actor2countrycode = 'CHN')
```

SQL is being built dynamically in [controllers/test.js](controllers/test.js)

Use **/query/sqlTest** to get built SQL from a request

---

## Future Work

- Create table that combines events and eventmentions based on specifications from [the events codebook](https://research-n8o6741.slack.com/archives/GTD37CN0P/p1613070212016800). Join on `GlobalEventID`. Example of previous mini-table [here](../queries/createtable.sql)
    - Not listed in codebook, but need to create new column PressOrigins (hardcoded from eventmentions MentionSourceName column [similar to here](../queries/add_press.sql) -- double check source names with Liz) (needed for "topActor" visualizeName blocks)
    - Filter event rows before joining to `WHERE (actor1countrycode = 'CHN' OR actor2countrycode = 'CHN')`. Once this filter is done, remove that filter from [/backend-v2/config/builder.js](./config/builder.js)'s WHERE builder (line 76)
- Create subset of GKG data based on specifications from [the gkg codebook](https://research-n8o6741.slack.com/archives/GTD37CN0P/p1613070212016800) -- double check with Liz on this
- Incorporate eventmentions and gkg tables into queries
    - for the rest of the [visualizeName options](config/builder.js) and for [more specific queries](https://balsamiq.cloud/ssf0e6r/p3l8gjw/r28AC)
- Build query/visualizations for GKG visuals [(topical theme route)](https://balsamiq.cloud/ssf0e6r/p3l8gjw/rBD72)
- Update [middleware](config/req_checker.js) to check request values since athena-express does not allow escaped sql inputs to avoid sql injection
- Look into using an in memory cache to replace the attribute files so we can avoid I/O operations in every request
    - Currently /attribute/files query is called by a cron job in the Athena EC2 instance every hour to update the values in the files 

### Notes

Available countries [users can select from](https://balsamiq.cloud/ssf0e6r/p3l8gjw/r90F2), created by **/attribute/files** Code/Name conversions:

**geographic bounds**: (events + eventmentions)

1. country of event conversions:     
    
    [fipsNameToCode](../gdelt-gui-v2/src/app/data/fipsNameToCode.json) and [fipsCodetoName](../gdelt-gui-v2/src/app/data/fipsCodeToName.json)

2. nationality of actor: 

    [iso3166NameToCode](../gdelt-gui-v2/src/app/data/iso3166nameToCode.json) and [iso3166CodeToName](../gdelt-gui-v2/src/app/data/iso3166CodeToName.json)

**topical theme**: (gkg)

1. subtopics from [here](http://vocabulary.worldbank.org/taxonomy.visual)
