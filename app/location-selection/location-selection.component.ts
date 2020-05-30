import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { citynames } from './citynames';

import { facilitynames } from './facilitynames';
import { floornumber } from './floornumber';
import { GlobalService } from '../global.service';
import { floorMap } from '../floorMap';
import { FloorMapService } from '../floormapDetails/floorMapDetails.service';


@Component({
  selector: 'app-location-selection',
  templateUrl: './location-selection.component.html',
  styleUrls: ['./location-selection.component.css']
})
export class LocationSelectionComponent implements OnInit {

  citynames: citynames[];
  facilitynames: facilitynames[];
  floornumber: floornumber[];
  city: any;
  facility: any;
  floornum: any;

  constructor(private http: HttpClient, private _floorid:GlobalService,private _floorMapService: FloorMapService ,private _floor_map:GlobalService,private _ffloor:GlobalService) { }
floor="";
  ngOnInit() {
let user;
    user = JSON.parse(localStorage.getItem("user"));
    this.floor=user.floorId;


    this.http.get<citynames[]>(`http://localhost:8085/cities`).subscribe(
      (res) => {
        this.citynames = res;
        console.log(this.citynames);

      })
      this.http.post<floorMap[]>(`http://localhost:8085/floorMap/${this.floor}`, this.floor).subscribe(
      res => {
          this.floors = res;
          console.log(res); 
          console.log(this.floors); 
         
          this.mapdesign = this._floorMapService.renderMap(this.floors);
          this._floor_map.floor_map.next(this.mapdesign);
          console.table(this.mapdesign);
      
      }
  );
      


  }

  changeCity(e) {
    this._ffloor.ffloor.next(false);
    console.log(e)
    console.log(e.target.value)
    let city = { "cityId": e.target.value, "cityName": "" }
    console.log(city)
    this.http.post<facilitynames[]>("http://localhost:8085/facility", city).subscribe(
      (res) => {
        this.facilitynames = res;
        console.log(res);
      })


  }

  changeFacility(e) {
    this._ffloor.ffloor.next(false);
    console.log(e)
    console.log(e.target.value)
    let facility = { "facilityId": e.target.value, "facilityName": "" }
    console.log(facility)
    this.http.post<floornumber[]>("http://localhost:8085/floor", facility).subscribe(
      (res) => {
        this.floornumber = res;
        console.log(res);
      })



  }
  floors: floorMap[];
  mapdesign:string[];
  changeFloor(e) {
    this._ffloor.ffloor.next(true);
 
    let floornum = { "floorId": e.target.value, "floorName": "" }
    console.log(floornum);
    
   
    this._floorid.floor_id.next(this.floornum);
    let floorId=e.target.value;
    this.http.post<floorMap[]>(`http://localhost:8085/floorMap/${floorId}`, floorId).subscribe(
      res => {
          this.floors = res;
          console.log(res); 
          console.log(this.floors); 
         
          this.mapdesign = this._floorMapService.renderMap(this.floors);
          this._floor_map.floor_map.next(this.mapdesign);
          console.table(this.mapdesign);
      
      }
  );
    // this.http.post("http://localhost:8085/floorMap", floornum).subscribe(
    //   (res) => {


    //   })



  }

}