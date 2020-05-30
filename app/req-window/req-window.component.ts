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
import { UserLogged } from '../loggeduser';

declare var $: any;

@Component({
  selector: 'app-req-window',
  templateUrl: './req-window.component.html',
  styleUrls: ['./req-window.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ReqWindowComponent implements OnInit {
  searchFailed: boolean;
  searching: boolean;
 id;
  /*constructor() { }*/
  num: string;
  employeeid;
  ngOnInit() {
    this._globalService.id_subject.subscribe(
      id => {
        this.num = id;
        // alert(id);
        this.Request.spaceId = this.num;
      }
    );
    this._dataservice.id.subscribe(
      id => {
        // console.log("abk="+id);
        this.Request.reccomender=id;
        
        // num = id;
        //alert(this.Request.reccomender=id);
      });
      this.userlogged.user_logged.subscribe(
        id => {
          console.log(id);
          this.id = id;
          this.Request.reccomender=id;
          // alert(id);
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
        // alert(this.id1);
        this.id1 = resplog;
       this.employeeid=this.id1.empId;
      
       this.Request.empId=this.id1.empId;
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



  constructor(private http: HttpClient, private _globalService: GlobalService,private _dataservice: DataService,private searchService: SearchService,private userlogged: UserLogged) { }
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
  
  post() {
    console.log(this.Request);
    this.http.post("http://localhost:8085/spaceRequest",this.Request).subscribe(
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
