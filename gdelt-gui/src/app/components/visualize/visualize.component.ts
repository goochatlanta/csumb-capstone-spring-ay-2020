import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import CAMEO from '../../data/cameo_code_to_name.json';
import Alpha3 from '../../data/iso3166CodeToName.json';
import Fips from '../../data/fips.json';
import { HttpClient } from '@angular/common/http';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-visualize',
  templateUrl: './visualize.component.html',
  styleUrls: ['./visualize.component.scss']
})
export class VisualizeComponent implements OnInit {

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

  tone2015 = [];
  tone2016 = [];
  tone2017 = [];
  tone2018 = [];
  tone2019 = [];

  months = ['JAN',"FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  years = ["2015", "2016", "2017", "2018"];

  constructor( private http: HttpClient,private apiService: APIService ) { }


  ngOnInit(){

    document.getElementById("chartLoading").style.visibility="visible";
    var category = localStorage.getItem("category");
    var value = localStorage.getItem("value");

    switch(category){
      case "pressOriginSelect":
        this.pressOrigin.push(value);
        break;
      case "eventLocationSelect":
        this.eventLocation.push(value);
        break;
      case "cameoCodeSelect":
        var cam=value+"%";
        this.cameoCode.push(cam);
        break;
      case "otherActorSelect":
        this.otherActor.push(value);
        break;
    }

    if(category == "eventLocationSelect"){
      this.numOfArticles();
      this.topTenCameoCodes();
      this.toneChange();
      this.topTenActors();
    }
    else if (category == "cameoCodeSelect") {
      this.numOfArticles();
      this.topTenEventLocation();
      this.toneChange();
      this.topTenActors();
    } 
    else{
      this.numOfArticles();
      this.topTenEventLocation();
      this.toneChange();
      this.topTenActors();
      this.topTenCameoCodes();
    } 
  }  

  topTenActors() {
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
      document.getElementById("chartLoading").style.visibility="hidden";
      document.getElementById("chartLoading").style.height="1px";

      for(var i = 0; i < actorsObj.length; i++){
        var singleObj = actorsObj[i];
        var actorName = singleObj["actors"]
        var data = singleObj["freq"];      
        this.topTenActorsName.push(actorName);
        this.topTenActorsData.push(data);
      }
     var chart = new Chart('actorsCanvas', {
        type: 'bar',
        data: {
          labels: this.topTenActorsName,
          datasets: [
            {
              label: "Top 10 Actors",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e59cd", "#8e4da2","#3abc9f","#e5d9b9","#c2f950"],
              data: this.topTenActorsData
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Top Ten Actors (2015-2019)'
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

      for(var i = 0; i < toneObj.length; i++ ){
          var singleObj = toneObj[i];
          var toneDate = singleObj["MentionYearMonth"];
          var toneData = singleObj["MentionDocTone"];
          var str = toneDate;
          var strMonth = str.substring(4);
          var month = parseInt(strMonth)
          var monthIndex = month-1;  
          var strYear = str.substring(0,4);

          if(strYear == 2015){
            this.tone2015[monthIndex] = toneData;
          }
          else if (strYear == 2016){
            this.tone2016[monthIndex] = toneData;
          }
          else if (strYear == 2017){
            this.tone2017[monthIndex] = toneData;
          }
          else if (strYear == 2018){
            this.tone2018[monthIndex] = toneData;
          }
          else if (strYear == 2019){
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
              borderColor: "#3e95cd",
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
            }
          ]
        },
        options: {
          legend: {display: true},
          title: {
            display: true,
            text: 'Tone Change each month(2015-2019)'
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
  
  topTenEventLocation() {
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

      for(var i = 0; i < eventsObj.length; i++ ){
        var countryCode = eventsObj[i];
        countryCode["name"]=Fips[countryCode["ActionGeo_CountryCode"]];
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
            text: 'Top event locations in the year (2015-2019)'
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

  topTenCameoCodes() {
    var object={};

  var  body = { 
      "fields": {
        "column": [],
        "otherActor": this.otherActor,
        "cameoCode": this.cameoCode,
        "location": this.eventLocation,
        "pressOrigin": this.pressOrigin,
        "visualizeName": "topCameoCodes"
      }
    }
    object["fields"]=body;
    this.apiService.visualize(body).subscribe(res => {
    var cameoObj = res;

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
              label: "Top 10 Cameo Codes",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3e59cd", "#8e4da2","#3abc9f","#e5d9b9","#c2f950"],
              data: this.topTenCameoData
            }
          ],
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Top Ten Cameo Codes (2015-2019)'
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
    object["fields"]=body;
    this.apiService.visualize(body).subscribe(res => {
    var  articlesObj = res;

      for(var i = 0; i < articlesObj.length; i++ ){
        var singleObj = articlesObj[i];
        var articleData = singleObj["numArticles"];
        var articleDate = singleObj["MentionYearMonth"];
        var str = articleDate;
        var strMonth = str.substring(4);
        var month = parseInt(strMonth)
        var monthIndex = month-1;
        var strYear = str.substring(0,4);

        if(strYear == 2015){
          this.articles2015[monthIndex] = articleData;
        }
        else if (strYear == 2016){
          this.articles2016[monthIndex] = articleData;
        }
        else if (strYear == 2017){
          this.articles2017[monthIndex] = articleData;
        }
        else if (strYear == 2018){
          this.articles2018[monthIndex] = articleData;
        }
        else if (strYear == 2019){
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
              borderColor: "#3e95cd",
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
            }
          ]
        },
        options: {
          legend: {display: true},
          title: {
            display: true,
            text: 'Number of articles published each month(2015-2019)'
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
    })
  } 
}

  