import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  roleid;
  baseUrl = environment._url;
   constructor(private http:HttpClient) { }
  sendRequest(data):Observable<any>{
  return  this.http.post(this.baseUrl+"/login",data);
    
}
  loggedIn(){
  this.roleid= sessionStorage.getItem('roleid');
  if(this.roleid==1||this.roleid==2||this.roleid==3){
    return true;
  }
  }
}
