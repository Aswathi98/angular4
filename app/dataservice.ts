import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
    def:string="";
  constructor() { }
  public id_role: BehaviorSubject<string> = new BehaviorSubject(this.def);
  public id: BehaviorSubject<string> = new BehaviorSubject(this.def);
}
