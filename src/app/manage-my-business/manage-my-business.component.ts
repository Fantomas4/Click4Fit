import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { AlertService } from '../core/alert.service';
import { Subscription } from 'rxjs';
import {ManageMyBusinessService} from './manage-my-business.service';
import {MyBusinessDetailsEditDialogComponent} from './my-business-details-edit-dialog/my-business-details-edit-dialog.component';
import {MyBusinessAddEntryDialogComponent} from './my-business-add-entry-dialog/my-business-add-entry-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BusinessEntry} from '../business-entry';

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

  selection = new SelectionModel<BusinessEntry>(true, []);
  displayedColumns = ['checkboxes', 'name', 'category', 'buttons']; // Determines the columns to be displayed in the table's header row.

  businessData = []; // An array of BusinessEntry objects retrieved from the database.
  dataSource = new MatTableDataSource(this.businessData); // MatTableDataSource<BusinessEntry> used as the tab

  alertMessage: AlertMessage;
  alertSubscription: Subscription;

  dialogHeight: number; // Height of the dialog window.
  dialogWidth: number; // Width of the dialog window.
  dialogHeightRatio = 0.9; // Determines the dialog box height relevant to the screen size.

  detailsEditDialogRef: MatDialogRef<MyBusinessDetailsEditDialogComponent, any>; // Reference to the spawned "Details/Edit" dialog window.
  addEntryDialogRef: MatDialogRef<MyBusinessAddEntryDialogComponent, any>; // Reference to the spawned "Add Entry" dialog window.

  constructor(private manageMyBusinessService: ManageMyBusinessService, private alertService: AlertService, public dialog: MatDialog) {
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

  /** Method used to change the dialog's height and width according to
   * the window's size.
   *
   * The method is also bound to a HostListener that captures
   * "window:resize" events triggered during display window resize.
   */
  @HostListener('window:resize')
  onResize() {
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
    this.detailsEditDialogRef = this.dialog.open(MyBusinessDetailsEditDialogComponent, {
      width: this.dialogWidth.toString().concat('px'), height: this.dialogHeight.toString().concat('px'),
      data: {
        _id: element._id, name: element.name, category: element.category, country: element.country,
        city: element.city, address: element.address, postalCode: element.postalCode, phoneNumber:
        element.phoneNumber, email: element.email, services: element.services, products: element.products,
        imgPath: element.imgPath
      }
    });
    this.detailsEditDialogRef.afterClosed().subscribe(dialogRes => {
      if (dialogRes.clickedSave) {
        this.manageMyBusinessService.updateEntry(dialogRes.details).toPromise().then(data => {
            this.alertService.success(data);
          },
          error => {
            this.alertService.error(error.error);
          });
      }
    });
  }


  /** Spawns the "Add Entry" dialog window */
  openAddEntryDialog() {
    this.onResize();
    this.addEntryDialogRef = this.dialog.open(MyBusinessAddEntryDialogComponent, {
      width: this.dialogWidth.toString().concat('px'), height: this.dialogHeight.toString().concat('px')
    });
    this.addEntryDialogRef.afterClosed().subscribe(dialogRes => {
      if (dialogRes.clickedSave) {
        this.manageMyBusinessService.addEntry(dialogRes.details).toPromise().then(data => {
            this.getMyBusinessEntries();
            this.alertService.success('Entry added successfully');
          },
          error => {
            this.alertService.error(error.error);
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

    this.manageMyBusinessService.deleteEntries(selectedIds).toPromise().then(
      data => {
        this.getMyBusinessEntries();
        this.alertService.success('Data loaded successfully');
      },

      error => {
        this.alertService.error(error);
      });
  }
}
