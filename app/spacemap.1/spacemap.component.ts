import { Component, OnInit } from '@angular/core';
import "../../assets/js/hello.js"
import "../../assets/js/seatMap.js"
import "../../assets/js/jquery.seat-charts.js"
import "../../assets/css/jquery.seat-charts.css"
import "../../assets/css/style.css"
import { ViewEncapsulation } from '@angular/core'
import { GlobalService } from '../global.service';
import { request } from '../req-window/request.js';


declare var $: any;

@Component({
  selector: 'admin-spacemap',
  templateUrl: './spacemap.component.html',
  styleUrls: ['./spacemap.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SpacemapComponent1 implements OnInit {



  constructor(private globalservice: GlobalService,private _ffloor:GlobalService) { }
  reloadiv: boolean = false;
  loader:boolean=false;
  ngOnInit() {
     

    const tempThis = this;

    
    this.reloadiv = true;
    this._ffloor.ffloor.subscribe(data=>{
      this.reloadiv=data;
      this.loader=!data;
    }
    );
    

    // toggle()

    // let currentCmp = this;

    // $(document).loadSeatMap(function test(id) {
    //   alert("Seat Selected  " + " " + id)

    //   this.currentCmp.id_subject.next(id);



    // });
    tempThis.globalservice.floor_map.subscribe(data => {
      $(document).loadSeatMap(data, (id) => {
        // alert("Seat Selected  " + " " + id)

        tempThis.globalservice.id_subject.next(id);

      });

      
    });
    let data = {};

  };

  // $(document).loadSeatMap( id => {
  //  // alert("Seat Selected  " + " " + id)

  //   tempThis.globalservice.id_subject.next(id);

  // });


//  id:string ="";

ngAfterViewInit() {
  var firstSeatLabel = 1;
  

}
}
