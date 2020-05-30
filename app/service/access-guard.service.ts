import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccessGuardService implements CanActivate {
  roleid;
  constructor(private _router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
   this.roleid=sessionStorage.getItem('roleid');
   if (this.roleid==1) {
      return true;
    }
    // navigate to login page
    this._router.navigate(['/view']);
    return false;
  }

}
