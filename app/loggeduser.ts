import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class UserLogged {
    def:string="";
  constructor() { }
  public user_logged: BehaviorSubject<string> = new BehaviorSubject(this.def);
  public id_logged: BehaviorSubject<string> = new BehaviorSubject(this.def);
}
