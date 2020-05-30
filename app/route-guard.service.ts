import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { Router } from '@angular/router';


@Injectable()
export class RouteGuardService implements CanActivate {
    constructor(private loginComponent: LoginComponent,private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.loginComponent.isUserLoggedIn())
            return true;

        this.router.navigate(['login'])

        return false;
    }
}