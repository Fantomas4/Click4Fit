import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DeleteDialogMessageService} from './delete-dialog-message.service';

@Component({
  selector: 'app-delete-dialog-message',
  templateUrl: './delete-dialog-message.component.html',
  styleUrls: ['./delete-dialog-message.component.css']
})
export class DeleteDialogMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private deleteService:DeleteDialogMessageService) {}

  content;
  message;
  ngOnInit(): void {
    this.content=this.data
  }
  deleteProfile(){
    this.deleteService.postProfile(this.content).toPromise().then((data:any)=>
    {
      if (data.response==200){
        //allert service 
        console.log('okey');
      }
      else{
        console.log(data.msg);
        //alert service
      }
    })
  }
  passAlert(){
    return this.message;
  }
}

