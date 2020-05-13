import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {UserEntry} from '../user-entry';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserDetailsEditDialogComponent} from './user-details-edit-dialog/user-details-edit-dialog.component';
import {ManageUserEntriesService} from './manage-user-entries.service';

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
  constructor(private manageUserEntriesService: ManageUserEntriesService, public dialog: MatDialog) { }

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
      this.manageUserEntriesService.getResults().toPromise().then((data:any)=>{
        if (data.response==200){
          this.userData=data.users;
          this.dataSource.data=this.userData;
        }
      })
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
  }

  deleteEntries(){
    this.selected=this.selection.selected;
    this.manageUserEntriesService.deleteEntries(this.selected).toPromise().then((data:any)=>
    {
      if (data.response==200){
        //show message everything is okey
      }
      else{
        //show message for error
      }
    });
  }
}

