import { Component, OnInit } from '@angular/core';
import countries from '../../data/countries.json';
import FIPSNTC from '../../data/fipsNameToCode.json';
declare var $: any;

@Component({
  selector: 'app-geography',
  templateUrl: './geography.component.html',
  styleUrls: ['./geography.component.scss']
})
export class GeographyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.clear();
    $('#query3').hide();
    $('#qryBtn').hide();
    $('#sourceWarning').hide();

    $(document).ready(function(e) {
      
      // Event / Article attribute selected
      $('#btn-group').on('click', 'button', function(e) {

        $('#btn-group').children().each(function() {
          $(this).css("background-color", "cadetblue");
        });

        $(this).css("background-color", "lightgreen");
        localStorage.setItem('selectedAttribute', this.innerText);
        
        // Show Warning for Reporting Source
        if (this.innerText == "Nationality of Reporting Source") {
          $('#sourceWarning').show();
        } else {
          $('#sourceWarning').hide();
        }

        $('#query3').show();
        // Resizes map automatically
        $('img[usemap]').rwdImageMaps();
      });

      // Changes text based on region clicked
      $('area').on('focus', function(e) {
        e.preventDefault();
        $('#region').html($(this).attr('id'));
        
        $('#country-list').empty();

        // Populates list of countries based on region clicked
        for (var i in countries) {
          var region = $(this).attr('id');

          if (countries[i].continent == region && FIPSNTC.hasOwnProperty(countries[i].country.toUpperCase())) {
            $('#country-list').append(
              '<li class="country" style="display:inline-block; padding:0.5em; margin: 2px; background-color:cadetblue; border-radius:50px;">' + 
              '<a href="#" style="color: white; text-decoration: none;">' + 
              countries[i].country + '</a></li>'
            )
          }
        }
      });

      // Prevents link routing on map click
      $(document).on('click', 'map', function(e) {
        e.preventDefault();
      });

      // Resets text & country list when clicked on world image outside region
      $("#globe").on('click', function() {
        if ( $(e.target).closest('area').length === 0 ) {
          $('#region').html(''); 
          $('#country-list').empty();
          $('#qryBtn').hide();
        }
      });

      // Select a country from country list
      $('#country-list').on('click', 'li', function (e) {
        e.preventDefault();

        $(".country").each(function() {
          $(this).css("background-color", "cadetblue");
        });

        $(this).css("background-color", "lightgreen");
        localStorage.setItem('selectedCountry', this.innerText);
        $('#qryBtn').show();
      });
    });
  }

}