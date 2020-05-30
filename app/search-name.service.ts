import { Component, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

import { SearchInterface} from './search-interface';

@Injectable()
export class SearchService{
  id: Subject<any> = new Subject();
    private _url:String="http://localhost:8085/search";
    private _urlAll:String="http://localhost:8085/searchAll";
    constructor(private Http:HttpClient){}
    findAll(search:SearchInterface):Observable<any>{
        console.log("finding...");
        return this.Http.post(`${this._url}`,search);
    }
    findAllSearch(search:SearchInterface):Observable<any>{
        return this.Http.post(`${this._urlAll}`,search);
    }

}