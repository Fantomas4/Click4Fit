import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recover-dialog-message',
  templateUrl: './recover-dialog-message.component.html',
  styleUrls: ['./recover-dialog-message.component.css']
})
export class RecoverDialogMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
