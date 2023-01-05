import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api/api.service';
import FIPSNTC from '../../data/fipsNameToCode.json';
import FIPSCTN from '../../data/fipsCodeToName.json';
import ISONTC from '../../data/iso3166NameToCode.json';
import CAMEO from '../../data/cameoCodeToName.json';
declare var $: any;

@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.scss']
})
export class VisualsComponent implements OnInit {

  pressOrigin = [];
  eventLocation = [];
  cameoCode = []; 
  otherActor = []; 

  topTenEventLocNames = [];
  topTenEventLocData = [];
 
  topTenCameoName = [];
  topTenCameoData = [];
 
  topTenActorsName = [];
  topTenActorsData = [];

  articles2015 = [];
  articles2016 = [];
  articles2017 = [];
  articles2018 = [];
  articles2019 = [];
  articles2020 = [];
  articles2021 = [];

  tone2015 = [];
  tone2016 = [];
  tone2017 = [];
  tone2018 = [];
  tone2019 = [];
  tone2020 = [];
  tone2021 = [];

  months = ['JAN',"FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  years = ["2015", "2016", "2017", "2018", "2019", "2020", "2021"];

  constructor( private http: HttpClient, private apiService: ApiService ) { }

  ngOnInit() {

    var selectedAttribute = localStorage.getItem('selectedAttribute');
    var selectedCountry = localStorage.getItem('selectedCountry');

    // Console Logs for Testing
    console.log(FIPSNTC[selectedCountry.toUpperCase()]);
    console.log(ISONTC[0][selectedCountry]);

    switch(selectedAttribute) {
      case "Event Location":
        $('#title').html('News in ' + selectedCountry + ' featuring Chinese Actors');
        this.eventLocation.push(FIPSNTC[selectedCountry.toUpperCase()]);
        break;
      case "Nationality of Reporting Source":
        $('#title').html('News from ' + selectedCountry + ' featuring Chinese Actors');
        this.pressOrigin.push(ISONTC[0][selectedCountry]);
        break;
      case "Country of Other Actor":
        $('#title').html('News featuring Actors from ' + selectedCountry + ' and China');
        this.otherActor.push(ISONTC[0][selectedCountry]);
        break;
    }

    // Hide Charts until Loaded
    $('#articleCanvas').hide();
    $('#cameoCanvas').hide();
    $('#actorCanvas').hide();
    $('#toneCanvas').hide();
    $('#eventCanvas').hide();

    // Create Charts
    this.numOfArticles();
    this.topActors();
    this.toneChange();
    this.topCameoCodes();

    if (selectedAttribute != "Event Location") {
      this.topTenEventLocations();
    } else {
      $('#eventCanvasLoading').hide();
    }
  }

  numOfArticles() {
    var object={};
  
    var body = { 
      "fields": {
        "column": [],
        "otherActor": this.otherActor,
        "cameoCode": this.cameoCode,
        "location": this.eventLocation,
        "pressOrigin": this.pressOrigin,
        "visualizeName": "numArticlesTime"
      }
    }

    object["fields"] = body;
    this.apiService.visualize(body).subscribe(res => {
      var  articlesObj = res;

      // Shows Chart if there is Data & After Loading
      if (articlesObj.length == 0) {
        $('#articleCanvasLoading').html("No Data for Number of Articles");
      } else {
        $('#articleCanvas').show();
        $('#articleCanvasLoading').hide();
      }
  
      for (var i = 0; i < articlesObj.length; i++ ) {
        var singleObj = articlesObj[i];
        var articleData = singleObj["numArticles"];
        var articleDate = singleObj["MentionYearMonth"];
        var str = articleDate;
        var strMonth = str.substring(4);
        var month = parseInt(strMonth)
        var monthIndex = month-1;
        var strYear = str.substring(0,4);
  
        if (strYear == 2015) {
          this.articles2015[monthIndex] = articleData;
        } else if (strYear == 2016) {
          this.articles2016[monthIndex] = articleData;
        } else if (strYear == 2017) {
          this.articles2017[monthIndex] = articleData;
        } else if (strYear == 2018) {
          this.articles2018[monthIndex] = articleData;
        } else if (strYear == 2019) {
          this.articles2019[monthIndex] = articleData;
        }
      }
  
      var chart =  new Chart('articleCanvas', {
        type: 'line',
        data: {
          labels: this.months,
          datasets: [
            {
              data: this.articles2015,
              label: "2015",
              borderColor: "#66ff99",
              fill: false
            },
            {
              data: this.articles2016,
              label: "2016",
              borderColor: "#8e5ea2",
              fill: false
            },
            {
              data: this.articles2017,
              label: "2017",
              borderColor: "#fcba03",
              fill: false
            },
            {
              data: this.articles2018,
              label: "2018",
              borderColor: "#c45850",
              fill: false
            },
            {
              data: this.articles2019,
              label: "2019",
              borderColor: "#4287f5",
              fill: false
            },
            {
              data: this.articles2020,
              label: "2020",
              borderColor: "#FF576E",
              fill: false
            },
            {
              data: this.articles2021,
              label: "2021",
              borderColor: "#27408B",
              fill: false
            }
          ]
        },
        options: {
          legend: {display: true},
          title: {
            display: true,
            text: 'Number of Articles Published Each Month (2015 - 2021)'
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "ARTICLES PUBLISHED"
              }
            }],
          }
        }
      });

      chart.render();
    });
  }

  topActors() {
    var object={};
 
    var  body = { 
      "fields": {
        "column": [],
        "otherActor": this.otherActor,
        "cameoCode": this.cameoCode,
        "location": this.eventLocation,
        "pressOrigin": this.pressOrigin,
        "visualizeName": "topActors"
      }
    }

    object["fields"]=body;
    this.apiService.visualize(body).subscribe(res => {
      var actorsObj = res;

      // Shows Chart if there is Data & After Loading
      if (actorsObj.length == 0) {
        $('#actorCanvasLoading').html("No Data for Top Actors");
      } else {
        $('#actorCanvas').show();
        $('#actorCanvasLoading').hide();
      }

      for(var i = 0; i < actorsObj.length; i++){
        var singleObj = actorsObj[i];
        var actorName = singleObj["actors"]
        var data = singleObj["freq"];      
        this.topTenActorsName.push(actorName);
        this.topTenActorsData.push(data);
      }

      var chart = new Chart('actorCanvas', {
        type: 'bar',
        data: {
          labels: this.topTenActorsName,
          datasets: [
            {
              label: "Top Actors",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e59cd", "#8e4da2","#3abc9f","#e5d9b9","#c2f950"],
              data: this.topTenActorsData
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Top Actors (2015 - 2021)'
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "ACTOR FREQUENCY"
              }
            }],
          }
        }  
      });
      chart.render();
    })
  }

  toneChange() {
    var object={};
 
    var body = { 
      "fields": {
        "column": [],
        "otherActor": this.otherActor,
        "cameoCode": this.cameoCode,
        "location": this.eventLocation,
        "pressOrigin": this.pressOrigin,
        "visualizeName": "articleToneTime"
      }
    }

    object["fields"]=body;
    this.apiService.visualize(body).subscribe(res => {
      var toneObj = res;

      // Shows Chart if there is Data & After Loading
      if (toneObj.length == 0) {
        $('#toneCanvasLoading').html("No Data for Tone Change");
      } else {
        $('#toneCanvas').show();
        $('#toneCanvasLoading').hide();
      }
 
      for (var i = 0; i < toneObj.length; i++ ) {
        var singleObj = toneObj[i];
        var toneDate = singleObj["MentionYearMonth"];
        var toneData = singleObj["MentionDocTone"];
        var str = toneDate;
        var strMonth = str.substring(4);
        var month = parseInt(strMonth)
        var monthIndex = month-1;  
        var strYear = str.substring(0,4);
 
        if (strYear == 2015) {
          this.tone2015[monthIndex] = toneData;
        } else if (strYear == 2016) {
          this.tone2016[monthIndex] = toneData;
        } else if (strYear == 2017) {
          this.tone2017[monthIndex] = toneData;
        } else if (strYear == 2018) {
          this.tone2018[monthIndex] = toneData;
        } else if (strYear == 2019) {
          this.tone2019[monthIndex] = toneData;
        }
      }
 
      var chart =  new Chart('toneCanvas', {
        type: 'line',
        data: {
          labels: this.months,
          datasets: [
            {
              data: this.tone2015,
              label: "2015",
              borderColor: "#66ff99",
              fill: false
            },
            {
              data: this.tone2016,
              label: "2016",
              borderColor: "#8e5ea2",
              fill: false
            },
            {
              data: this.tone2017,
              label: "2017",
              borderColor: "#fcba03",
              fill: false
            },
            {
              data: this.tone2018,
              label: "2018",
              borderColor: "#c45850",
              fill: false
            },
            {
              data: this.tone2019,
              label: "2019",
              borderColor: "#4287f5",
              fill: false
            },
            {
              data: this.tone2020,
              label: "2020",
              borderColor: "#FF576E",
              fill: false
            },
            {
              data: this.tone2021,
              label: "2021",
              borderColor: "#27408B",
              fill: false
            }
          ]
        },
        options: {
          legend: {display: true},
          title: {
            display: true,
            text: 'Tone Change Each Month (2015 - 2021)'
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "TONE CHANGE"
              }
            }],
          }
        }
      });
      chart.render();
    })
  }

  topCameoCodes() {
    var object={};

    var body = { 
      "fields": {
        "column": [],
        "otherActor": this.otherActor,
        "cameoCode": this.cameoCode,
        "location": this.eventLocation,
        "pressOrigin": this.pressOrigin,
        "visualizeName": "topCameoCodes"
      }
    }

    object["fields"] = body;
    this.apiService.visualize(body).subscribe(res => {
      var cameoObj = res;

      // Shows Chart if there is Data & After Loading
      if (cameoObj.length == 0) {
        $('#cameoCanvasLoading').html("No Data for Top Cameo Codes");
      } else {
        $('#cameoCanvas').show();
        $('#cameoCanvasLoading').hide();
      }

      for(var i = 0; i < cameoObj.length; i++ ){
        var obj = cameoObj[i];
        var obj2 = {};
        obj2["description"] = CAMEO[cameoObj[i]["EventCode"]];
        var codeToName = obj2["description"];
        var data = obj.matches;
        this.topTenCameoName.push(codeToName);
        this.topTenCameoData.push(data);
      }

      var chart =  new Chart('cameoCanvas', {
        type: 'bar',
        data: {
          labels: this.topTenCameoName,
          datasets: [
            {
              label: "Top Cameo Codes",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e59cd", "#8e4da2","#3abc9f","#e5d9b9","#c2f950"],
              data: this.topTenCameoData
            }
          ],
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Top Cameo Codes (2015 - 2021)'
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: "CAMEO NUMBER MATCHES"
              }
            }],
          }
        }  
      });

      chart.render();
    })
  }

  topTenEventLocations() {
    var object={};

    var  body = { 
      "fields": {
        "column": [],
        "otherActor": this.otherActor,
        "cameoCode": this.cameoCode,
        "location": this.eventLocation,
        "pressOrigin": this.pressOrigin,
        "visualizeName": "topEventLocations"
      }
    }

    object["fields"]=body;
    this.apiService.visualize(body).subscribe(res => {
      var eventsObj = res;

      // Shows Chart if there is Data & After Loading
      if (eventsObj.length == 0) {
        $('#eventCanvasLoading').html("No Data for Top Event Locations");
      } else {
        $('#eventCanvas').show();
        $('#eventCanvasLoading').hide();
      }

      for(var i = 0; i < eventsObj.length; i++ ){
        var countryCode = eventsObj[i];
        countryCode["name"] = FIPSCTN[countryCode["ActionGeo_CountryCode"]];
        var countryName = countryCode["name"];
        var data = eventsObj[i]["matches"];
        this.topTenEventLocNames.push(countryName);
        this.topTenEventLocData.push(data);
      }

      var chart = new Chart('eventCanvas', {
        type: 'bar',
        data: {
          labels: this.topTenEventLocNames,
          datasets: [
            {
              label: "Top event locations",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e59cd", "#8e4da2","#3abc9f","#e5d9b9","#c2f950"],
              data: this.topTenEventLocData
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Top Event Locations (2015 - 2021)'
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "EVENTS NUMBERS MATCHES"
              }
            }],
          }
        }  
      });

      chart.render();
    })
  }
}
