import { Component, OnInit } from '@angular/core';
import { PressOrigin, EventLocation, OtherActor } from '../../models/country.model';
import { cameoCode } from '../../models/country.model';
import { APIService } from '../../services/api.service';
import Alpha3 from '../../data/iso3166CodeToName.json';                             // JSON for actor list translation
import Fips from '../../data/fips.json';                                            // JSON for location list translation
import CAMEO from '../../data/cameo_code_to_name.json';                             // JSON for cameo code list translation
import pressCodes from '../../data/pressOriginCountryCode.json';                    // JSON for press origin country list translation

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  
  pressOrigin: PressOrigin[];
  cameoCodes: cameoCode[];
  eventLocation: EventLocation[];
  otherActor: OtherActor[];

  cameoList = [];
  countriesList = [];
  locationList = [];
  pressList = [];

  originSelected;
  actorSelected;
  locationSelected;
  cameoSelected;

  // Resets drop downs that do not have ID passed in
  reset(selectId){
    var elements = document.getElementsByTagName('select');
    for (var i = 0; i < elements.length; i++)
    {
      if (elements[i].id != selectId)
      {
        elements[i].selectedIndex = 0;
      }
    }
  }

  constructor( private apiService: APIService) { }

  ngOnInit() {
    
    localStorage.clear();

    // Create country (actor) name/code list
    
    this.apiService.allCountries().subscribe(res=>{
      var countryCodeList = Alpha3[0];
      var countries = res;
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
    

    //Create CAMEO Code list
    
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

    // Create press origin dropdown list

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

    document.getElementById("searchButton").style.visibility="hidden";
    document.getElementById("visualizeButton").style.visibility="hidden";

    setTimeout(() => 
    {
      this.reset("none");
    },
    500);
  }

  selectUpdate(event){
    this.reset(event.target.id);
    let name = event.target.options[0].textContent
    name = name.substring(7,name.length);
    localStorage.clear();
    localStorage.setItem('categoryName', name);
    localStorage.setItem('value', event.target.value);
    localStorage.setItem('category', event.target.id);
    localStorage.setItem('description', event.target.options[event.srcElement.selectedIndex].textContent);
    if (localStorage.getItem("value")!="-1")
    {
      document.getElementById("searchButton").style.visibility="visible";
      document.getElementById("visualizeButton").style.visibility="visible";
    }
    else
    {
      document.getElementById("searchButton").style.visibility="hidden";
      document.getElementById("visualizeButton").style.visibility="hidden";
    }
  }

}
