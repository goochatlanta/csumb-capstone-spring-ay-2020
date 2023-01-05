import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { VisualizeComponent } from './components/visualize/visualize.component';
import { DataComponent } from './components/data/data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { NavComponent } from './components/nav/nav.component';
import { MaterialModule } from './material/material.module';
import { ChartsModule } from 'ng2-charts';
import { ChartService } from './services/chart.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    VisualizeComponent,
    DataComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    MatSliderModule,
    BrowserAnimationsModule,   
    ReactiveFormsModule,
    FormsModule,
    StorageServiceModule,
    HttpClientModule,
    MaterialModule,
    ChartsModule
  ],
  providers: [
     {provide: ChartService }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
