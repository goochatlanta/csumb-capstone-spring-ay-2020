import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api/api.service';
import FileSaver from 'file-saver';
import FIPSNTC from '../../data/fipsNameToCode.json';
import ISONTC from '../../data/iso3166NameToCode.json';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
declare var $: any;

@Component({
  selector: 'app-specific-data',
  templateUrl: './specific-data.component.html',
  styleUrls: ['./specific-data.component.scss']
})
export class SpecificDataComponent implements OnInit {

  constructor(private http: HttpClient,private apiService: ApiService) {}

  selectedAttribute: string;
  selectedCountry: string;
  selectedTheme: string;

  column = ["GlobalEventID", "GKGRECORDID"];

  ngOnInit(): void {
    $('#processText').hide();

    this.selectedAttribute = localStorage.getItem('selectedAttribute');
    this.selectedCountry = localStorage.getItem('selectedCountry');
    this.selectedTheme = localStorage.getItem('chosenTheme');

    switch(this.selectedAttribute) {
      case "Event Location":
        $('#title').html('So you want more specific GDELT data about events in ' + this.selectedCountry + '?');
        break;
      case "Nationality of Reporting Source":
        $('#title').html('So you want more specific GDELT data about news from ' + this.selectedCountry + '?');
        break;
      case "Country of Other Actor":
        $('#title').html('So you want more specific GDELT data featuring actors from ' + this.selectedCountry + ' and China?');
        break;
      default:
        if (this.selectedTheme != null) {
          $('#title').html('So you want more specific GDELT data with news about ' + this.selectedTheme + '?');
        }
    }
  }

  // Table Variable Toggle is Toggled
  toggle($event: MatSlideToggleChange) {
    var toggleText = $event.source._elementRef.nativeElement.children[0].children[1].outerText;
    var columnNames = [];

    // Converts Toggle Text to Column Name(s)
    switch(toggleText) {
      case "Year":
        columnNames.push("Y");
        break;
      case "Actor Attributes":
        columnNames.push("Actor1Code");
        columnNames.push("Actor2Code");
        columnNames.push("Actor1Name");
        columnNames.push("Actor2Name");
        columnNames.push("Actor1CountryCode");
        columnNames.push("Actor2CountryCode");
        columnNames.push("Actor1KnownGroupCode");
        columnNames.push("Actor2KnownGroupCode");
        columnNames.push("Actor1EthnicCode");
        columnNames.push("Actor2EthnicCode");
        columnNames.push("Actor1Religion1Code");
        columnNames.push("Actor2Religion1Code");
        columnNames.push("Actor1Religion2Code");
        columnNames.push("Actor2Religion2Code");
        columnNames.push("Actor1Type1Code");
        columnNames.push("Actor2Type1Code");
        columnNames.push("Actor1Type2Code");
        columnNames.push("Actor2Type2Code");
        columnNames.push("Actor1Type3Code");
        columnNames.push("Actor2Type3Code");
        break;
      case "Event Codes":
        columnNames.push("EventCode");
        columnNames.push("EventBaseCode");
        columnNames.push("EventRootCode");
        break;
      case "Action Geo Attributes":
        columnNames.push("ActionGeo_Type");
        columnNames.push("ActionGeo_Fullname");
        columnNames.push("ActionGeo_CountryCode");
        columnNames.push("ActionGeo_ADM1Code");
        columnNames.push("ActionGeo_ADM2Code");
        columnNames.push("ActionGeo_Lat");
        columnNames.push("ActionGeo_Long");
        columnNames.push("ActionGeo_FeatureID");
        break;
      case "Actor Geo Attributes":
        columnNames.push("Actor1Geo_Type");
        columnNames.push("Actor2Geo_Type");
        columnNames.push("Actor1Geo_Fullname");
        columnNames.push("Actor2Geo_Fullname");
        columnNames.push("Actor1Geo_CountryCode");
        columnNames.push("Actor2Geo_CountryCode");
        columnNames.push("Actor1Geo_ADM1Code");
        columnNames.push("Actor2Geo_ADM1Code");
        columnNames.push("Actor1Geo_ADM2Code");
        columnNames.push("Actor2Geo_ADM2Code");
        columnNames.push("Actor1Geo_Lat");
        columnNames.push("Actor1Geo_Long");
        columnNames.push("Actor2Geo_Lat");
        columnNames.push("Actor2Geo_Long");
        columnNames.push("Actor1Geo_FeatureID");
        columnNames.push("Actor2Geo_FeatureID");
        break;
      case "MentionIdentifier":
        columnNames.push("MentionID");
        break;
      default:
        columnNames.push(toggleText);
    }

    // Calls Edit Column Function for Each Variable
    for(var i = 0; i < columnNames.length; i++) {
      this.editColumn(columnNames[i], $event.checked);
    }

    console.log(this.column);
  }

  // Adds or Removes Variables from Column list based on Checked Value 
  editColumn(columnName: string, checked: boolean) {
    if (checked) {
      if (columnName != undefined) {
        this.column.push(columnName);
      }
    } else {
      var index = this.column.indexOf(columnName);

      if (index > -1) {
        this.column.splice(index, 1);
      }
    }
  }

  // Gather dropdown values and query in database
  query(){
    $('#downloadButton').hide();
    $('#processText').show();

    var object = {};
    var press = [], event = [], cameo = [], actor = [];

    switch(this.selectedAttribute) {
      case "Event Location":
        event.push(FIPSNTC[this.selectedCountry.toUpperCase()]);
        break;
      case "Nationality of Reporting Source":
        press.push(ISONTC[0][this.selectedCountry]);
        break;
      case "Country of Other Actor":
        actor.push(ISONTC[0][this.selectedCountry]);
        break;
    }

    // Place values in appropriate places in object to send to query endpoint
    object["pressOrigin"] = press;
    object["otherActor"] = actor;
    object["cameoCode"] = cameo;
    object["location"] = event;
    object["column"] = this.column;

    var object2 = {};
    object2["fields"] = object;

    // Query database and download results to .csv
    this.apiService.download(object2).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/csv; charset=utf-8' });
      FileSaver.saveAs(blob, 'results.csv');

      $('#downloadButton').show();
      $('#processText').hide();
    }), (error: string) => console.log('Error downloading the file -> ' + error),() => console.info('File downloaded successfully');
  }

}
