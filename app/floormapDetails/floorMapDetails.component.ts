import { Component, OnInit } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { floorMap } from '../floorMap';
import { map, take } from 'rxjs/operators';

import { FloorMapService }  from './floorMapDetails.service';
import { GlobalService } from '../global.service';
declare var $: any;
@Component({ 
    selector: 'floor-map-detail',
    providers : [FloorMapService] ,
    templateUrl: './floorMapDetails.component.html',
    styleUrls: ['./floorMapDetails.component.css']
})

export class FloorMapDetailsComponent implements OnInit {



 

    num: string;
    constructor(private http: HttpClient,private _floorMapService: FloorMapService, private _floor_map:GlobalService ) { }
    floors: floorMap[];
    

    mapdesign:string[];
    ngOnInit() {
        this._floor_map.floor_id
        
        .subscribe(
            id => {console.log("abk"+id);
            
                this.http.post<floorMap[]>("http://localhost:8085/floorMap", {floorId: id}).subscribe(
                    res => {
                        this.floors = res;
                        console.log(res); 
                        console.log(this.floors); 
                        //.log(this.floors) this.mapdesign=; 
                        this.mapdesign = this._floorMapService.renderMap(this.floors);
                        this._floor_map.floor_map.next(this.mapdesign);
                        console.log(this.mapdesign);
                    
                    }
                );
            }
          );
        
        console.log(this.mapdesign);
        

        
    };

}
