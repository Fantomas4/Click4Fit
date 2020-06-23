import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ErrorStateMatcher} from '@angular/material/core';
import {WorkoutEntry} from '../../workout-entry';


export class GenericErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-details-edit-dialogue',
  templateUrl: './workout-details-edit-dialog.component.html',
  styleUrls: ['./workout-details-edit-dialog.component.css']
})

export class WorkoutDetailsEditDialogComponent implements OnInit {
  entryForm = new FormGroup( {
      name: new FormControl('', [
        Validators.required
      ]),
      category: new FormControl('', [
        Validators.required
      ]),
      muscleGroups: new FormControl('', [
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

  // Chip list options
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  muscleGroups: string[] = [];


  constructor(public dialogRef: MatDialogRef<WorkoutDetailsEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    // Extract the data from the payload and store it into the class properties
    this.entryForm.setValue({
      name: this.data.name,
      category: this.data.category,
      muscleGroups: '',
      sets: this.data.sets,
      videoUrl: this.data.videoUrl
    });
    this.id = this.data._id;
    this.muscleGroups = this.data.muscleGroups;
    this.advisedFor = this.data.advisedFor;
    this.difficulty = this.data.difficulty;
    this.equipment = (this.data.equipment ? 'yes' : 'no');
  }

  addMuscleGroupChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add muscleGroup
    if ((value || '').trim()) {
      this.muscleGroups.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.entryForm.get('muscleGroups').setValue(this.muscleGroups);
  }

  removeMuscleGroupChip(muscleGroup: string): void {
    const index = this.muscleGroups.indexOf(muscleGroup);

    if (index >= 0) {
      this.muscleGroups.splice(index, 1);
    }

    this.entryForm.get('muscleGroups').setValue(this.muscleGroups);
  }

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
      const content: WorkoutEntry  = {
        _id: this.id,
        name: this.entryForm.get('name').value,
        category: this.entryForm.get('category').value,
        muscleGroups: this.entryForm.get('muscleGroups').value,
        sets: this.entryForm.get('sets').value,
        videoUrl: this.entryForm.get('videoUrl').value,
        advisedFor: this.advisedFor,
        difficulty: this.difficulty,
        equipment: (this.equipment === 'true') // Convert string to boolean
      };
      this.dialogRef.close({clickedSave: true, details: content});
    }
  }
}
