import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog-message',
  templateUrl: './delete-dialog-message.component.html',
  styleUrls: ['./delete-dialog-message.component.css']
})
export class DeleteDialogMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }
}

