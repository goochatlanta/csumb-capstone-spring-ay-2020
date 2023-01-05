## GDELT China China Subset Query Service

Provides a collection of endpoints that gives access to static aggregate data and customizable queries for the subset of GDELT related to China.

### Table of Contents

- [Running Locally](#running-locally)
- [API Documentation](#api-documentation)

---

#### Running Locally

**Clone repository**

*HTTPS* `git clone https://gitlab.nps.edu/dsag/csumb-capstone-spring-ay-2020.git`
 
*SSH* `git clone git@gitlab.nps.edu:dsag/csumb-capstone-spring-ay-2020.git`

**Install dependencies**

`npm install` to install all required dependencies.

**Configure environmental variables**

Inside the root directory `backend/`, add file `.env` with the necessary variables needed for our database connection. 

[Here](./.sample-env) is a template to be used.

Once created, ensure that the `.env` file is added to your .gitignore. This file is **not** to be comitted. 

**Start local server**

`npm start` to start the local server.

---

### API Documentation

#### Current supported routes are:


**GET /dropdown/countries**

Parameters: None

Returns: Single dimension JSON list composed of each distinct `Actor1/2Name`


**GET /dropdown/pressOrigins**

Parameters: None

Returns: Single dimension JSON list composed of each distinct `PressOrigin`


**GET /dropdown/locations**

Parameters: None 

Returns: Single dimension JSON list composed of each distinct `ActionGeo_CountryCode`


**GET /dropdown/cameoCodes**

Parameters: None

Returns: Single dimension JSON list composed of each distinct `EventCode`


**POST /query**

The request must be made with a body following this format:

```
	"fields": {
		"column": [],
		"otherActor": [],
		"cameoCode": [],
		"location": [],
		"pressOrigin": []
	}
```

Each list can accept any number of arguments. 
Providing an empty list will make the query inclusive of all values for that column. 
All columns are included in the result from queried table, unless specific columns are provided in the "column" list. 

Example body: 

```
	"fields": {
		"column": [],
		"otherActor": ["USA"],
		"cameoCode": ["05%"],
		"location": ["CH"],
		"pressOrigin": ["IND"]
	}
```	

And this produces the following query: 

```
	SELECT * FROM joined_chn_test
	WHERE ((Actor1CountryCode LIKE "USA" OR Actor2CountryCode LIKE "USA"))
				AND (EventCode LIKE "05%") AND (ActionGeo_CountryCode LIKE "CH")
				AND (PressOrigin LIKE "IND")
	;
```

Visualizations can be produced by adding the "visualizeName" field:

```
	"fields": {
		"column": [],
		"otherActor": ["USA"],
		"cameoCode": [],
		"location": [],
		"pressOrigin": [],
		"visualizeName": "visualiztion-key"
	}
```

"visualizeName" can accept the following values:

```
	"topCameoCodes"
	"topEventLocations"
	"topActors"
	"articleToneTime"
	"numArticlesTime"
```

The SQL for each visualization can be referenced [here](config/queryConstants.js)

Returns: Raw JSON result from query


**POST /query/test**

This endpoint may be used to test that the proper query strings are being formed. 

It can be interacted with the same way as /query

Example usage:

```
{
	"fields": {
		"column": [],
		"otherActor": ["USA", "RUS"],
		"cameoCode": ["05%"],
		"location": ["CH"],
		"pressOrigin": ["IND"]
	}
}
```

Returns: 

```
	{
			"queryString": "SELECT * FROM joined_chn_test WHERE ((Actor1CountryCode LIKE ? OR Actor2CountryCode LIKE ?) OR (Actor1CountryCode LIKE ? OR Actor2CountryCode LIKE ?)) AND (EventCode LIKE ?) AND (ActionGeo_CountryCode LIKE ?) AND (PressOrigin LIKE ?);",
			"filters": [
					"USA",
					"USA",
					"RUS",
					"RUS",
					"05%",
					"CH",
					"IND"
			]
	}
```


**POST /query/download**

This endpoint is identical to /query, but intead of returning JSON it will send a download as a csv named "Results.csv"

