import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../search/search.service';
import {BusinessEntry} from '../business-entry';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-manage-business-entries',
  templateUrl: './manage-business-entries.component.html',
  styleUrls: ['./manage-business-entries.component.css']
})
export class ManageBusinessEntriesComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns = ['id', 'name', 'category'];

  businessData: BusinessEntry[];
  dataSource = new MatTableDataSource(this.businessData);

  constructor(private ManageBusinessEntriesService: SearchService) { }

  ngOnInit(): void {
    this.getBusinessEntries();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  getBusinessEntries() {

    this.ManageBusinessEntriesService.getResults()
      .subscribe(results => {this.businessData = results; this.dataSource.data = this.businessData;});
  }

}
