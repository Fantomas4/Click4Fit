import { Component, OnInit, ViewChild } from '@angular/core';
import {UserEntry} from '../user-entry';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material/dialog';
import {UserDetailsEditDialogComponent} from './user-details-edit-dialog/user-details-edit-dialog.component';
import {ManageUserEntriesService} from './manage-user-entries.service';

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

  constructor(private manageUserEntriesService: ManageUserEntriesService, public dialog: MatDialog) { }

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
    const dialogRef = this.dialog.open(UserDetailsEditDialogComponent, {
      width: '20vw',
      data: {id: element.id, name: element.name, lastname: element.lastname, birthdate: element.birthdate, email: element.email}
    });
  }

}

