import { MatSidenavModule } from '@angular/material/sidenav';
import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  imports: [
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule
  ],
  exports: [
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule
  ]
})

export class MaterialModule {}
