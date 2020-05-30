import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reqdetail } from '../reqdetail';
import { DataService } from '../dataservice';

@Component({
  selector: 'app-request-detail11',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class AdminRequestDetailComponent implements OnInit {

  constructor(private http: HttpClient) { }
  users: reqdetail[];
  ngOnInit() {

    this.http.get<reqdetail[]>("http://localhost:8085/request").subscribe((res) => {
      this.users = res;
      //  console.log(res);
      //  console.log(this.users);
      // console.log("hello");

    })
    this.selectionsort();
  }
  val;

  option = "2";
  selectionsort() {
    switch (this.option) {
      case "1":
        this.http.get<reqdetail[]>("http://localhost:8085/approvedRequests").subscribe((res) => {
          this.users = res;
          this.val='Approved';
        });
        break;
      case "2":
        this.http.get<reqdetail[]>("http://localhost:8085/pendingRequests").subscribe((res) => {
          this.users = res;
          this.val='pending';
          console.log(this.users)
        });
        break;
      case "3":
        this.http.get<reqdetail[]>("http://localhost:8085/declinedRequests").subscribe((res) => {
          this.users = res;
          this.val='Declined';
        });
        break;


    }
    if (this.option == "1") {
      this.isShow = true;
    }
    if (this.option == "2") {
      this.isShow = false;
    }
    if (this.option == "3") {
      this.isShow = true;
    }
    // number:any;

  }


  state: boolean = false;

  isAllowed = (optional) => {
    return optional === 0 ? true : this.state;
  }

  isShow = false;
}