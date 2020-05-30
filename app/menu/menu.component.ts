import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataservice';
import { login } from '../login/login';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserLogged } from '../loggeduser';
import { SearchInterface } from '../search-interface';
import { NgForm } from '@angular/forms';
import { SearchService } from '../search-name.service';
import { Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  searchFailed: boolean;
  searching: boolean;
  constructor(
    private _dataservice: DataService,
    private router: Router,
    private http: HttpClient,
    private userlogged: UserLogged,
    private searchService: SearchService) { }
  data: login = {
    employeeId: "", password: ""
  };
  abc: string = "";
  id;
 rolename_;
  ngOnInit() {
    let user;
    user = JSON.parse(localStorage.getItem("user"));
    // alert(user.roleName);
    this.rolename_=user.roleName;

    this.userlogged.user_logged.subscribe(
      id => {
        console.log(id);
        this.id = id;
        //alert(id);
      });
    this._dataservice.id_role.subscribe(
      id => {
        console.log(id);
        this.data.roleName = id;
       
        // alert(id);
      });
  }
  // role= this.localStorage.get('roleName');

  id1: SearchInterface;
  fName = '';

  post(form: NgForm) {
    let search: SearchInterface = {
      empId: "",
      fName: this.fName
    };

    this.searchService.findAll(search).subscribe(
      (res) => {
        let resplog: SearchInterface = res;
        console.log(resplog);
        this.id1 = resplog;
        this.searchService.id.next(this.id1);
      },
      (err) => {
        alert("error");
      }
    );
  }

  changeCity() {
    localStorage.removeItem("user");
    this.router.navigate(['']);
  }
  // logoutClick(){
  //   localStorage.removeItem("empId");
  //   this.router.navigate(['/']);
  // }

  screen = "spacemap";

  spaceClick() {
    this.screen = "spacemap"
    if (this.rolename_ == "Admin") {
      // console.log(this.abc);
      this.abc = '/admin/spacemap';
      this.router.navigate([this.abc]);
      // console.log(this.abc);

    }
    else if (this.rolename_ == "Manager") {
      // console.log(this.abc);
      this.abc = '/manager/spacemap';
      this.router.navigate([this.abc]);
      // console.log(this.abc);
    }
  }


  onClick() {
    this.screen = "request"
    if (this.rolename_ == "Admin") {
      // console.log(this.abc);
      this.abc = '/admin/allrequests';
      this.router.navigate([this.abc]);
      // console.log(this.abc);
    }
    else if (this.rolename_ == "Manager") {
      // console.log(this.abc);
      this.abc = '/manager/requests';
      this.router.navigate([this.abc]);
      // console.log(this.abc);
    }
  }
  swapClick() {
    this.screen = "swap"
    if (this.rolename_ == "Admin") {
      // console.log(this.abc);
      this.abc = 'admin/swapRequests';
      this.router.navigate([this.abc]);
      // console.log(this.abc);
    }
    else if (this.rolename_ == "Manager") {
      // console.log(this.abc);
      this.abc = '/manager/swapRequests';
      this.router.navigate([this.abc]);
      // console.log(this.abc);
    }
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
}
