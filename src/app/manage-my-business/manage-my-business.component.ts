import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { AlertService } from '../core/alert.service';
import { Subscription } from 'rxjs';
import {ManageMyBusinessService} from './manage-my-business.service';

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
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; // MatPaginator used to divide table data into multiple pages.
  @ViewChild(MatSort, {static: true}) sort: MatSort; // MatSort used to provide column data sorting functionality to the table.

  selection = new SelectionModel<TableEntry>(true, []);
  displayedColumns = ['checkboxes', 'name', 'category', 'buttons']; // Determines the columns to be displayed in the table's header row.

  businessData = []; // An array of BusinessEntry objects retrieved from the database.
  dataSource = new MatTableDataSource(this.businessData); // MatTableDataSource<BusinessEntry> used as the tab

  alertMessage: AlertMessage;
  alertSubscription: Subscription;

  constructor(private manageMyBusinessService: ManageMyBusinessService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.getMessage().subscribe(value => {
      if (value !== undefined) {
        this.alertMessage = {
          type: value.type,
          text: value.text
        };
      }
    });
    this.getMyBusinessEntries();
    this.dataSource.paginator = this.paginator; // Add the paginator object to the dataSource data that will be presented on the table.
    this.dataSource.sort = this.sort; // Add the sort object to the dataSource data that will be presented on the table.
  }

  getMyBusinessEntries() {
    this.manageMyBusinessService.getBusinesses(JSON.parse(sessionStorage.getItem('currentUser'))._id).toPromise().then(res => {
        this.businessData = res.body.data;
        this.dataSource.data = this.businessData;
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

}
