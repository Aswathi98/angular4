import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmitType, detach } from '@syncfusion/ej2-base';
import * as XLSX from 'xlsx';
import { ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { UploaderComponent, RemovingEventArgs } from '@syncfusion/ej2-angular-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';
import { Exceldata } from './exceldata';
import { DatePipe } from '@angular/common';
import { UploadService } from "src/app/service/upload.service";
import swal from "sweetalert2";
import { ExcelDownloadService } from "src/app/service/excel-download.service";
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],

  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {
  XL_row_object: any;
  jsonObj: any;
  id: any;
  amcatId: any;
  status: boolean = false;
a:any=[];
pos:number;
  //@ViewChild('defaultupload')
  public uploadObj: UploaderComponent;
  //@ViewChild('grid')
  public gridObj: GridComponent;

  constructor(private http: HttpClient, private datepipe: DatePipe, private upload: UploadService, private exceldownload: ExcelDownloadService, private router: Router) {

  }


  public path: Object = {
    saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
    removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
  };

  public dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;

  public onFileRemove(args): void {
    args.cancel = false;

  }
  public json_object: any;
count:number =0;
size:number = 0;
  parseExcel(file) {
    this.a = [];
    let reader = new FileReader();
    reader.onload = (e) => {
      let data = (<any>e.target).result;
      let workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach((function (sheetName) {

        let XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        this.json_object = JSON.stringify(XL_row_object);
        this.jsonObj = JSON.parse(this.json_object);
        this.size = this.jsonObj.length;
        console.log(this.jsonObj);

        for (var i = 0; i < this.jsonObj.length; i++) {
          // this.jsonObj.forEach((item)=>{
                          let latest_date  = this.datepipe.transform( this.jsonObj[i].dateOfDrive,  'yyyy-MM-dd');
                          this.jsonObj[i].dateOfDrive = latest_date;
          this.amcatId =  this.jsonObj[i].amcatId;
          // console.log(this.amcatId);
          // this.id.forEach((amcatId) => {
          for(var j = 0;j<this.id.length;j++){
            // console.log(typeof (this.amcatId));
            //console.log(typeof(amcatId.amcatId));
            if (this.amcatId == this.id[j].amcatId) {
            
              console.log(this.a);

              this.status = true;
              this.pos = i;
            }
          
          // })
        }
          if(this.status == false){
            this.count+=1;
              this.a.push(this.jsonObj[i]);
               this.status = false;
            }
       this.status = false;
      }
        //           }) 
      }).bind(this), this);

    };

    reader.onerror = function (ex) {

    };
    reader.readAsBinaryString(file);
  };

  public onSuccess(args: any): void {
    var files = args.target.files; // FileList object
    this.parseExcel(files[0]);
  }
  xlArray: Exceldata[];

  ngOnInit() {
    this.a = [];
    this.upload.validateAmcat().subscribe(
      (res) => {
        this.id = res;
        //  console.log(this.id);



      },

      //  location.reload();


      (err) => {
        console.log(err);
        swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: 'Please upload a file'

        })
      }
    )

  }
  b:any = [];
  onPost() {
if(this.a.length == 0){
   swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: 'All the records already exists',
          showConfirmButton: true
        })
}
    console.log(this.a);
this.jsonObj.forEach(item=>{
  this.a.forEach(item1=>{
    if(item==item1){
      this.b.push()
    }
  })
})

    this.upload.uploadRequest(this.a)
      .subscribe(
      (res) => {


        swal.fire({

          icon: 'success',
          title: 'Uploaded Successfully '+((this.count)+'/'+(this.size)),
          text: this.count+' records inserted successfully. '+'('+(this.size-this.count)+' records already existed due to same AmcatID)',
          showConfirmButton: true,
          
        })
        this.router.navigate(['/view', { relativeTo: this.router }])
        //  location.reload();

      },
      (err) => {
        console.log(err);
        if(this.a.length!=0){
        swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: 'Please upload a file'

        })
      }}
      )
  }
  data: any = [{
    amcatId: 0, dateOfDrive: '', venueOfDrive: '', studentName: '', gender: '', yearOfGraduation: '', collegeName: '', university: '', studentCourse: '',
    studentBranch: '', markTenth: 0, markTwelve: 0, collegeMarks: 0, collegePercentage: 0, studentAddress: '', studentMobile: 0,
    additionalContactNumber: 0,
    studentEmail: '', addtionalEmailId: '', collegeAddress: '', nameOfPlacementOfficer: '', numberOfPlacementOfficer: 0, emailOfPlacementOfficer: '', preLearningLink: '',
    litmusBatch: '', litmusStatus: '', studentRemarks: '', studentAdditionalRemarks: ''
  }];

  exportAsXLSX(): void {
    this.exceldownload.exportAsExcelFile(this.data, 'Sample Excel Format');
  }
}