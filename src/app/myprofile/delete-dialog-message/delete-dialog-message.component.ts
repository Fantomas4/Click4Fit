import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DeleteDialogMessageService} from './delete-dialog-message.service';

@Component({
  selector: 'app-delete-dialog-message',
  templateUrl: './delete-dialog-message.component.html',
  styleUrls: ['./delete-dialog-message.component.css']
})
export class DeleteDialogMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private deleteService:DeleteDialogMessageService) {}

  email:string;
  ngOnInit(): void {
    this.email=this.data;
  }
  deleteProfile(){
    this.deleteService.postProfile(this.email).toPromise().then((data:any)=>
    {
      if (data.response==200){

      }
      else{

      }
    })
  }
}

