import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NarrowSearchComponent } from './components/narrow-search/narrow-search.component';
import { GeographyComponent } from './components/geography/geography.component';
import { ThemeComponent } from './components/theme/theme.component';
import { ToneComponent } from './components/tone/tone.component';
import { VisualsComponent } from './components/visuals/visuals.component';
import { AboutTeamComponent } from './components/about-team/about-team.component';
import { AboutDataComponent } from './components/about-data/about-data.component';
import { SpecificDataComponent } from './components/specific-data/specific-data.component';
import { NavComponent } from './components/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { StorageServiceModule } from 'angular-webstorage-service';
import { MatTabsModule } from '@angular/material/tabs';
import { ThemeVisualsComponent } from './components/theme-visuals/theme-visuals.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NarrowSearchComponent,
    GeographyComponent,
    ThemeComponent,
    ToneComponent,
    VisualsComponent,
    AboutTeamComponent,
    AboutDataComponent,
    SpecificDataComponent,
    NavComponent,
    ThemeVisualsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatSlideToggleModule,
    HttpClientModule,
    ChartsModule,
    StorageServiceModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
