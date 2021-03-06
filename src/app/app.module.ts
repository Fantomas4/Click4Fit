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
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { UserMainViewComponent } from './user-main-view/user-main-view.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { LocationAutocompleteComponent } from './search/location-autocomplete/location-autocomplete.component';
import { DetailsDialogComponent } from './search/details-dialog/details-dialog.component';
import { DeleteDialogMessageComponent } from './myprofile/delete-dialog-message/delete-dialog-message.component';
import {MyProfileService} from './myprofile/myprofile.service';
import { WorkoutCardComponent } from './workout-card/workout-card.component';
import { ManageBusinessEntriesComponent } from './manage-business-entries/manage-business-entries.component';
import { BusinessDetailsEditDialogComponent} from './manage-business-entries/business-details-edit-dialog/business-details-edit-dialog.component';
import { BusinessAddEntryDialogComponent } from './manage-business-entries/business-add-entry-dialog/business-add-entry-dialog.component';
import { ManageUserEntriesComponent } from './manage-user-entries/manage-user-entries.component';
import { UserDetailsEditDialogComponent } from './manage-user-entries/user-details-edit-dialog/user-details-edit-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { HomepageComponent } from './homepage/homepage.component';
import { WorkoutService } from './workout/workout.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import {JwtInterceptor} from './core/jwt.interceptor';
import {ErrorInterceptor} from './core/error.interceptor';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS} from '@angular/material-moment-adapter';
import { ManageMyBusinessComponent } from './manage-my-business/manage-my-business.component';
import { MyBusinessDetailsEditDialogComponent } from './manage-my-business/my-business-details-edit-dialog/my-business-details-edit-dialog.component';
import { MyBusinessAddEntryDialogComponent } from './manage-my-business/my-business-add-entry-dialog/my-business-add-entry-dialog.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { ManageWorkoutEntriesComponent } from './manage-workout-entries/manage-workout-entries.component';
import { WorkoutAddEntryDialogComponent} from './manage-workout-entries/workout-add-entry-dialog/workout-add-entry-dialog.component';
import { WorkoutDetailsEditDialogComponent} from './manage-workout-entries/workout-details-edit-dialog/workout-details-edit-dialog.component';
import {AlertService} from './core/alert.service';

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
    BusinessCardComponent,
    WorkoutCardComponent,
    LocationAutocompleteComponent,
    DetailsDialogComponent,
    DeleteDialogMessageComponent,
    ManageBusinessEntriesComponent,
    BusinessDetailsEditDialogComponent,
    BusinessAddEntryDialogComponent,
    ManageUserEntriesComponent,
    UserDetailsEditDialogComponent,
    FooterComponent,
    HomepageComponent,
    ErrorPageComponent,
    ManageMyBusinessComponent,
    MyBusinessDetailsEditDialogComponent,
    MyBusinessAddEntryDialogComponent,
    ManageWorkoutEntriesComponent,
    WorkoutAddEntryDialogComponent,
    WorkoutDetailsEditDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LayoutModule,
    HttpClientModule,
    MatSelectCountryModule,
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: ''}, MyProfileService, WorkoutService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    AlertService

  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialogMessageComponent]
})
export class AppModule { }
