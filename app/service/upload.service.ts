import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  baseUrl = environment._url;
  constructor(private http:HttpClient) { }
  uploadRequest(jsonObj):Observable<any>{
  return  this.http.post(this.baseUrl+"/upload",jsonObj);  
}
  validateAmcat():Observable<any>{
   return  this.http.get(this.baseUrl+"/amcatid");
} 
}
