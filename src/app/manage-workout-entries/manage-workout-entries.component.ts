import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {AlertService} from '../core/alert.service';
import {ManageWorkoutEntriesService} from './manage-workout-entries.service';
import {WorkoutDetailsEditDialogComponent} from './workout-details-edit-dialog/workout-details-edit-dialog.component';
import {WorkoutAddEntryDialogComponent} from './workout-add-entry-dialog/workout-add-entry-dialog.component';
import {WorkoutEntry} from './workout-entry';


interface AlertMessage {
  type: string;
  text: string;
}

@Component({
  selector: 'app-manage-workout-entries',
  templateUrl: './manage-workout-entries.component.html',
  styleUrls: ['./manage-workout-entries.component.css']
})
export class ManageWorkoutEntriesComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; // MatPaginator used to divide table data into multiple pages.
  @ViewChild(MatSort, {static: true}) sort: MatSort; // MatSort used to provide column data sorting functionality to the table.

  selection = new SelectionModel<WorkoutEntry>(true, []);
  displayedColumns = ['checkboxes', 'name', 'category', 'buttons']; // Determines the columns to be displayed in the table's header row.

  workoutData = []; // An array of BusinessEntry objects retrieved from the database.
  dataSource = new MatTableDataSource(this.workoutData); // MatTableDataSource<BusinessEntry> used as the tab

  alertMessage: AlertMessage;
  alertSubscription: Subscription;

  dialogHeight: number; // Height of the dialog window.
  dialogWidth: number; // Width of the dialog window.
  dialogHeightRatio = 0.9; // Determines the dialog box height relevant to the screen size.
  dialogMinWidth = 250; // Defines the maximum width of the dialog window (px).
  dialogMaxWidth = 310; // Defines the maximum width of the dialog window (px).

  detailsEditDialogRef: MatDialogRef<WorkoutDetailsEditDialogComponent>; // Reference to the spawned "Details/Edit" dialog window.
  addEntryDialogRef: MatDialogRef<WorkoutAddEntryDialogComponent>; // Reference to the spawned "Add Entry" dialog window.


  constructor(private manageWorkoutEntriesService: ManageWorkoutEntriesService, public dialog: MatDialog,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.getMessage().subscribe(value => {
      if (value !== undefined) {
        this.alertMessage = {
          type: value.type,
          text: value.text
        };
      }
    });
    this.getWorkoutEntries();
    this.dataSource.paginator = this.paginator; // Add the paginator object to the dataSource data that will be presented on the table.
    this.dataSource.sort = this.sort; // Add the sort object to the dataSource data that will be presented on the table.
  }

  getWorkoutEntries() {
    this.manageWorkoutEntriesService.getWorkouts().toPromise().then(res => {
        this.workoutData = res.body.data;
        this.dataSource.data = this.workoutData;
      },
      error => {
        this.alertService.error(error.errror);
      });
  }

  /**
   * Method called when a key is pressed inside the Filter input field of the UI.
   * @param event: The entire event payload passed to the applyFilter event handler.
   */
  applyFilter(event: Event) {
    // Get the filter value given by the user and apply it
    // to the dataSource data in order to filter them.
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      // Return to the first page if not already there.
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** Method used to change the dialog's height and width according to
   * the window's size.
   *
   * The method is also bound to a HostListener that captures
   * "window:resize" events triggered during display window resize.
   */
  @HostListener('window:resize')
  onResize() {
    console.log('window height: ', window.innerHeight);
    console.log('window width: ', window.innerWidth);
    this.dialogHeight = window.innerHeight * this.dialogHeightRatio;
    this.dialogWidth = window.innerWidth;

    if (typeof this.detailsEditDialogRef !== 'undefined') {
      this.detailsEditDialogRef.updateSize(this.dialogWidth.toString(), this.dialogHeight.toString());
    }

    if (typeof this.addEntryDialogRef !== 'undefined') {
      this.addEntryDialogRef.updateSize(this.dialogWidth.toString(), this.dialogHeight.toString());
    }
  }

  /** Spawns the "Details/Edit" dialog window */
  openDetailsEditDialog(element: any): void {
    this.onResize(); // Call onResize() to update this.dialogWidth and this.dialogHeight with the display window's current dimensions.
    this.detailsEditDialogRef = this.dialog.open(WorkoutDetailsEditDialogComponent, {
      width: this.dialogWidth.toString().concat('px'), height: this.dialogHeight.toString().concat('px'), minWidth: this.dialogMinWidth,
      maxWidth: this.dialogMaxWidth, data: element});

    this.detailsEditDialogRef.afterClosed().subscribe(dialogRes => {
      if (dialogRes && dialogRes.clickedSave) {
        const formData = new FormData();
        formData.append('_id', dialogRes.details._id);
        formData.append('name', dialogRes.details.name);
        formData.append('category', dialogRes.details.category);
        formData.append('muscleGroups', dialogRes.details.muscleGroups);
        formData.append('sets', dialogRes.details.sets);
        formData.append('videoUrl', dialogRes.details.videoUrl);
        formData.append('advisedFor', dialogRes.details.advisedFor);
        formData.append('difficulty', dialogRes.details.difficulty);
        formData.append('equipment', dialogRes.details.equipment);

        this.manageWorkoutEntriesService.updateEntry(formData).toPromise().then(data => {
            this.alertService.success('Data updated successfully');
          },
          error => {
            this.alertService.error(error);
          });
      }
    });
  }

  /** Spawns the "Add Entry" dialog window */
  openAddEntryDialog() {
    this.onResize();
    this.addEntryDialogRef = this.dialog.open(WorkoutAddEntryDialogComponent, {
      width: this.dialogWidth.toString().concat('px'), height: this.dialogHeight.toString().concat('px'), minWidth: this.dialogMinWidth,
      maxWidth: this.dialogMaxWidth
    });
    this.addEntryDialogRef.afterClosed().subscribe(dialogRes => {
      if (dialogRes && dialogRes.clickedSave) {
        const formData = new FormData();
        formData.append('_id', dialogRes.details._id);
        formData.append('name', dialogRes.details.name);
        formData.append('category', dialogRes.details.category);
        formData.append('muscleGroups', dialogRes.details.muscleGroups);
        formData.append('sets', dialogRes.details.sets);
        formData.append('videoUrl', dialogRes.details.videoUrl);
        formData.append('advisedFor', dialogRes.details.advisedFor);
        formData.append('difficulty', dialogRes.details.difficulty);
        formData.append('equipment', dialogRes.details.equipment);

        formData.forEach((value, key) => {
          console.log(key + ' ' + value);
        });

        this.manageWorkoutEntriesService.addEntry(formData).toPromise().then(data => {
            this.getWorkoutEntries();
            this.alertService.success('Entry added successfully');
          },
          error => {
            this.alertService.error(error);
          });
      }
    });
  }

  /** Click on delete button */
  deleteEntries() {
    const selectedIds = [];
    this.selection.selected.forEach(entry =>
      selectedIds.push(entry._id)
    );

    this.manageWorkoutEntriesService.deleteEntries(selectedIds).toPromise().then(
      data => {
        this.getWorkoutEntries();
        this.alertService.success('Data loaded successfully');
      },

      error => {
        this.alertService.error(error);
      });
  }
}
