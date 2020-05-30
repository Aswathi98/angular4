import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MailDetails } from "./mail-details";
import { FormBuilder } from "@angular/forms/forms";
import { SendMailService } from "src/app/service/send-mail.service";
import swal from "sweetalert2";
import {MatPaginator} from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sendmail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css'],
      // encapsulation: ViewEncapsulation.None 
})
export class SendMailComponent implements OnInit {

  constructor(private http: HttpClient, private sendmail: SendMailService,private router:Router) {

  }
  obj: any = { "litmusBatch": "", "templateType": "" };
  showTable: boolean = false;
  @ViewChild("paginator",{static:true}) paginator:ElementRef; 


  p: number = 1;

  public batchName: any[] = [];
  public template: String;
  public templateType: any[] = [];

  public tabledata: any;
  totalRec: number;
  theCheckbox: any;
  dataSource: any;

  displayedColumns = ['amcatId', 'studentName', 'studentEmail', 'studentMobile'];
 
  ngOnInit() {
 
    this.sendmail.getBatchName()
      .subscribe(
      (res) => {

        this.batchName = res;
        this.totalRec = this.batchName.length;
        console.log("total items", this.totalRec);
        console.log(this.batchName);
        this.sendmail.getTemplateType()
          .subscribe(
          (res) => {
            this.templateType = res;
          })
      })

  }
  ngAfterViewInit() {
  console.log("ll",this. paginator);
}


  optionSelected: any;
  onOptionsSelected(event) {
    this.obj.litmusBatch = event;


    

    this.sendmail.getBatchDetails(event)

      .subscribe(
      (res) => {
        this.tabledata = res;
        
        const MAIL_DATA: MailDetails[]=this.tabledata;
        this.dataSource = new MatTableDataSource<MailDetails>(MAIL_DATA);
      this.dataSource.paginator = this.paginator;
        this.totalRec = this.tabledata.length;
        this.showTable = (this.totalRec != 0);

      })
  }
  templateSelected: any;
  onTemplateSelected(event) {
    this.template = event;

    this.obj.templateType = event;

  }
  sendMail() {
    console.log(this.obj);
    this.sendmail.sendRequest(this.obj)
      .subscribe(
      (res) => {

         swal.fire({
         
        icon:'success',
        title:'Mail Send Successfully!!',
        showConfirmButton:false,
        timer:1500
      })
       this.router.navigate(['/static',{relativeTo:this.router}])
      },
      (err) => {

       swal.fire({
        icon:'error',
        title:'Oops!!',
        text:'Sending Mail Failed..choose a type'
      })
      }
      )


  }

}


