import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {ErrorStateMatcher} from '@angular/material/core';
import {WorkoutEntry} from '../../workout-entry';


export class GenericErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-add-entry-dialog',
  templateUrl: './workout-add-entry-dialog.component.html',
  styleUrls: ['./workout-add-entry-dialog.component.css']
})
export class WorkoutAddEntryDialogComponent implements OnInit {
  entryForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      category: new FormControl('', [
        Validators.required
      ]),
      sets: new FormControl('', [
        Validators.required,
      ]),
      videoUrl: new FormControl('', [
        Validators.required,
      ]),
    },
  );

  genericErrorStateMatcher = new GenericErrorStateMatcher();

  id: string; // The displayed entry's id.
  advisedFor = 'both'; // The gender that the exercise is advised for.
  difficulty = 'easy'; // The difficulty level of the exercise.
  equipment = 'no'; // Whether the exercise requires equipment or not.

  clickedSave: boolean;

  workoutCategories: {
    name: string;
    value: string;
  }[] = [
    {
      name: 'Legs',
      value: 'legs'
    },
    {
      name: 'Back',
      value: 'back'
    },
    {
      name: 'Chest',
      value: 'chest'
    },
    {
      name: 'Shoulders',
      value: 'shoulders'
    },
    {
      name: 'Biceps',
      value: 'biceps'
    },
    {
      name: 'Triceps',
      value: 'triceps'
    },
    {
      name: 'Abs',
      value: 'abs'
    },
    {
      name: 'Core',
      value: 'core'
    },
  ];


  constructor(public dialogRef: MatDialogRef<WorkoutAddEntryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {}

  /**
   * Called to close (discard) the "Edit/Details" dialog window.
   */
  onDiscardClick(): void {
    // method is called when the "Close" button is pressed
    this.dialogRef.close({clickedSave: false});
  }

  onSaveClick(): void {
    if (this.entryForm.valid) {
      // Use WorkoutEntry interface to properly format the data
      const content: WorkoutEntry = {
        _id: this.id,
        name: this.entryForm.get('name').value,
        category: this.entryForm.get('category').value,
        sets: this.entryForm.get('sets').value,
        videoUrl: this.entryForm.get('videoUrl').value,
        advisedFor: this.advisedFor,
        difficulty: this.difficulty,
        equipment: (this.equipment === 'true') // Convert string to boolean
      };
      console.log(content);
      this.dialogRef.close({clickedSave: true, details: content});
    }
  }
}
