import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class SendMailService {
  baseUrl = environment._url;
   constructor(private http:HttpClient) { }
  getBatchName():Observable<any>{
  return  this.http.get(this.baseUrl+"/batchname");
    
}
 getBatchDetails(event):Observable<any>{
   return this.http.post(this.baseUrl+"/batchdet",event);
 } 
 sendRequest(obj):Observable<any>{
  return  this.http.post(this.baseUrl+"/send",obj);
} 
  getTemplateType():Observable<any>{
    return this.http.get(this.baseUrl+"/type");
  }
  saveTemplate(data):Observable<any>{
    return this.http.post(this.baseUrl+"/temp", data)
  }
}