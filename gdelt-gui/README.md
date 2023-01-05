# GdeltGui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Components

*  Home 
    * Landing page of application
    * Directs user to `Data` component

* Data
    * Choose from either `Other Actor`, `Press Origin`, `CAMEO Code`, or `Event Location` to narrow the search criteria
    * Component allows for only one to be selected at a time
    * Directs user to either `Visualize` component or `Search` component

* Search
    * Refine other fields not previously selected in `Data` component
    * Allows user to download .csv of query

* Visualize
    * Displays graphs of other fields not previously specified by user

# Services
* API Service
    * Interacts with API
    * Delivers JSON for dropdowns/visualizations
    * Delivers .csv for download function
    * Takes parameters to query with