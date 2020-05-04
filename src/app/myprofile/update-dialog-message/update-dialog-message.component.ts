import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-dialog-message',
  templateUrl: './update-dialog-message.component.html',
  styleUrls: ['./update-dialog-message.component.css']
})
export class UpdateDialogMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
