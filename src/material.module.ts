import { MatSidenavModule } from '@angular/material/sidenav';
import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    MatSidenavModule
  ],
  exports: [
    MatSidenavModule
  ]
})

export class MaterialModule {}
