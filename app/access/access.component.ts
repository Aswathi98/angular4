import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm,FormControl, FormGroupDirective } from '@angular/forms';
import { MustMatch } from './must-match.validator';
import { AccessServiceService } from '../service/access-service.service';
import { Access } from "src/app/access/access";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import swal from "sweetalert2";
import { ViewEncapsulation } from '@angular/core';
@Component({
selector: 'access', 
templateUrl: './access.component.html',
styleUrls: ['./access.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class AccessComponent implements OnInit {
       namesPattern = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"; 
       userIdPattern="^[A-Z]+\-+[0-9]{3,9}$";
// register: FormGroup;
    // submitted = false;
    //   emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    constructor(private http:HttpClient,private router:Router,private service:AccessServiceService ){}
    data:Access={  employeeName:"",empId:"",password:"",roleType:""}
//   constructor(private formBuilder: FormBuilder, public accessService:AccessServiceService,private router:Router) { }
// access:Access = {employeeName:"",empId:"",email:"",password:"",role:"",roleId:""};
  ngOnInit() {}


  passFormControl = new FormControl('', [
            Validators.required,
        ]);
        confirmFormControl = new FormControl('', [
            Validators.required,
            ]);

             hide =true;
//  this.register = this.formBuilder.group({
//             role: ['', Validators.required],
//             names: ['', Validators.required],
//           userId:['',Validators.required],
//           roleid:['',Validators.required],
//             password: ['', [Validators.required, Validators.minLength(6)]],
//             confirmPassword: ['', Validators.required],
//             acceptTerms: [false, Validators.requiredTrue],
   
//         } ,
//         {
//             validator: MustMatch('password', 'confirmPassword')
//         }
//         );

//   }

//   get registerForm() { return this.register.controls; }

//     onSubmit(f) {
//         console.log(f.value);

//         this.access.employeeName=f.value.userName;
//         this.access.role=f.value.role;
//         this.access.empId=f.value.userid;
//         this.access.roleId=f.value.roleid;
//         this.access.email=f.value.email;
//         this.access.password=f.value.password;
//         this.submitted = true;
//         console.log(f);
        
//         console.log("access",this.access);
        
//         this.accessService.sendRequest(this.access) .subscribe(
    
//     (res)=>{
//       console.log(res);
//       alert("Registered successfully..")
//        this.router.navigate(['/static',{relativeTo:this.router}]);

//     },
// (err)=>{
//   alert("invalid Username and Password");
// })

    //     // stop here if form is invalid
    //     if (this.registerForm.invalid) {
    //         return;
    //     }

    //     // display form values on success
    //     alert('SUCCESS!! \n\n');
    // }
onSubmit(form:NgForm){
    this.data={employeeName:form.value.names,password:form.value.password,empId:form.value.userId,roleType:form.value.roleType}
    this.service.sendRequest(this.data).subscribe(
        
    (res)=>{
        swal.fire({
            icon:'success',
            title:'Registered successfully',
             confirmButtonColor:'#00aaad'
        })
        this.router.navigate(['/static',{relativeTo:this.router}]);
    },(err)=>{
          swal.fire({
            icon:'error',
            title:'Registration Failed',
            text:'check if all fields are entered correctly',
            confirmButtonColor:'#00aaad'
        })
})
}}