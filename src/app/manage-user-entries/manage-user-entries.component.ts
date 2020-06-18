import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserDetailsEditDialogComponent} from './user-details-edit-dialog/user-details-edit-dialog.component';
import {ManageUserEntriesService} from './manage-user-entries.service';
import { AlertService } from '../core/alert.service';
import { Subscription } from 'rxjs';

interface AlertMessage {
  type: string;
  text: string;
}

@Component({
  selector: 'app-manage-users-entries',
  templateUrl: './manage-user-entries.component.html',
  styleUrls: ['./manage-user-entries.component.css']
})
export class ManageUserEntriesComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; // MatPaginator used to divide table data into multiple pages.
  @ViewChild(MatSort, {static: true}) sort: MatSort; // MatSort used to provide column data sorting functionality to the table.

  // Holds a SelectionModel<UserEntry> object used to get the table checkboxes' state.
  selection = new SelectionModel<any>(true, []);

  // Determines the columns to be displayed in the table's header row.
  displayedColumns = ['checkboxes', 'name', 'last-name', 'buttons'];

  userData=[]; // An array of UserEntry objects retrieved from the database.
  dataSource = new MatTableDataSource(this.userData); // MatTableDataSource<UserEntry> used as the table's data source.

  dialogHeight: number; // Height of the dialog window.
  dialogWidth: number; // Width of the dialog window.
  dialogHeightRatio = 0.9; // Determines the dialog box height relevant to the screen size

  detailsEditDialogRef: MatDialogRef<UserDetailsEditDialogComponent, any>; // Reference to the spawned "Details/Edit" dialog window.
  selected = []; //List with selected checkboxes
  alertMessage: AlertMessage;
  alertSubscription: Subscription;
  result:boolean;
  content;
  i:number;

  constructor(private manageUserEntriesService: ManageUserEntriesService, public dialog: MatDialog,
    private alertService: AlertService) { }

  /** Method used to change the dialog's height and width according to
   * the window's size.
   *
   * The method is also bound to a HostListener that captures
   * "window:resize" events triggered during display window resize.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (typeof event !== 'undefined') {
      this.dialogHeight = window.innerHeight * this.dialogHeightRatio;
      this.dialogWidth = window.innerWidth;
    } else {
      this.dialogHeight = window.innerHeight * this.dialogHeightRatio;
      this.dialogWidth = window.innerWidth;
    }

    if (typeof this.detailsEditDialogRef !== 'undefined') {
      this.detailsEditDialogRef.updateSize(this.dialogWidth.toString(), this.dialogHeight.toString());
    }

    console.log('onresize height is: ' + this.dialogHeight);
  }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.getMessage().subscribe(value => {
      if (value !== undefined) {
        this.alertMessage = {
          type: value.type,
          text: value.text
        };
      }
    });
    this.getUsersEntries();
    this.dataSource.paginator = this.paginator; // Add the paginator object to the dataSource data that will be presented on the table.
    this.dataSource.sort = this.sort; // Add the sort object to the dataSource data that will be presented on the table.
  }

  /**
   * Method called when a key is pressed inside the Filter input field of the UI.
   * The method receives
   * @param event: The entire event payload passed to the applyFilter event handler.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      // Return to the first page if not already there
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Gets all retrieved user entries fetched from the database by
   * the manageUserEntriesService.
   */
  getUsersEntries() {

    /*this.manageUserEntriesService.getResults()
      .subscribe(results => {this.userData = results; this.dataSource.data = this.userData; });*/
      this.manageUserEntriesService.getResults().toPromise().then(data =>{
          this.userData=data.userList;
          this.dataSource.data=this.userData;
      },
      error => {
        // If error is not a string received from the API, handle the ProgressEvent
        // returned due to the inability to connect to the API by printing an appropriate
        // warning message
        if (typeof(error) !== 'string') {
          this.alertService.error('Error: No connection to the API');
        } else {
          this.alertService.error(error);
        }
      });
  }

  /** Checks whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clears selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** Spawns the "Details/Edit" dialog window */
  openDetailsEditDialog(element: any): void {
    this.onResize();
    this.detailsEditDialogRef = this.dialog.open(UserDetailsEditDialogComponent, {
      width: this.dialogWidth.toString().concat('px'), height: this.dialogHeight.toString().concat('px'),
      data: {_id: element._id, name: element.name, surname: element.surname, birthdate: element.birthdate, email: element.email}
    });
    this.detailsEditDialogRef.afterClosed().subscribe(result=>{
      this.result = result.save;
      if (this.result == true) {
        this.manageUserEntriesService.updateEntry(result.details).toPromise().then(data => {
          this.getUsersEntries();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.alertService.success(data);
        },
          error => {
            this.alertService.error(error.error);
          })
      }
    })
  }
  deleteEntries(){
    this.selected=this.selection.selected;
    for (this.i=0;this.i<this.selection.selected.length;this.i++){
      this.selected[this.i]=this.selection.selected[this.i].email;
    }
    this.content={"email":this.selected};
    this.manageUserEntriesService.deleteEntries(this.content).toPromise().then(data=>
    {
      this.getUsersEntries();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.alertService.success(data);
    },
    error => {
      // If error is not a string received from the API, handle the ProgressEvent
      // returned due to the inability to connect to the API by printing an appropriate
      // warning message
      if (typeof(error) !== 'string') {
        this.alertService.error('Error: No connection to the API');
      } else {
        this.alertService.error(error);
      }
    });
  }
}

