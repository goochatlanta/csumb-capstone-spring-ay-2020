import { Component, OnInit } from '@angular/core';
import { PressOrigin, EventLocation, OtherActor, cameoCode } from '../../models/country.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIService } from '../../services/api.service';
import * as fileSaver from 'file-saver';
import Alpha3 from '../../data/iso3166CodeToName.json';
import CAMEO from '../../data/cameo_code_to_name.json';
import Fips from '../../data/fips.json';
import pressCodes from '../../data/pressOriginCountryCode.json';
import { analyzeAndValidateNgModules } from '@angular/compiler';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  actorVal: string;
  pressVal: string;
  cameoVal: string;
  eventVal: string;

  pressOrigin: PressOrigin[];
  cameoCodes: cameoCode[];
  eventLocation: EventLocation[];
  otherActor: OtherActor[];

  cameoList = [];
  countriesList = [];
  locationList = [];
  pressList = [];

  originSelected;
  locationSelected;
  actorSelected;
  cameoSelected;

  displayActor = true;
  displayLocation = true;
  displayPress = true;
  displayCameo = true;

  currentCategory;
  currentDescription;

  constructor(private http: HttpClient,private apiService: APIService) {}

  reset(){
    var elements = document.getElementsByTagName('select');
    for (var i = 0; i < elements.length; i++){
      elements[i].selectedIndex = 0;
    }
  }

  ngOnInit(): void {

    this.currentCategory = localStorage.getItem("categoryName");
    this.currentDescription = localStorage.getItem("description");

    let category = localStorage.getItem("category");
    this.actorVal="", this.pressVal="", this.cameoVal="", this.eventVal="";

    // Create country (actor) name/code list
    
    this.apiService.allCountries().subscribe(res=>{
      var countries = res;
      var countryCodeList = Alpha3[0];
      for (var i = 0; i < countries.length; i++){
        var obj = {};
        obj["name"] = countryCodeList[countries[i]["ActorCountryCode"]];
        obj["code"] = countries[i]["ActorCountryCode"];
        if (obj["code"]!="")
        {
          this.countriesList.push(obj);
        }
      }
      this.countriesList.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
      var firstObj = {};
      firstObj["name"] = "Select Actor";
      firstObj["code"] = "-1";
      this.countriesList.unshift(firstObj);
    });
    
    // Create CAMEO Code list
    
    this.apiService.allCameoCodes().subscribe(res=>{
      var codes = res;
      var firstObj = {};
      firstObj["description"] = "Select CAMEO Code";
      firstObj["number"] = "-1";
      this.cameoList.push(firstObj);
      for (var i = 0; i < codes.length; i++){
        if (codes[i]["EventCode"].length == 3 && codes[i]["EventCode"][2] == "0"){  
          var obj = {};
          var splittedString = CAMEO[codes[i]["EventCode"]].split(", ");
          obj["description"] = splittedString[0];
          obj["number"] = codes[i]["EventCode"].substring(0,2);
          this.cameoList.push(obj);
        }
      }
    });

    // Create location country list

    this.apiService.allLocations().subscribe(res=>{
      var locations = res;
      for (var i = 0; i < locations.length; i++){
        var obj = {};
        obj["name"]=Fips[locations[i]["ActionGeo_CountryCode"]];
        obj["code"]=locations[i]["ActionGeo_CountryCode"];
        if (Fips.hasOwnProperty(locations[i]["ActionGeo_CountryCode"])){
          this.locationList.push(obj);
        }
      }
      this.locationList.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
      var firstObj = {};
      firstObj["name"] = "Select Location";
      firstObj["code"] = "-1";
      this.locationList.unshift(firstObj);
    });

    // Create press origin country list

    this.apiService.allSources().subscribe(res=>{
      var origins = res;
      for (var i = 0; i < origins.length; i++){
        var obj = {};
        obj["name"] = pressCodes[origins[i]["PressOrigin"]];
        obj["code"] = origins[i]["PressOrigin"];
        this.pressList.push(obj);
      }
      this.pressList.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
      var firstObj = {};
      firstObj["name"] = "Select Press Origin";
      firstObj["code"] = "-1";
      this.pressList.unshift(firstObj);
    });

    // Hide dropdown that was selected in data component

    switch(category){
      case "pressOriginSelect":
        this.displayPress = false;
        break;
      case "eventLocationSelect":
        this.displayLocation = false;
        break;
      case "cameoCodeSelect":
        this.displayCameo = false;
        break;
      case "otherActorSelect":
        this.displayActor = false;
        break;
    }

    // Set dropdown values to first value

    setTimeout(() => 
    {
      this.reset();
    },
    500);

  }

  // Gather dropdown values and query in database

  query(){
    document.getElementById("processing").style.visibility="visible";
    var object = {};
    var press = [], event = [], cameo = [], actor = []; 
    var category = localStorage.getItem("category");
    var value = localStorage.getItem("value");

    // Add dropdown values if considered valid

    if (this.originSelected !== undefined && this.originSelected != "-1"){
      press.push(this.originSelected);
    }
    if (this.locationSelected !== undefined && this.locationSelected != "-1"){
      event.push(this.locationSelected);
    }
    if (this.cameoSelected !== undefined && this.cameoSelected != "-1"){
      cameo.push(this.cameoSelected+"%");
    }
    if (this.actorSelected !== undefined && this.actorSelected != "-1"){
      actor.push(this.actorSelected);
    }

    // Add value determined in data component

    switch(category){
      case "pressOriginSelect":
        press.push(value);
        break;
      case "eventLocationSelect":
        event.push(value);
        break;
      case "cameoCodeSelect":
        var cam=value+"%";
        cameo.push(cam);
        break;
      case "otherActorSelect":
        actor.push(value);
        break;
    }

    // Place values in appropriate places in object to send to query endpoint

    object["pressOrigin"] = press;
    object["otherActor"] = actor;
    object["cameoCode"] = cameo;
    object["location"] = event;
    object["column"]=[];

    var object2={};
    object2["fields"]=object;

    // Query database and download results to .csv

    this.apiService.download(object2).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/csv; charset=utf-8' });
      fileSaver.saveAs(blob, 'results.csv');
      document.getElementById("processing").style.visibility="hidden";
    }), error => console.log('Error downloading the file'),() => console.info('File downloaded successfully');
  }
  
}
