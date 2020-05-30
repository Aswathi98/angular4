import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class GlobalService {

  constructor() { }
  public id_subject: Subject<string> = new Subject();
  public floor_id: Subject<string> = new Subject();
  public floor_map: Subject<string[]>= new Subject();
  public ffloor: Subject<boolean>= new Subject();

}
