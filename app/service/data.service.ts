import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Issue} from '../view/models/issue';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import { environment } from "src/environments/environment";

@Injectable()
export class DataService {
  baseUrl = environment._url;
  private readonly GET_URL = this.baseUrl+'/list';
  private readonly PUT_URL = this.baseUrl+'/update';
  private readonly BATCH_URL = this.baseUrl+'/batch';

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);

  // Temporarily stores data from dialogs
  dialogData: any;
  options:any = [];
  constructor (private httpClient: HttpClient) {}

  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.httpClient.get<Issue[]>(this.GET_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }


  addIssue (issue: Issue): void {
    this.dialogData = issue;
    // console.log("Dataservice:"+this.dialogData.litmusBatch)
  
  }

  updateIssue (issue: Issue): void {
    this.dialogData = issue;
  }

 sendBatch(select):Observable<any>{
  return this.httpClient.post(this.BATCH_URL,select);
   }
  

 updateItem(issue: Issue):void{
   console.log("Starting Uploading");
    this.httpClient.put(this.PUT_URL,issue).subscribe(data => {
      console.log("Uploaded Successfully:"+data);
      },
      (err: HttpErrorResponse) => {
       console.log(err);
      }
    
    );
}}