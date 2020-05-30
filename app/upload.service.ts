import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }
  uploadRequest(jsonObj):Observable<any>{
  return  this.http.post("http://localhost:8081/upload",jsonObj);
    
}
}
