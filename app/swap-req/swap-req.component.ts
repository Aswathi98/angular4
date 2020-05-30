import { Component, OnInit } from '@angular/core';
import { request } from '../req-window/request';
import { HttpClient } from '@angular/common/http';
import "../../assets/js/seatMap.js"
import "../../assets/js/jquery.seat-charts.js"
import "../../assets/css/jquery.seat-charts.css"
import "../../assets/css/style.css"
import { ViewEncapsulation } from '@angular/core'
import { GlobalService } from '../global.service';
import { DataService } from '../dataservice';
import Swal from 'sweetalert2'
import { SearchService } from '../search-name.service';
import { Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { SearchInterface } from '../search-interface';
import {NgForm} from '@angular/forms';
import { Request1 } from './swapreq';
declare var $:any;
@Component({
  selector: 'app-swap-req',
  templateUrl: './swap-req.component.html',
  styleUrls: ['./swap-req.component.css']
})
export class SwapReqComponent implements OnInit {
  searchFailed: boolean;
  searching: boolean;
   user
  /*constructor() { }*/
  num: string;
  employeeid;
  ngOnInit() {
    let user;
    user = JSON.parse(localStorage.getItem("user"));
    this.request1.recommender=user.empId;
    // alert(user.empId);


    this._globalService.id_subject.subscribe(
      id => {
        this.num = id;
        // alert(id);
        this.Request.spaceId = this.num;
        this.request1.requestedSpaceId=this.num;

      }
    );
    this._dataservice.id.subscribe(
      id => {
        console.log("abk="+id);
        this.Request.reccomender=id;
       
      });
      

  }
  id1: SearchInterface;
  fName = '';

  post1(form: NgForm) {
    let search: SearchInterface = {
      empId: "",
      fName: this.fName
    };

    this.searchService.findAll(search).subscribe(
      (res) => {
      
        let resplog: SearchInterface = res;
        console.log(resplog);
        this.id1 = resplog;
       this.employeeid=this.id1.empId;
       this.Request.empId=this.id1.empId;
       this.request1.empId=this.id1.empId;
       this.Request.ip=this.id1.fName;
        this.searchService.id.next(this.id1);
      },
      (err) => {
        alert("error");
      }
    );
  }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.searchService.findAllSearch({ empId: "", fName: term }
        ).pipe(
          map( data => {
            console.log(data.forEach( i => i.fName));
            return data.map( i => i.fName);
          }),
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )
  ngAfterViewInit() {
    $(document).ready(function () {
      $(".cancel").click(function () {
        $(".req3").hide();
        
      });
    });
    
  }
  
  
  
  constructor(private http: HttpClient, private _globalService: GlobalService,private _dataservice: DataService,private searchService: SearchService) { }
   Request: request = {
    "requestId": null, "spaceId": null,
    "empId":"",
    "creationDate": "",
    "reccomender": "",
    "recommendedOn": "",
    "approver": "",
    "status": "Pending",
    "approvedOn": "",
    "ip": "",
    "startDate": "",
    "endDate": "",
    "type": "Allocation"
  };

  request1:Request1={
    "requestId": null, 
    "empId": "",
    "recommender": "",
    "approver": "",
    "status":  "",
    "empName": "",
    "currentSpaceId":"",
    "requestedSpaceId":"",
    "empId2":"",
    "empName2":"",
    "manager":"",
    "creationDate":""
    };
 
  post() {
    console.log(this.request1);
    
    this.http.post("http://localhost:8085/transferRequest",this.request1).subscribe(
      res => {
        console.log(this.employeeid)
        console.log(res)
        if (res === true) {
          Swal.fire(
            'Request Received',
            'Wait for admin Approval',
            'success'
          )
        }


      },
      error =>{
        Swal.fire(
          'Request failed',
          'Try again',
          'error'
        )
      }
    );

  }
}