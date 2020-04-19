import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {UserEntry} from '../user-entry';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserDetailsEditDialogComponent} from './user-details-edit-dialog/user-details-edit-dialog.component';
import {ManageUserEntriesService} from './manage-user-entries.service';
import {DetailsEditDialogComponent} from '../manage-business-entries/details-edit-dialog/details-edit-dialog.component';

@Component({
  selector: 'app-manage-users-entries',
  templateUrl: './manage-user-entries.component.html',
  styleUrls: ['./manage-user-entries.component.css']
})
export class ManageUserEntriesComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selection1 = new SelectionModel<UserEntry>(true, []);

  displayedColumns = ['checkboxes', 'id', 'name', 'last-name', 'buttons'];

  userData: UserEntry[];
  dataSource = new MatTableDataSource(this.userData);

  dialogHeight: number;
  dialogWidth: number;
  dialogHeightRatio = 0.9; // Determines the dialog box height relevant to the screen size

  detailsEditDialogRef: MatDialogRef<DetailsEditDialogComponent, any>;

  constructor(private manageUserEntriesService: ManageUserEntriesService, public dialog: MatDialog) { }

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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      // Return to the first page if not already there
      this.dataSource.paginator.firstPage();
    }
  }

  getUsersEntries() {

    this.manageUserEntriesService.getResults()
      .subscribe(results => {this.userData = results; this.dataSource.data = this.userData; });
  }

  /** Checks whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection1.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clears selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection1.clear() :
      this.dataSource.data.forEach(row => this.selection1.select(row));
  }

  openDetailsEditDialog(element: UserEntry): void {
    this.onResize();
    const dialogRef = this.dialog.open(UserDetailsEditDialogComponent, {
      width: this.dialogWidth.toString().concat('px'), height: this.dialogHeight.toString().concat('px'),
      data: {id: element.id, name: element.name, lastname: element.lastname, birthdate: element.birthdate, email: element.email}
    });
  }

}

