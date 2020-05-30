import { Component, OnInit } from '@angular/core';
import{NgForm} from'@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import { ViewEncapsulation } from '@angular/core';  
import { SendMailService } from "src/app/service/send-mail.service";
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
    encapsulation: ViewEncapsulation.None  
})
export class TemplateComponent implements OnInit {
 data:any={templateType:"",template:""};
  

  constructor(private router:Router,private http:HttpClient,private sendmail: SendMailService) { }

  ngOnInit() {
  }
onSubmit(form:NgForm){
 
   this.data={templateType:form.value.templateType,template:form.value.template};
   this.sendmail.saveTemplate(this.data).subscribe(
      (res) => {

      swal.fire({
          icon: 'success',
          title: 'Template saved successfully!!',
          showConfirmButton: false,
          timer: 1500
    })
       this.router.navigate(['/temp',{relativeTo:this.router}])
      },
      (err) => {

       swal.fire({
        icon:'error',
        title:'Oops!!',
        text:'Saving template failed'
      })
    }
    )
}
}