import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../service/data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import swal from "sweetalert2";

import { MatCheckboxModule } from '@angular/material/checkbox';


import { Issue } from './models/issue';
import { DataSource, SelectionModel } from '@angular/cdk/collections';


import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DetailDialogComponent } from './dialogs/details/details.dialog.component';


import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnInit {
  roleid;
 displayedColumns = ['select', 'amcatId', 'dateOfDrive', 'venueOfDrive', 'studentName', 'yearOfGraduation', 'collegeName', 'studentMobile','litmusBatch','actions'];    
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;

  index: number;
  id: number;
  select: any;
  // options:any = [];
  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public dataService:DataService,
    
    private issue: Issue) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;


  ngOnInit() {
    this.loadData();
    this.roleid=sessionStorage.getItem('roleid');

  }

  refresh() {
    this.loadData();
  }

  selection = new SelectionModel<Issue>(true, []);

  addNew(litmusBatch: string)  {

    const  dialogRef  =  this.dialog.open(AddDialogComponent,  {
      data:  { litmusBatch: litmusBatch  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates

        console.log(this.selection.selected);
        console.log(this.dataService.getDialogData());
        let litmus = this.dataService.getDialogData();
        this.selection.selected.forEach((item) => {
          item.litmusBatch = litmus.litmusBatch;
        })

        console.log("add to batch :" + this.selection.selected);
        this.select = this.selection.selected;
        console.log("select", this.select);

      this.dataService.sendBatch(this.select)
      .subscribe(data => {
          // console.log("Uploaded Successfully:" + data);
                        swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Batch created successfully',
              showConfirmButton: false,
              timer: 1500
              }) 
                      },
                        (err: HttpErrorResponse) => {
                          swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to create batch',
              confirmButtonColor:'#00aaad'
              }) 
          }

        );


        this.refreshTable();
      }
    });
  }

  startEdit(i: number, amcatId: number, dateOfDrive: any, venueOfDrive: string, studentName: string, gender: string, yearOfGraduation: number, collegeName: string, university: string, studentCourse: string, studentBranch: string,
    markTenth: number, markTwelve: number, collegeMarks: number, collegePercentage: number, studentAddress: string, studentMobile: number, additionalContactNumber: number, studentEmail: string, addtionalEmailId: string,
    collegeAddress: string, nameOfPlacementOfficer: string, numberOfPlacementOfficer: number, emailOfPlacementOfficer: string, preLearningLink: string, litmusBatch: string, litmusStatus: string,
    studentRemarks: string, studentAdditionalRemarks: string, createdTime: any, modifiedTime: any, backgroundVerification: string) {

    this.id = amcatId;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditDialogComponent, {

      data: {
        amcatId: amcatId, dateOfDrive: new Date(dateOfDrive), venueOfDrive: venueOfDrive, studentName: studentName, gender: gender, yearOfGraduation: yearOfGraduation, collegeName: collegeName, university: university, studentCourse: studentCourse, studentBranch: studentBranch,
        markTenth: markTenth, markTwelve: markTwelve, collegeMarks: collegeMarks, collegePercentage: collegePercentage, studentAddress: studentAddress, studentMobile: studentMobile, additionalContactNumber: additionalContactNumber, studentEmail: studentEmail, addtionalEmailId: addtionalEmailId,
        collegeAddress: collegeAddress, nameOfPlacementOfficer: nameOfPlacementOfficer, numberOfPlacementOfficer: numberOfPlacementOfficer, emailOfPlacementOfficer: emailOfPlacementOfficer, preLearningLink: preLearningLink, litmusBatch: litmusBatch, litmusStatus: litmusStatus,
        studentRemarks: studentRemarks, studentAdditionalRemarks: studentAdditionalRemarks, createdTime: new Date(createdTime), modifiedTime: new Date(modifiedTime),backgroundVerification: backgroundVerification
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.amcatId === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  detailItem(i: number, amcatId: number, dateOfDrive: any, venueOfDrive: string, studentName: string, gender: string, yearOfGraduation: number, collegeName: string, university: string, studentCourse: string, studentBranch: string,
    markTenth: number, markTwelve: number, collegeMarks: number, collegePercentage: number, studentAddress: string, studentMobile: number, additionalContactNumber: number, studentEmail: string, addtionalEmailId: string,
    collegeAddress: string, nameOfPlacementOfficer: string, numberOfPlacementOfficer: number, emailOfPlacementOfficer: string, preLearningLink: string, litmusBatch: string, litmusStatus: string,
    studentRemarks: string, studentAdditionalRemarks: string, createdTime: any, modifiedTime: any,backgroundVerification: string) {
    this.index = i;
    this.id = amcatId;
    const dialogRef = this.dialog.open(DetailDialogComponent, {
      data: {
        amcatId: amcatId, dateOfDrive: new Date(dateOfDrive), venueOfDrive: venueOfDrive, studentName: studentName, gender: gender, yearOfGraduation: yearOfGraduation, collegeName: collegeName, university: university, studentCourse: studentCourse, studentBranch: studentBranch,
        markTenth: markTenth, markTwelve: markTwelve, collegeMarks: collegeMarks, collegePercentage: collegePercentage, studentAddress: studentAddress, studentMobile: studentMobile, additionalContactNumber: additionalContactNumber, studentEmail: studentEmail, addtionalEmailId: addtionalEmailId,
        collegeAddress: collegeAddress, nameOfPlacementOfficer: nameOfPlacementOfficer, numberOfPlacementOfficer: numberOfPlacementOfficer, emailOfPlacementOfficer: emailOfPlacementOfficer, preLearningLink: preLearningLink, litmusBatch: litmusBatch, litmusStatus: litmusStatus,
        studentRemarks: studentRemarks, studentAdditionalRemarks: studentAdditionalRemarks, createdTime: new Date(createdTime), modifiedTime: new Date(modifiedTime),  backgroundVerification: backgroundVerification
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.amcatId === this.id);
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        
      }
    });
  }


  private refreshTable() {
 
    this.paginator._changePageSize(this.paginator.pageSize);
    this.selection.clear();
    
  }


  public loadData() {
    this.exampleDatabase = new DataService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
  
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class ExampleDataSource extends DataSource<Issue> {
  _filterChange = new BehaviorSubject('');
  data: Issue[] = [];
  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Issue[] = [];
  renderedData: Issue[] = [];

  constructor(public _exampleDatabase: DataService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Issue[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllIssues();



    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((issue: Issue) => {
        const searchStr = (issue.studentName + issue.collegeName + issue.litmusBatch).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;

      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }
    ));
  }

  disconnect() { }


  /** Returns a sorted copy of the database data. */
  sortData(data: Issue[]): Issue[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'studentName': [propertyA, propertyB] = [a.studentName, b.studentName]; break;
        case 'collegeName': [propertyA, propertyB] = [a.collegeName, b.collegeName]; break;
        case 'litmusBatch': [propertyA, propertyB] = [a.litmusBatch, b.litmusBatch]; break;


      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
