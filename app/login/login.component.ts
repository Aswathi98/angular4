import { Component, OnInit ,ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{NgForm} from'@angular/forms';
import{FormData} from './form-data';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import {StaticComponent} from "src/app/static/static.component";
import {LoginService} from "../service/login.service";
import swal from "sweetalert2";
import { ViewEncapsulation } from '@angular/core'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
     encapsulation: ViewEncapsulation.None  
})
export class LoginComponent implements OnInit {

 

  constructor(private http:HttpClient,private router:Router,private service:LoginService) { 

  }
 data:FormData={empId:"",password:""};

  ngOnInit() {
    
  }


onSubmit(form:NgForm){
 
   this.data={empId:form.value.username,password:form.value.password};
  
  this.service.sendRequest(this.data)
  .subscribe(
    
    (res)=>{
      let reslogin:FormData=res;
      if(reslogin.status=="Success"){
        sessionStorage.setItem("username",reslogin.employeeName);
        sessionStorage.setItem("id",reslogin.empId);
        sessionStorage.setItem("roleid",reslogin.roleId);
      console.log(reslogin);
    this.router.navigate(['/static',{relativeTo:this.router}])
      }
      
  
    else{
      this.router.navigate(['/login',{relativeTo:this.router}])
      swal.fire({
        icon:'error',
        title:'invalid login',
        text:'check username and password',
        confirmButtonColor:'#00aaad'
      })
    }
    },
(err)=>{
  swal.fire({
        icon:'error',
        title:'invalid login',
        text:'check username and password',
        confirmButtonColor:'#00aaad'
      })
}

    
  )
}
}
