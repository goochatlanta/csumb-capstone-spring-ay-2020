import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { VisualizeComponent } from './components/visualize/visualize.component';
import { DataComponent } from './components/data/data.component';
import { NavComponent } from './components/nav/nav.component';


const routes: Routes = [
  { path: "search", component: SearchComponent},
  { path: "home", component: HomeComponent},
  { path: "visualize", component: VisualizeComponent},
  { path: "data", component: DataComponent},
  { path: "nav", component: NavComponent},
  { path: "", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
