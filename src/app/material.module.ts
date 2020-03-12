import { MatSidenavModule } from '@angular/material/sidenav';
import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  imports: [
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  exports: [
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule
  ]
})

export class MaterialModule {}
