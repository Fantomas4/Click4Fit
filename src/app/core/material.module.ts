import {MatSidenavModule} from '@angular/material/sidenav';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatTabsModule,
    MatSelectModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatSelectModule
  ]
})

export class MaterialModule {}
