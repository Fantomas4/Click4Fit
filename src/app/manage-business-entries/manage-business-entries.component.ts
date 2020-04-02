import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../search/search.service';
import {BusinessEntry} from '../business-entry';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'app-manage-business-entries',
  templateUrl: './manage-business-entries.component.html',
  styleUrls: ['./manage-business-entries.component.css']
})
export class ManageBusinessEntriesComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selection = new SelectionModel<BusinessEntry>(true, []);

  displayedColumns = ['checkboxes', 'id', 'name', 'category'];

  businessData: BusinessEntry[];
  dataSource = new MatTableDataSource(this.businessData);

  constructor(private ManageBusinessEntriesService: SearchService) { }

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

    this.ManageBusinessEntriesService.getResults()
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

  // /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: BusinessEntry): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  // }

}
