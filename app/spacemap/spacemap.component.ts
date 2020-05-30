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
  selector: 'app-department-list',
  templateUrl: './spacemap.component.html',
  styleUrls: ['./spacemap.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SpacemapComponent implements OnInit {
  value: boolean;
  show: boolean = false;

  loader:boolean=false;
  constructor(private globalservice: GlobalService, private _ffloor: GlobalService) { }
  reloadiv: boolean = false;
  ngOnInit() {

    this.reloadiv = true;
    this._ffloor.ffloor.subscribe(data => {
      this.reloadiv = data;
      this.loader=!data;
    }
    );

    const tempThis = this;
    $(document).ready(function () {
      $(".cll").click(function () {
        $(".req3").show();
        $(".treqq").hide();

      });
      $("#seat-map").click(function () {
        $(".req3").show();
        $(".treqq").hide();

      });
      $(".treq").click(function () {
        $(".treqq").show();
         $(".req3").hide();
      });

      // toggle()

      // let currentCmp = this;
      tempThis.globalservice.floor_map.subscribe(data => {
        $(document).loadSeatMap(data, (id) => {

          // alert("Seat Selected  " + " " + id)

          tempThis.globalservice.id_subject.next(id);

        });
      });
      let data = {};



      // $(document).loadSeatMap(function test(id) {
      //   alert("Seat Selected  " + " " + id)

      //   this.currentCmp.id_subject.next(id);



      // });



      $(document).loadSeatMap((id) => {
        //alert("Seat Selected  " + " " + id)

        tempThis.globalservice.id_subject.next(id);
      });
    });
  }
  //  id:string ="";
  dio() {
    this.value = true;


  }
  ngAfterViewInit() {
    var firstSeatLabel = 1;
  }
}
