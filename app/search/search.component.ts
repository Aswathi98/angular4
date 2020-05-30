import { Component, OnInit } from '@angular/core';

import { SearchInterface } from '../search-interface';
import { NgForm } from '@angular/forms';
import { SearchService } from '../search-name.service';
import { Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  err: any;
  searchFailed: boolean;
  searching: boolean;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }
  id1: SearchInterface;
  fName = '';

  post(form: NgForm) {
    let search: SearchInterface = {
      empId: "",
      fName: this.fName
    };

    this.searchService.findAll(search).subscribe(
      (res) => {
        let resplog: SearchInterface = res;
        console.log(resplog);
        this.id1 = resplog;
        this.searchService.id.next(this.id1);
      },
      (err) => {
        this.err = err.error.errorMessage;
          Swal.fire(
            'Search failed',
           this.err ,
            'error'
          )
        
        
        console.log(this.err);
        
      }
    );
  }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.searchService.findAllSearch({ empId: "", fName: term }
        ).pipe(
          map( data => {
            console.log(data.forEach( i => i.fName));
            return data.map( i => i.fName);
          }),
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )


}
