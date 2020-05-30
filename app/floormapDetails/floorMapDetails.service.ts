import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FloorMapDetailsComponent } from "./floorMapDetails.component"
import { floorMap } from '../floorMap';
@Injectable()

export class FloorMapService {

  constructor() { }
  renderMap(floors:floorMap[]): string[]{
    let mapdesign:string[]=[];
    let len=floors.length;  
    let n =Math.sqrt(len);        
   for(var i=0;i<len;i++){
       var str="";
       var j=0;
      while(j<n){     
        if(i>=len){
          alert("out of bound")

         }
         if(floors[i].spaceType=="SEAT"){
           

             str=str.concat(floors[i].code+"["+floors[i].spaceId+","+floors[i].empId+"]"); 
           
            
           
                               
          }
          else{
              str=str.concat("_");
          }
          j++;   
          i++;         
       }
       
       mapdesign.push(str);
       i-=1;
   

}
return mapdesign;
}


}