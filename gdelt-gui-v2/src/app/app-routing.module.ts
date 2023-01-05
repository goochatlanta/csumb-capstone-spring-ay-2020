import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutDataComponent } from './components/about-data/about-data.component';
import { AboutTeamComponent } from './components/about-team/about-team.component';
import { GeographyComponent } from './components/geography/geography.component';
import { HomeComponent } from './components/home/home.component';
import { NarrowSearchComponent } from './components/narrow-search/narrow-search.component';
import { SpecificDataComponent } from './components/specific-data/specific-data.component';
import { ThemeComponent } from './components/theme/theme.component';
import { ToneComponent } from './components/tone/tone.component';
import { VisualsComponent } from './components/visuals/visuals.component';
import { ThemeVisualsComponent } from './components/theme-visuals/theme-visuals.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'about-team', component: AboutTeamComponent},
  { path: 'about-data', component: AboutDataComponent},
  { path: 'narrow-search', component: NarrowSearchComponent},
  { path: 'geography', component: GeographyComponent},
  { path: 'theme', component: ThemeComponent},
  { path: 'tone', component: ToneComponent},
  { path: 'visuals', component: VisualsComponent},
  { path: 'specific-data', component: SpecificDataComponent},
  { path: 'theme-visuals', component: ThemeVisualsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
