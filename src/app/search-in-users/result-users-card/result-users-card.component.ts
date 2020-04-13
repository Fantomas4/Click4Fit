import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UsersEntry} from '../../users-entry';
import {DetailsUserEditComponent} from '../../manage-users-entries/details-user-edit/details-user-edit.component';


@Component({
  selector: 'app-result-users-card',
  templateUrl: './result-users-card.component.html',
  styleUrls: ['./result-users-card.component.css']
})
export class ResultUsersCardComponent implements OnInit {

  @Input() usersData: UsersEntry;

  cardTitle: string;
  cardSubtitle: string;
  cardEmail: string;


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cardTitle = this.usersData.name;
    this.cardSubtitle = this.usersData.lastname;
    this.cardEmail = this.usersData.email;
  }

  openDetailsDialog1(): void {
    const dialogRef = this.dialog.open(DetailsUserEditComponent, {
      width: '600px',
      data: {
        name: this.usersData.name, lastname: this.usersData.lastname, email: this.usersData.email
      }

    });

  }

}
