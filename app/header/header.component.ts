import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserLogged } from '../loggeduser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private  http: HttpClient, private router: Router,private userlogged: UserLogged) { }

  id;
  ngOnInit() {
    this.userlogged.user_logged.subscribe(
      id => {
        console.log(id);
       this.id = id;
        //alert(id);
      });
  }
  changeCity() {
    localStorage.removeItem("user");
    this.router.navigate(['']);
  }
  onClick(){
    localStorage.removeItem("empId");
    this.router.navigate(['/']);
  }

  

}
