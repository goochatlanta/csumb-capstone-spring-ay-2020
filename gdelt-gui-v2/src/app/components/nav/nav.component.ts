import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public router: Router) {
    // Runs Every Time Router Event Occurs (URL Changes)
    router.events.subscribe((event) => {
      if(event instanceof NavigationStart) {
        $('#helpcontent').hide();

        // Updates Help Content
        switch (event.url) {
          case '/home':
            $('#helptext').html("You are now on the Homepage. Here you can learn about what GBBAT is and what GDELT data it has to offer. If you would like to look into events & related news articles featuring Chinese media, click the big button.");
            $('#sitemap').attr("src", "../../../assets/sitemap/sitemap (Home).png");
            break;
          case '/narrow-search':
            $('#helptext').html("Now you are within a subset of GDELT that pertains to events with at least one Chinese actor. Here you can begin to narrow down your search based on the attributes of news events you are interested in.");
            $('#sitemap').attr("src", "../../../assets/sitemap/sitemap (NS).png");
            break;
          case '/geography':
            $('#helptext').html("Welcome to the geography page. Here you will perform a 2 step query, pick a geographical attribute and the country the attribute applies to. You can pick the country where an event occured, the country where news originated from, or the country of the other actor.");
            $('#sitemap').attr("src", "../../../assets/sitemap/sitemap (Geography).png");
            break;
          case '/theme':
            $('#helptext').html("Welcome to the theme page. Here you can search for or pick a theme that news events fit under.");
            $('#sitemap').attr("src", "../../../assets/sitemap/sitemap (Theme).png");
            break;
          case '/visuals':
            $('#helptext').html("You are now on the visuals page. This page will show you some visual information based on the attributes you picked for your queries.");
            $('#sitemap').attr("src", "../../../assets/sitemap/sitemap (Visuals).png");
            break;
          case '/theme-visuals':
            $('#helptext').html("You are now on the visuals page. This page will show you some visual information based on the attributes you picked for your queries.");
            $('#sitemap').attr("src", "../../../assets/sitemap/sitemap (Visuals).png");
            break;
          case '/specific-data':
            $('#helptext').html("This is the downloads page. Here you can pick any variable(s) from the 3 GDELT tables that GBBAT has to offer that interests you. Then click the download button to download a CSV file with the data you are searching for.");
            $('#sitemap').attr("src", "../../../assets/sitemap/sitemap (Downloads).png");
            break;
          case '/tone':
            $('#helptext').html("Welcome to the tone page. This page is under construction / not in use. Please go back.");
            break;
          case '/about-team':
            $("#helptext").html("This is the About Team Page. Learn about the team that created and maintains GBBAT.")
            $('#sitemap').attr("src", "../../../assets/sitemap/sitemap (AT).png");
            break;
          case '/about-data':
            $("#helptext").html("This is the About Data Page. Learn about the data that GBBAT has to offer.")
            $('#sitemap').attr("src", "../../../assets/sitemap/sitemap (AD).png");
            break;
        }
      }
    });
  }

  ngOnInit(): void {
    $('#helpcontent').hide();
  }

  help() {
    if ($('#helpcontent').is(":hidden")) {
      $('#helpcontent').show();
    } else {
      $('#helpcontent').hide();
    }
  }

}
