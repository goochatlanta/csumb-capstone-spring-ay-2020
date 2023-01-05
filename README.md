# GUI Design (Draft 1)

We offer users access to articles and summary information about China in the news since 2015 drawing on the GDELT 2.0 database. 

## Highlights of GUI design

- Default choice leads user to download a small sample of the data, not the entire thing.
- Two-stage filter and query interface. 
- Intial data tab will present the users with a simple schema of the data possibilities and narrow research question.

## Simple Database Layout

| Date | Press Country | Press Source | Event Location | Other Actor Country | Cameo Code | Article Tone |
| ----------- | ----------- |----------- | ----------- | ----------- | ----------- | ----------- |
| 20160911 | India | Indian Times | Bangladesh | Bangladesh | Provide economic aid | 2.5 |

Data Consideration
- Date type (maybe split year and month and day).
- Country Origin done manually and recorded in metadata.
- Press Source is drawn from url in eventmentions table.
- Cameo code from the events table (GKG Theme, in the long run.)


## Journey of hypothetical user 
A user comes to our [home page](http://www.fao.org/faostat/en/#home), like the UN FAO's. They choose the [data tab](http://www.fao.org/faostat/en/#data). 

### Data Tab
At this point, they have to make their first choice - and it is a big choice. The user will have to decide what aspect of their question defines their query. In the FAO example, the user has to choose what topic they want to explore. For our data, this will translate to bounds on article types:

- Country origin of press
- Country location of event
- Country origin of other actor
- Cameo code (GKG Theme, in the long run)

These four topics are analagous to the **Topic Headers** on the FAO's [data tab](http://www.fao.org/faostat/en/#data), i.e., Production, Trade, Inputs, etc. Under our headers, the user will make a choice about what country or what theme they are interested in. 

Using the three questions: 
1. What are Indian news outlets saying about neighbors relations with China in the last two years?
2. How have agricultural issues been reported on involving China (emotional tone)? Where (event location)? When? Who's involved (specific actor)? 
3. Is the U.S. media becoming increasingly negative about trade with China? Is the trend for EU media different?

Filtering choice: 
1. This user will pick "India" under the **Country origin of press** header.
2. This user will pick "Agriculture" under the **Theme** header.
3. This user would also choose the **Theme** header and choose "Trade" or alternatively do two queries using the **Country of origin of the press**.

Other questions, like Who is reporting on Chinese activities in Bangladesh? What are they reporting on? Would be intially filtered by **Country location of event**, e.g. "Bangladesh".

### Query tab

After the user has made their choice in the data tab, they will be brought to the final [query interface](http://www.fao.org/faostat/en/#data/QD). Here the user will be presented with select one, select multiple or select all options for the other variables available. For example, the user who chose "India" under **Country origin of press** will decide on:

- Country location of event
- Country origin of other actor
- Cameo code (GKG Theme, in the long run)

Once chosen, the user can download a .csv file with the raw data observations bounded by their query. The dataset will include

# Future ideas
A data-saavy user will likely want to download the raw data observation-article subset following their query. However, many users are going to want the data summarized for them. We should think about how we will  
- Element: Frequency of articles, article tone, histograms of cameo codes, actor origins, event locations.  
- Region groupings of countries, like EU, Middle East, South East Asia, etc.