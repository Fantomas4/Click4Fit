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
import { DeleteDialogMessageComponent } from './myprofile/delete-dialog-message/delete-dialog-message.component';
import {MyProfileService} from './myprofile/myprofile.service';
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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomepageComponent } from './homepage/homepage.component';
import { WorkoutService } from './workout/workout.service';
import { ContactUsService } from './contact-us/contact-us.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RecoverDialogMessageComponent } from './recover-password/recover-dialog-message/recover-dialog-message.component';
import { RecoverPasswordService } from './recover-password/recover-password.service';
import { UpdateDialogMessageComponent } from './myprofile/update-dialog-message/update-dialog-message.component';
import { BusinessAddEntryDialogService} from './manage-business-entries/business-add-entry-dialog/business-add-entry-dialog.service';
import { BusinessDetailsEditDialogService} from './manage-business-entries/business-details-edit-dialog/business-details-edit-dialog.service';
import { UserDetailsEditDialogService} from './manage-user-entries/user-details-edit-dialog/user-details-edit-dialog.service';
import { DeleteDialogMessageService} from './myprofile/delete-dialog-message/delete-dialog-message.service';
import {JwtInterceptor} from './core/jwt.interceptor';
import {ErrorInterceptor} from './core/error.interceptor';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_FORMATS} from "@angular/material-moment-adapter";

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
    DeleteDialogMessageComponent,
    ManageBusinessEntriesComponent,
    BusinessDetailsEditDialogComponent,
    BusinessAddEntryDialogComponent,
    ManageUserEntriesComponent,
    UserDetailsEditDialogComponent,
    UserDetailsEditDialogComponent,
    FooterComponent,
    HomepageComponent,
    ErrorPageComponent,
    RecoverDialogMessageComponent,
    ContactUsDialogMessageComponent,
    UpdateDialogMessageComponent
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
    MatListModule,
    HttpClientModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: ''}, MyProfileService,WorkoutService,RecoverPasswordService,ContactUsService,
    BusinessAddEntryDialogService, BusinessDetailsEditDialogService, UserDetailsEditDialogService, DeleteDialogMessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: MAT_DATE_LOCALE, useValue: 'fr'},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}

  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialogMessageComponent,RecoverDialogMessageComponent]
})
export class AppModule { }
