import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import THEMES from "../../data/themes.json";
declare var $: any;

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class ThemeComponent implements OnInit {
	names = ["Emil", "Tobias", "Linus"];
  group1 = ["Agriculture and Food Security", "Climate Change", "Economic Growth", "Education", "Energy and Extractives", "Environment, Natural Resources and Blue Economy"];
  group2 = ["Financial Sector Development", "Fragility, Conflict and Violence", "Gender", "Health, Nutrition and Population", "Information and Communication Technologies", "Jobs", "Macroeconomic Vulnerability and Debt", "Macroeconomic and Structural Policies"];
  group3 = ["Poverty", "Private Sector Development", "Public Sector Management", "Public-Private Partnerships", "Social Development", "Social Protection and Labor", "Trade", "Transport", "Urban Development", "Water"];
  
  //Agriculture and Food Security
  theme1 = ["Agricultural Policies", "Agricultural Risk and Security", "Climate Smart Agriculture", "Commercial Agriculture", "Linking Farmers with Markets", "Natural Resources", "Rural Development"];
  
  //Climate Change
  theme2 = ["Climate Change Adaptation", "Climate Change Law", "Climate Change Mitigation", "Climate Finance", "Climate Resilient Development", "Climate Science", "Climate Services"];
  
  //Economic Growth
  theme3 = ["Determinants of Economic Growth", "Economic Growth Analytics", "Economic Growth Diagnostics", "Economic Growth Policy", "Inclusive Growth", "Innovation and Growth", "Spatial Growth"];

  //Education
  theme4 = ["Economics of Education", "Education for All", "Education Management and Administration", "Levels of Education"];

  //Energy and Extractives
  theme5 = ["Carbon Capture and Storage", "Energy Access", "Energy Efficiency", "Energy Finance", "Energy Storage", "Extractives and Cross-Cutting Themes", "Mining Sector", "Mining Systems", "Non-Renewable Energy", "Oil and Gas Industry", "Oil and Gas Systems", "Power and Electricity Systems", "Power Systems", "Renewable Energy"];

  //Environment, Natural Resources and Blue Economy
  theme6 = ["Conservation Finance", "Ecosystem Management", "Ecosystems", "EcosystemServices", "Environmental Engineering", "EnvironmentalManagement", "Environmental Safeguards", "Environmental Sustainability", "Green Growth", "Natural Resources Management", "Pollution Management"];

  //Financial Sector Development
  theme7 = ["Capital Markets", "Financial Architecture and Banking", "Financial Inclusion", "Financial Infrastructure and Remittances", "Financial Institutions", "Financial Integrity", "Financial Technology", "International Financial Standards"];

  //Fragility, Conflict and Violence
  theme8 = ["Conflict and Violence", "Crisis Risk Management", "Human Rights", "Peace Operations and Conflict Management"];

  //Gender
  theme9 = ["Gender and Climate Change", "Gender and Economic Empowerment", "Gender and Human Development", "Gender and Infrastructure", "Gender and Macroeconomic Policies", "Gender and Rural Development", "Gender and Urban Development", "Gender Based Violence", "Gender Monitoring and Evaluation", "Global Gender Policy Frameworks", "Voice and Agency"];

  //Health, Nutrition and Population
  theme10 = ["Health", "Nutrition", "Population, Aging and Health", "Public Health", "Sexual, Reproductive, Maternal and Child Health"];

  //Information and Communication Technologies
  theme11 = ["Digital Government", "ICT Innovation and Transformtaion", "ICT for Jobs", "Telecommunications Media and Technology", "Telecommunications and Broadband Access"];

  //Jobs
  theme12 = ["Inclusive Jobs", "Jobs and Development", "Jobs Diagnostics", "Inclusive Jobs"];

  //Macroeconomic Vulnerability and Debt
  theme13 = ["Aid Dependence", "Balance of Payments", "Debt and Macroeconomic Stability", "Deflation", "Dutch Disease", "Economic Shocks and Vulnerability", "Financial Sector Instability", "Financial Sector Liabilities", "Fiscal Balance", "Fiscal Policy and Inequality", "Fiscal Risks", "Inflation", "Macro-Vulnerability", "Macroeconomic Imbalances and Adjustments", "Macroeconomics of Conflict and Fragility", "Price Volatility", "Soft Budget Constraints"];

  //Macroeconomic and Structural Policies
  theme14 = ["Macroeconomic Modelling and Statistics", "Macroeconomic Monitoring", "Macroprudential Policy", "Monetary Policy", "Sovereign Asset Management", "Structural Policy and Reform"];

  //Poverty
  theme15 = ["Behavioral Initiatives for Poverty Reduction and Equity", "Evidence-Based Policy", "Inclusive Growth", "Inequality and Shared Prosperity", "Jobs and Poverty", "Markets and Institutions or Poverty Reduction and Shared Prosperity", "Poverty Measurement and Analysis", "Shocks and Vulnerability to Poverty"];

  //Private Sector Development
  theme16 = ["Competition Policy", "Competitive Industries", "Innovation, Technology and Entrepreneurship", "Investment Climate", "Upstream Activities", "Subnational Investment"];

  //Public Sector Management
  theme17 = ["Governance in Public Sector", "Legal and Regulatory Framework", "Justice", "Public Administration", "Public Finance"];

  //Public-Private Partnerships
  theme18 = ["PPP Contract Management", "PPP Fiscal Management", "PPP Governance and Institutions", "PPP Policy and Strategy", "PPP Procurement", "PPP Project Selection", "Private Sector Development for PPP", "Thematic-based PPPs"];

  //Social Development
  theme19 = ["Community Driven Development", "Cultural Heritage", "Social Accountability", "Social Analysis", "Social Cohesion", "Social Inclusion", "Social Resilience and Climate Change", "Social Safeguards"];

  //Social Protection and Labor
  theme20 = ["Labor Markets", "Social Assistance", "Social Insurance", "Social Protection and Labor Delivery Systems", "Social Protection and Labor Systems"];

  //Trade
  theme21 = ["Trade Competitiveness and Diversification", "Trade Facilitation and Logistics", "Trade Policy and Integration"];

  //Transport
  theme22 = ["Emerging Transport Technologies", "Modes of Transport", "Rural Transport", "Transport and Logistics Services", "Transport and Sustainable Development", "Transport Economics", "Transport Equipment", "Transport Governance", "Transport Infrastructure", "Urban Transport"];

  //Urban Development
  theme23 = ["Cities Initiative", "Competitive Cities", "Cultural Heritage and Sustainable Tourism", "Disaster Risk Management", "Global Partnership for Results-Based Approaches", "Green Cities", "Inclusive Cities", "National Urban Policies", "Resilient Cities", "Urban Governance and City Systems", "Urbanization and Growth", "Urban Solid Waste Management and Cleaning Services", "Urban Transport", "Urban Water"];

  //Water
  theme24 = ["Agricultural Water Management", "Energy and Water", "Water Allocation and Water Economics", "Water Security and Itegrated Resource Management", "Water Supply and Sanitation"];
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    localStorage.clear();
    $('#searchMessage').hide();

    //Setups Autocomplete Function
    this.autocomplete(<HTMLInputElement>document.getElementById('searchbar'), THEMES);
  }

  themeClicked(event, item) {
    localStorage.setItem('chosenTheme', item);
  }


  // Auto Comeplete Function for When Typing in Search Bar
  autocomplete(input: HTMLInputElement, list: string | any[]) {
    //var currentFocus;

    // Listens for When Users Interacts with Search Bar
    input.addEventListener("input", function(e: any) {
      var a: HTMLElement, b: HTMLElement, i: number, val = this.value;

      closeAllLists(e);
      $('#searchMessage').hide();

      if (!val) { return false; }
      //currentFocus = -1;

      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");

      this.parentNode.appendChild(a);

      for (i = 0; i < list.length; i++) {
        if (list[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + list[i].substr(0, val.length) + "</strong>";
          b.innerHTML += list[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + list[i] + "'>";

          // Listens for When Item in List is Clicked On
          b.addEventListener("click", function(e: any) {
            input.value = this.getElementsByTagName("input")[0].value;
            closeAllLists(e);
          });

          a.appendChild(b);
        }  
      }
    });

    function closeAllLists(e: EventTarget) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (e != x[i] && e != input) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }

    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }

  // Search Button is Clicked On
  search() {
    var value = (<HTMLInputElement>document.getElementById('searchbar')).value;
    console.log(value);

    if (THEMES.includes(value)) {
      localStorage.setItem('chosenTheme', value);
      this.router.navigateByUrl('/theme-visuals');
    } else {
      $('#searchMessage').show();
    }
  }

}
