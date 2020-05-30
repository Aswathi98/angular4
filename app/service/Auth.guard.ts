import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
 import { Observable } from 'rxjs';
 import {LoginService} from '../service/login.service' ;
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private router:Router,private service:LoginService){}
    canActivate():boolean{

if(this.service.loggedIn()){
      return true
    }
    else{
      this.router.navigate(['/login']);
      return false
    }

  }
    
  
  
}
