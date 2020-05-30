import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { HttpClient } from '@angular/common/http';
import { empmodel } from './empmodel';
import { SearchService } from '../search-name.service';
import {DeallocationInterface} from '../empdetails/DeAllocationInterface';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empdetails',
  templateUrl: './empdetails.component.html',
  styleUrls: ['./empdetails.component.css']
})


export class EmpdetailsComponent implements OnInit {
  

  num: string;
  abc: string = "";
  rolename_;
  username_;
  constructor(private _globalService1: GlobalService, private http: HttpClient, private search: SearchService, private router: Router) { }
  emp: empmodel = {};
  DeallocationObject:DeallocationInterface = {
    empId:'',
    spaceId:'',
    empName:'',
    recommender:''
    
  };
 
  ngOnInit() {

    this._globalService1.id_subject.subscribe(
      id => {
        this.num = id;
        // alert(this.num);
        this.empdetails(this.num);
      }
    );
    this.search.id.subscribe(
      emp=>this.emp=emp
    );
    let user;
    user = JSON.parse(localStorage.getItem("user"));
    // alert(user.roleName);
    this.rolename_=user.roleName;
    this.username_=user.empId;

  }

  

  empdetails(num) {
    console.log(num);
    this.http.post(`http://localhost:8085/employeeDetails/${num}`, num).subscribe((res) => {

      console.log(res)
      if (res) {
        this.emp = res;
        console.log(this.emp);
        this.DeallocationObject.empId=this.emp.empId;
        this.DeallocationObject.spaceId=this.emp.spaceId;
        this.DeallocationObject.empName=this.emp.fName;
        this.DeallocationObject.recommender=this.username_;
        console.log(this.DeallocationObject);
        
      }
      else {
        console.log("null values ");
      }


    }
    );

  }
 
    Deallocate(){
      
      this.http.post("http://localhost:8085/deAllocationRequest",this.DeallocationObject).subscribe(res=>{
      console.log(res);
      if(res==true){
        Swal.fire(
          'Request Received',
          'Wait for admin Approval',
          'success'
        )
      }
      else{
        Swal.fire(
          'Request failed',
          'Try again',
          'error'
        )
      }
     })

   }
   cancel() {
    // this.screen = "spacemap"
    if (this.rolename_ == "Admin") {
    window.location.reload();
      // console.log(this.abc);
      // this.abc = '/admin/spacemap';
      // this.router.navigate([this.abc]);
      // console.log(this.abc);

    }
    else if (this.rolename_ == "Manager") {
      // console.log(this.abc);
      // this.abc = '/manager/spacemap';
      // this.router.navigate([this.abc]);
      // // console.log(this.abc);
      window.location.reload();
    }
  }
  


}
