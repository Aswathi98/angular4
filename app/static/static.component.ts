import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { MatTabsModule } from '@angular/material';
@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.css']
})
export class StaticComponent implements OnInit {
private username:string;
employeeId:String;
roleid:any;
constructor(private router:ActivatedRoute,private route:Router) { }

ngOnInit() {
    this.employeeId = sessionStorage.getItem('id');
    this.roleid=sessionStorage.getItem('roleid');
    //  this.username=this.router.snapshot.params["employeeName"]
    //  console.log(name)
  }
logout(){
  sessionStorage.removeItem('id');
  sessionStorage.removeItem('roleid');
  this.route.navigate(['/login']);
}

 
}
