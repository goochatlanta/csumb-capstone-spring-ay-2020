import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatPaginator } from '@angular/material';


const MaterialComponents = [
  MatButtonModule,
  MatNativeDateModule, 
  MatFormFieldModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
]



@NgModule({
  imports: [ MaterialComponents ],
  exports: [ MaterialComponents ]
})
export class MaterialModule { }
