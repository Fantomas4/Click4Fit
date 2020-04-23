import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './core/app-routing.module';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {APP_BASE_HREF} from '@angular/common';
import { WorkoutComponent } from './workout/workout.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MaterialModule} from './core/material.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { UserMainViewComponent } from './user-main-view/user-main-view.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { ResultCardComponent } from './search/result-card/result-card.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { LocationAutocompleteComponent } from './search/location-autocomplete/location-autocomplete.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DetailsDialogComponent } from './search/details-dialog/details-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';
import {MyProfileDeleteService} from './myprofile/myprofile.delete.service';
import { ResultCard2Component } from './workout/result-card2/result-card2.component';
import { ManageBusinessEntriesComponent } from './manage-business-entries/manage-business-entries.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BusinessDetailsEditDialogComponent} from './manage-business-entries/business-details-edit-dialog/business-details-edit-dialog.component';
import { BusinessAddEntryDialogComponent } from './manage-business-entries/business-add-entry-dialog/business-add-entry-dialog.component';
import { ManageUserEntriesComponent } from './manage-user-entries/manage-user-entries.component';
import { UserDetailsEditDialogComponent } from './manage-user-entries/user-details-edit-dialog/user-details-edit-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomepageComponent } from './homepage/homepage.component';


@NgModule({
  declarations: [
    AppComponent,
    WorkoutComponent,
    SearchComponent,
    AboutComponent,
    MyprofileComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    UserMainViewComponent,
    ContactUsComponent,
    HomeComponent,
    ResultCardComponent,
    ResultCard2Component,
    LocationAutocompleteComponent,
    DetailsDialogComponent,
    DialogMessageComponent,
    ManageBusinessEntriesComponent,
    BusinessDetailsEditDialogComponent,
    BusinessAddEntryDialogComponent,
    ManageUserEntriesComponent,
    UserDetailsEditDialogComponent,
    UserDetailsEditDialogComponent,
    FooterComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    RouterModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: ''}, MyProfileDeleteService],
  bootstrap: [AppComponent],
  entryComponents: [DialogMessageComponent]
})
export class AppModule { }
