import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Access} from './access';
@Injectable()
export class AccessServiceService {
  // private accessUrl: string;
   constructor(private http: HttpClient) { }
// this.accessUrl = 'http://localhost:8080/access';
//   }
// public findAll(): Observable<Access[]> {
//     return this.http.get<Access[]>(this.accessUrl);
//   }
//    public save(access: Access) {
//      console.log(access);
//     return this.http.post<Access>(this.accessUrl, access);
    
//   }
sendRequest(access:Access):Observable<Access[]>{
  console.log("inside send",access);
  
 return this.http.post<Access[]>('http://localhost:8081/access',access);
}


}
