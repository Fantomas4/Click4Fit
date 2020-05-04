import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-contactus-dialog-message',
  templateUrl: './contactus-dialog-message.component.html',
  styleUrls: ['./contactus-dialog-message.component.css']
})
export class ContactUsDialogMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
