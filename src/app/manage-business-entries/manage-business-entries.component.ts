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

  businessData=[]; // An array of BusinessEntry objects retrieved from the database.
  dataSource = new MatTableDataSource(this.businessData); // MatTableDataSource<BusinessEntry> used as the table's data source.

  dialogHeight: number; // Height of the dialog window.
  dialogWidth: number; // Width of the dialog window.
  dialogHeightRatio = 0.9; // Determines the dialog box height relevant to the screen size.

  detailsEditDialogRef: MatDialogRef<BusinessDetailsEditDialogComponent, any>; // Reference to the spawned "Details/Edit" dialog window.
  addEntryDialogRef: MatDialogRef<BusinessAddEntryDialogComponent, any>; // Reference to the spawned "Add Entry" dialog window.

  selected=[]; //List with selected checkboxes alertMessage: AlertMessage;
  alertMessage: AlertMessage;
  alertSubscription: Subscription;
  result:boolean;
  i:number;
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
   * The method receives
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
      this.manageBusinessEntriesService.getResults().toPromise().then(data =>{
        this.businessData=data.businessList;
        this.dataSource.data=this.businessData;
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
      width: this.dialogWidth.toString().concat('px'), height: this.dialogHeight.toString().concat('px'),
      data: {_id: element._id, name: element.name, category: element.category, country: element.country,
      city: element.city, address: element.address, postalCode: element.postalCode, phoneNumber:
      element.phoneNumber, email: element.email, services: element.services, products: element.products,
      imgPath: element.imgPath}
    });
    this.detailsEditDialogRef.afterClosed().subscribe(result=>{
      this.result = result.save;
      if (this.result == true) {
        this.manageBusinessEntriesService.updateEntry(result.details).toPromise().then(data => {
          this.getBusinessEntries();
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

  /** Spawns the "Add Entry" dialog window */
  openAddEntryDialog() {
    this.onResize();
    this.addEntryDialogRef = this.dialog.open(BusinessAddEntryDialogComponent, {
      width: this.dialogWidth.toString().concat('px'), height: this.dialogHeight.toString().concat('px')});
      this.addEntryDialogRef.afterClosed().subscribe(result=>{
        this.result = result.save;
        if (this.result == true) {
          this.manageBusinessEntriesService.addEntry(result.details).toPromise().then(data => {
            this.getBusinessEntries();
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

  /** Click on delete button */
  deleteEntries(){
    this.selected=this.selection.selected;
    for (this.i=0;this.i<this.selection.selected.length;this.i++){
      this.selected[this.i]=this.selection.selected[this.i].email;
    }
    this.content={"email":this.selected};
    this.manageBusinessEntriesService.deleteEntries(this.content).toPromise().then(data =>
    {
      this.getBusinessEntries();
      this.dataSource.paginator = this.paginator; 
      this.dataSource.sort = this.sort;
      this.alertService.success(data);
      this.alertService.success(data);
    },
    error => {
      this.alertService.error(error.errror);
    });
  }
}
