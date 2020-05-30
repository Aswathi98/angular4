/* SystemJS module definition */
declare var module: NodeModule;
declare var jsSeatMap: any;
interface NodeModule {
  id: string;
}


interface JQuery {
  loadSeatMap(options?: any): any;
}