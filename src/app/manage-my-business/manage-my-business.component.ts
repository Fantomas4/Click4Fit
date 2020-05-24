import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AlertService } from '../core/alert.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';

interface TableEntry {
  name: string;
  category: string;
}

interface AlertMessage {
  type: string;
  text: string;
}

@Component({
  selector: 'app-manage-my-business',
  templateUrl: './manage-my-business.component.html',
  styleUrls: ['./manage-my-business.component.css']
})
export class ManageMyBusinessComponent implements OnInit {

  selection = new SelectionModel<TableEntry>(true, []);
  displayedColumns = ['checkboxes', 'name', 'category', 'buttons']; // Determines the columns to be displayed in the table's header row.

  businessData = []; // An array of BusinessEntry objects retrieved from the database.
  dataSource = new MatTableDataSource(this.businessData); // MatTableDataSource<BusinessEntry> used as the tab

  constructor() { }

  ngOnInit(): void {}

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

}
