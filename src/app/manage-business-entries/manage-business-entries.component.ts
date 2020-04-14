import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {BusinessEntry} from '../business-entry';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {DetailsEditDialogComponent} from './details-edit-dialog/details-edit-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddEntryDialogComponent} from './add-entry-dialog/add-entry-dialog.component';
import {ManageBusinessEntriesService} from './manage-business-entries.service';


@Component({
  selector: 'app-manage-business-entries',
  templateUrl: './manage-business-entries.component.html',
  styleUrls: ['./manage-business-entries.component.css']
})
export class ManageBusinessEntriesComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selection = new SelectionModel<BusinessEntry>(true, []);

  displayedColumns = ['checkboxes', 'id', 'name', 'category', 'buttons'];

  businessData: BusinessEntry[];
  dataSource = new MatTableDataSource(this.businessData);

  dialogHeight: number;
  dialogWidth: number;
  dialogHeightRatio = 0.9; // Determines the dialog box height relevant to the screen size

  detailsEditDialogRef: MatDialogRef<DetailsEditDialogComponent, any>;
  addEntryDialogRef: MatDialogRef<AddEntryDialogComponent, any>;

  constructor(private manageBusinessEntriesService: ManageBusinessEntriesService, public dialog: MatDialog) {}

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (typeof event !== 'undefined') {
      console.log('mpika 1');
      // event.target.dialogHeight = window.innerHeight * this.dialogHeightRatio;
      // event.target.dialogWidth = window.innerWidth;
      this.dialogHeight = window.innerHeight * this.dialogHeightRatio;
      this.dialogWidth = window.innerWidth;
    } else {
      console.log('mpika 2');
      this.dialogHeight = window.innerHeight * this.dialogHeightRatio;
      this.dialogWidth = window.innerWidth;
    }

    if (typeof this.detailsEditDialogRef !== 'undefined') {
      console.log('mpika 3');
      console.log('dialogHeight: ' + this.dialogHeight);
      this.detailsEditDialogRef.updateSize(this.dialogWidth.toString(), this.dialogHeight.toString());
    }

    if (typeof this.addEntryDialogRef !== 'undefined') {
      console.log('mpika 4');
      console.log('dialogHeight: ' + this.dialogHeight);
      this.addEntryDialogRef.updateSize(this.dialogWidth.toString(), this.dialogHeight.toString());
      // this.addEntryDialogRef.updatePosition({top: 'auto', bottom: 'auto'});
    }

    console.log('onresize height is: ' + this.dialogHeight);

  }

  ngOnInit(): void {
    this.getBusinessEntries();
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

  getBusinessEntries() {

    this.manageBusinessEntriesService.getResults()
      .subscribe(results => {this.businessData = results; this.dataSource.data = this.businessData; });
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

  openDetailsEditDialog(element: BusinessEntry): void {
    this.onResize();
    this.detailsEditDialogRef = this.dialog.open(DetailsEditDialogComponent, {
      width: this.dialogWidth.toString().concat('px'), height: this.dialogHeight.toString().concat('px'),
      data: {id: element.id, name: element.name, category: element.category, country: element.country,
      city: element.city, address: element.address, postalCode: element.postalCode, phoneNumbers:
      element.phoneNumber, email: element.email, availableServProd: element.availableServProd,
      imgPath: element.imgPath}
    });
  }

  // /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: BusinessEntry): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  // }

  openAddEntryDialog() {
    // const dialogRef = this.dialog.open(AddEntryDialogComponent, {
    //   width: '20vw'});
    this.onResize();
    this.addEntryDialogRef = this.dialog.open(AddEntryDialogComponent, {
      width: this.dialogWidth.toString().concat('px'), height: this.dialogHeight.toString().concat('px')});
  }
}

