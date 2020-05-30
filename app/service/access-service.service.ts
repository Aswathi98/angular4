import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Access} from '../access/access';
import { environment } from "src/environments/environment";

@Injectable()
export class AccessServiceService {
  baseUrl = environment._url;
   constructor(private http: HttpClient) { }
sendRequest(access:Access):Observable<Access[]>{
  console.log("inside send",access);
  
 return this.http.post<Access[]>(this.baseUrl+'/access',access);
}


}
