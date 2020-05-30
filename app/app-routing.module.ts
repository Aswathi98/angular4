import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ViewComponent } from './view/view.component';
import { SendMailComponent } from './sendMail/send-mail.component';
import {LoginComponent} from './login/login.component';
import { StaticComponent } from './static/static.component';
import { Router } from "@angular/router";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccessComponent } from "src/app/access/access.component";
import { AuthGuard } from "src/app/service/Auth.guard";
import { AccessGuardService } from "src/app/service/access-guard.service";
import { TemplateComponent } from "src/app/template/template.component";
import{HelpComponent} from "src/app/help/help.component";


const routes: Routes = [
  {path :'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'upload',component :UploadComponent,canActivate:[AccessGuardService] },
   { path :'view',component :ViewComponent,canActivate:[AuthGuard] },
   {path :'sendMail',component :SendMailComponent,canActivate:[AuthGuard] },
   {path:'access',component:AccessComponent,canActivate:[AccessGuardService] },
   {path:'static',component:StaticComponent,canActivate:[AuthGuard] },
  {path:'temp',component: TemplateComponent,canActivate:[AuthGuard] }, 
{path:'help',component:HelpComponent},
  {path:'**',component:PageNotFoundComponent}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }




export const routingComponents=[UploadComponent,ViewComponent,SendMailComponent,
LoginComponent,StaticComponent,PageNotFoundComponent];