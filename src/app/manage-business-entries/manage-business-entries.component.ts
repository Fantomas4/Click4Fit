import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BusinessDetailsEditDialogComponent} from './business-details-edit-dialog/business-details-edit-dialog.component';
import {BusinessAddEntryDialogComponent} from './business-add-entry-dialog/business-add-entry-dialog.component';
import {ManageBusinessEntriesService} from './manage-business-entries.service';
import { AlertService } from '../core/alert.service';
import { Subscription } from 'rxjs';
import {Router, NavigationEnd} from '@angular/router';

interface AlertMessage {
  type: string;
  text: string;
}

@Component({
  selector: 'app-manage-business-entries',
  templateUrl: './manage-business-entries.component.html',
  styleUrls: ['./manage-business-entries.component.css']
})

export class ManageBusinessEntriesComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; // MatPaginator used to divide table data into multiple pages.
  @ViewChild(MatSort, {static: true}) sort: MatSort; // MatSort used to provide column data sorting functionality to the table.

  // Holds a SelectionModel<BusinessEntry> object used to get the table checkboxes' state.
  selection = new SelectionModel<any>(true, []);

  // Determines the columns to be displayed in the table's header row.
  displayedColumns = ['checkboxes', 'name', 'category', 'buttons'];

  businessData = []; // An array of BusinessEntry objects retrieved from the database.
  dataSource = new MatTableDataSource(this.businessData); // MatTableDataSource<BusinessEntry> used as the table's data source.

  dialogHeight: number; // Height of the dialog window.
  dialogWidth: number; // Width of the dialog window.
  dialogHeightRatio = 0.9; // Determines the dialog box height relevant to the screen size.
  dialogMinWidth = 250; // Defines the maximum width of the dialog window (px).
  dialogMaxWidth = 310; // Defines the maximum width of the dialog window (px).

  detailsEditDialogRef: MatDialogRef<BusinessDetailsEditDialogComponent, any>; // Reference to the spawned "Details/Edit" dialog window.
  addEntryDialogRef: MatDialogRef<BusinessAddEntryDialogComponent, any>; // Reference to the spawned "Add Entry" dialog window.

  selected = []; // List with selected checkboxes alertMessage: AlertMessage;
  alertMessage: AlertMessage;
  alertSubscription: Subscription;
  result: boolean;
  i: number;
  content;
  mySubscription;
  

  constructor(private manageBusinessEntriesService: ManageBusinessEntriesService, public dialog: MatDialog,
    private alertService: AlertService, private router:Router) {
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

  ngOnInit(): void {
    this.alertSubscription = this.alertService.getMessage().subscribe(value => {
      if (value !== undefined) {
        this.alertMessage = {
          type: value.type,
          text: value.text
        };
      }
    });
    this.getBusinessEntries();
    this.dataSource.paginator = this.paginator; // Add the paginator object to the dataSource data that will be presented on the table.
    this.dataSource.sort = this.sort; // Add the sort object to the dataSource data that will be presented on the table.
  }
  ngOnDestroy(){
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
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

  /**
   * Gets all retrieved business entries fetched from the database by
   * the manageBusinessEntriesService.
   */
  getBusinessEntries() {

    /*this.manageBusinessEntriesService.getResults()
      .subscribe(results => {this.businessData = results; this.dataSource.data = this.businessData; });*/
      this.manageBusinessEntriesService.getBusinesses().toPromise().then(data => {
        this.businessData = data.businessList;
        this.dataSource.data = this.businessData;
      },
      error => {
        this.alertService.error(error.errror);
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
    this.onResize(); // Call onResize() to update this.dialogWidth and this.dialogHeight with the display window's current dimensions.
    this.detailsEditDialogRef = this.dialog.open(BusinessDetailsEditDialogComponent, {
      width: this.dialogWidth.toString().concat('px'), height: this.dialogHeight.toString().concat('px'), minWidth: this.dialogMinWidth,
      maxWidth: this.dialogMaxWidth,
      data: {
        _id: element._id, name: element.name, category: element.category, country: element.country,
        city: element.city, address: element.address, postalCode: element.postalCode, phoneNumber:
        element.phoneNumber, email: element.email, services: element.services, products: element.products,
        imgPath: element.imgPath
      }
    });
    this.detailsEditDialogRef.afterClosed().subscribe(dialogRes => {
      if (dialogRes && dialogRes.clickedSave) {
        const formData = new FormData();
        formData.append('_id', dialogRes.details._id);
        formData.append('name', dialogRes.details.name);
        formData.append('category', dialogRes.details.category);
        formData.append('country', dialogRes.details.country);
        formData.append('city', dialogRes.details.city);
        formData.append('address', dialogRes.details.address);
        formData.append('postalCode', dialogRes.details.postalCode);
        formData.append('phoneNumber', dialogRes.details.phoneNumber);
        formData.append('services', dialogRes.details.services);
        formData.append('products', dialogRes.details.products);
        formData.append('file', dialogRes.details.file);
        formData.append('imgPath', dialogRes.details.imgPath);
        formData.append('email', dialogRes.details.email);
        this.manageBusinessEntriesService.updateEntry(formData).toPromise().then(data => {
            this.getBusinessEntries();
            this.alertService.success('Entry updated successfully');
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
    this.addEntryDialogRef = this.dialog.open(BusinessAddEntryDialogComponent, {
      width: this.dialogWidth.toString().concat('px'), height: this.dialogHeight.toString().concat('px'), minWidth: this.dialogMinWidth,
      maxWidth: this.dialogMaxWidth
    });
    this.addEntryDialogRef.afterClosed().subscribe(dialogRes => {
      if (dialogRes && dialogRes.clickedSave) {
        const formData = new FormData();
        formData.append('ownerId', dialogRes.details.ownerId);
        formData.append('name', dialogRes.details.name);
        formData.append('category', dialogRes.details.category);
        formData.append('country', dialogRes.details.country);
        formData.append('city', dialogRes.details.city);
        formData.append('address', dialogRes.details.address);
        formData.append('postalCode', dialogRes.details.postalCode);
        formData.append('phoneNumber', dialogRes.details.phoneNumber);
        formData.append('services', dialogRes.details.services);
        formData.append('products', dialogRes.details.products);
        formData.append('file', dialogRes.details.file);
        formData.append('email', dialogRes.details.email);
        this.manageBusinessEntriesService.addEntry(formData).toPromise().then(data => {
            this.getBusinessEntries();
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

    this.manageBusinessEntriesService.deleteEntries(selectedIds).toPromise().then(
      data => {
        this.getBusinessEntries();
        this.alertService.success('Data loaded successfully');
      },

      error => {
        this.alertService.error(error.error);
      });
  }
}
