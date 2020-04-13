import { Component, OnInit, ViewChild } from '@angular/core';
import {UsersEntry} from '../users-entry';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material/dialog';
import {DetailsUserEditComponent} from './details-user-edit/details-user-edit.component';
import {ManageUsersEntriesService} from './manage-users-entries.service';

@Component({
  selector: 'app-manage-users-entries',
  templateUrl: './manage-users-entries.component.html',
  styleUrls: ['./manage-users-entries.component.css']
})
export class ManageUsersEntriesComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selection1 = new SelectionModel<UsersEntry>(true, []);

  displayedColumns = ['checkboxes', 'id', 'name', 'last-name', 'birthdate', 'buttons'];

  userData: UsersEntry[];
  dataSource1 = new MatTableDataSource(this.userData);

  constructor(private ManageUserEntriesService: ManageUsersEntriesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsersEntries();
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      // Return to the first page if not already there
      this.dataSource1.paginator.firstPage();
    }
  }

  getUsersEntries() {

    this.ManageUserEntriesService.getResults1()
      .subscribe(results => {this.userData = results; this.dataSource1.data = this.userData; });
  }

  /** Checks whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection1.selected.length;
    const numRows = this.dataSource1.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clears selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection1.clear() :
      this.dataSource1.data.forEach(row => this.selection1.select(row));
  }

  openDetailsUserEdit(element: UsersEntry): void {
    const dialogRef = this.dialog.open(DetailsUserEditComponent, {
      width: '20vw',
      data: {id: element.id, name: element.name, lastname: element.lastname, birthdate: element.birthdate, email: element.email}
    });
  }

}

