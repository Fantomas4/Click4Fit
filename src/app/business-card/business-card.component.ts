import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DetailsDialogComponent} from '../search/details-dialog/details-dialog.component';
import {BusinessEntry} from '../business-entry';
import {environment} from '../../environments/environment';
import {Subscription} from 'rxjs';
import {AlertMessage} from '../core/alert-message';
import {AlertService} from '../core/alert.service';
import {UserService} from '../core/user.service';

@Component({
  selector: 'app-result-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {

  @Input() businessData: BusinessEntry;

  title: string; // Card title text.
  category: string; // Card category text.
  country: string; // Card country text.
  city: string; // Card city text.
  imgPath: string; // Card preview image path.
  mail: string; // Email of current user

  loading = false;
  isFavorite = false; // Whether the result card has been marked as a favorite from the current user or not

  alertSubscription: Subscription;
  alertMessage: AlertMessage;

  constructor(public dialog: MatDialog, private userService: UserService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.loading = true;

    // Check favorite status and set the favorite flag accordingly
    this.isFavorite = JSON.parse(sessionStorage.getItem('currentUser')).favoriteBusiness.includes(this.businessData._id);

    this.alertSubscription = this.alertService.getMessage().subscribe(value => {
      if (value !== undefined) {
        this.alertMessage = {
          type: value.type,
          text: value.text
        };
      }
    });
    // Load data from businessData into the result card object's properties.
    this.title = this.businessData.name;

    // Change the "category" text to the appropriate format
    switch (this.businessData.category) {
      case 'gym':
        this.category = 'Gym';
        break;

      case 'personal trainer':
        this.category = 'Personal Trainer';
        break;

      case 'fitness shop':
        this.category = 'Fitness Shop';
        break;
    }

    this.country = this.businessData.country;
    this.city = this.businessData.city;
    this.imgPath = environment.apiUrl + '/uploads/' + this.businessData.imgPath;

    // Set the loading flag to false after a small delay
    setTimeout(function stopLoading() { this.loading = false; }.bind(this), 1000);
  }

  /**
   * Spawns the "Details" dialog window.
   */
  openDetailsDialog(): void {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '600px',
      data: {
        name: this.title,
        imgPath: this.imgPath,
        category: this.category,
        country: this.country,
        city: this.city,
        address: this.businessData.address,
        postalCode: this.businessData.postalCode,
        services: this.businessData.services,
        products: this.businessData.products,
        phoneNumber: this.businessData.phoneNumber,
        email: this.businessData.email
      }
    });
  }

  onFavoriteClick() {
    this.loading = true;

    const request = {
      user: {
        _id: JSON.parse(sessionStorage.getItem('currentUser'))._id
      },
      favorite_id: this.businessData._id
    };

    if (!this.isFavorite) {
      // The card is currently not selected as a user favorite, so the user requested an addition
      this.userService.addFavoriteBusiness(request).toPromise().then(

        data => {
          this.isFavorite = true;
        },

        error => {
          // If error is not a string received from the API, handle the ProgressEvent
          // returned due to the inability to connect to the API by printing an appropriate
          // warning message
          if (typeof(error) !== 'string') {
            this.alertService.error('Error: No connection to the API');
          } else {
            this.alertService.error(error);
          }
        });
    } else {
      // The card is currently selected as a user favorite, so the user requested a removal
      this.userService.removeFavoriteBusiness(request).toPromise().then(

        data => {
          this.isFavorite = false;
        },

        error => {
          // If error is not a string received from the API, handle the ProgressEvent
          // returned due to the inability to connect to the API by printing an appropriate
          // warning message
          if (typeof(error) !== 'string') {
            this.alertService.error('Error: No connection to the API');
          } else {
            this.alertService.error(error);
          }
        });
    }

    // Set the loading flag to false after a small delay
    setTimeout(function stopLoading() { this.loading = false; }.bind(this), 1000);
  }
}
