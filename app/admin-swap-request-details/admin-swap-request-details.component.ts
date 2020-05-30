import { Component, OnInit } from '@angular/core';
import { reqdetail } from '../reqdetail';
import { HttpClient } from '@angular/common/http';
import { Request1 } from '../swap-req/swapreq';


@Component({
  selector: 'app-admin-swap-request-details',
  templateUrl: './admin-swap-request-details.component.html',
  styleUrls: ['./admin-swap-request-details.component.css']
})
export class AdminSwapRequestDetailsComponent implements OnInit {
  users: Request1[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.selectionsort();
  }
  option = "2";

  selectionsort() {
    switch (this.option) {
      case "1":
        this.http.get<Request1[]>("http://localhost:8085/approvedTransferRequests").subscribe((res) => {
          this.users = res;
          console.log(res);

        });
        break;
      case "2":
        this.http.get<Request1[]>("http://localhost:8085/pendingTransferRequests").subscribe((res) => {
          this.users = res;
          console.log(res);
        });
        break;
      case "3":
        this.http.get<Request1[]>("http://localhost:8085/declinedTransferRequests").subscribe((res) => {
          this.users = res;
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


  }



  state: boolean = false;

  isAllowed = (optional) => {
    return optional === 0 ? true : this.state;
  }

  isShow = false;
  approveClick(user: reqdetail) {
    this.state = !this.state;
    // alert(user);
    console.log(user);
    this.http.post("http://localhost:8085/transferApprove", user).subscribe((res) => {
      console.log(res);
      if (res === true) {
        this.selectionsort();

      }
    }
    )
  }
  declineClick(user: reqdetail) {
    console.log(user);
    this.http.post("http://localhost:8085/transferDecline", user).subscribe((res) => {
      console.log(res);
      if (res === true) {
        this.selectionsort();

      }
    }
    )

  }
}