import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DetailsDialogComponent} from '../details-dialog/details-dialog.component';
import {BusinessEntry} from '../../business-entry';
import {ResultCardService} from './result-card.service';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs';
import {AlertMessage} from '../../core/alert-message';
import {AlertService} from '../../core/alert.service';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css']
})
export class ResultCardComponent implements OnInit {

  @Input() businessData: BusinessEntry;

  title: string; // Card title text.
  category: string; // Card category text.
  country: string; // Card country text.
  city: string; // Card city text.
  imgPath: string; // Card preview image path.
  mail: string; // Email of current user

  favorite = false; // Whether the result card has been marked as a favorite from the current user or not

  alertSubscription: Subscription;
  alertMessage: AlertMessage;

  constructor(public dialog: MatDialog, private resultCardService: ResultCardService, private alertService: AlertService) {
  }

  ngOnInit(): void {
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

    // console.log(JSON.parse(sessionStorage.getItem('currentUser')));
    this.favorite = JSON.parse(sessionStorage.getItem('currentUser')).favoriteBusiness.includes(this.businessData._id);

    this.country = this.businessData.country;
    this.city = this.businessData.city;
    this.imgPath = environment.apiUrl + '/uploads/' + this.businessData.imgPath;
  }

  /**
   * Called when a user adds or removes favorites from his preferences, in order to update
   * the local storage user data with the latest input from the Data Base.
   */
  updateUserData() {
    const request = {_id: JSON.parse(sessionStorage.getItem('currentUser'))._id};
    this.resultCardService.updateUser(request).toPromise().then(
      data => {
        sessionStorage.setItem('currentUser', JSON.stringify(data));
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
        services: this.businessData.services,
        products: this.businessData.products
      }
    });
  }

  onFavoriteClick() {
    const request = {
      user: {
        _id: JSON.parse(sessionStorage.getItem('currentUser'))._id
      },
      favorite_id: this.businessData._id
    };

    if (!this.favorite) {
      // The card is currently not selected as a user favorite, so the user requested an addition
      this.resultCardService.addFavoriteBusiness(request).toPromise().then(

        data => {
          this.favorite = true;
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
      this.resultCardService.removeFavoriteBusiness(request).toPromise().then(

        data => {
          this.favorite = false;
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
    // Update logged in user's data after adding or removing favorites.
    this.updateUserData();
  }
}
