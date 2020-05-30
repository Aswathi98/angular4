import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   constructor(private http:HttpClient) { }
  sendRequest(data):Observable<any>{
  return  this.http.post("http://localhost:8081/login",data);
    
}
  loggedIn(){
    return !!sessionStorage.getItem("id");
  }

}
