import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reqdetail } from '../reqdetail';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
 
  constructor(private http: HttpClient) { }
  users: reqdetail[];
  err: string;
  ngOnInit() {
   
    
    this.selectionsort();



  }
  option="2";
  selectionsort(){
    switch(this.option){
      case "1":
      this.http.get<reqdetail[]>("http://localhost:8085/approvedRequests").subscribe((res) => {
       
        this.users = res;
       },
    
      );
      break;      
      case "2":
      this.http.get<reqdetail[]>("http://localhost:8085/pendingRequests").subscribe((res) => { 
      

        this.users = res;
        if(this.users==null){
          console.log("empty");
        }
        
      
      });
      
      break;
      case "3":
      this.http.get<reqdetail[]>("http://localhost:8085/declinedRequests").subscribe((res) => {
        this.users = res;
      });
      break;


    }
    if(this.option=="1"){
      this.isShow =true;
    }
    if(this.option=="2"){
      this.isShow = false;
    }
    if(this.option=="3"){
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
    this.http.post("http://localhost:8085/approve", user).subscribe((res) => {
      console.log(res);
      if (res === true) {
        this.selectionsort();

      }
    }
    )
  }
  declineClick(user: reqdetail) {
    console.log(user);
    this.http.post("http://localhost:8085/decline", user).subscribe((res) => {
      console.log(res);
      if (res === true) {
        this.selectionsort();

      }
    }
    )

  }
}






