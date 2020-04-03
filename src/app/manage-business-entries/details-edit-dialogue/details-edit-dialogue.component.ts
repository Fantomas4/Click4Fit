import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../search/details-dialog/dialog-data';

@Component({
  selector: 'app-details-edit-dialogue',
  templateUrl: './details-edit-dialogue.component.html',
  styleUrls: ['./details-edit-dialogue.component.css']
})
export class DetailsEditDialogueComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DetailsEditDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }

}
