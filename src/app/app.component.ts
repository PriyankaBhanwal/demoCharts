import { ElementRef, ViewChild } from '@angular/core';
import { Component ,OnInit} from '@angular/core';
import {HttpClient } from '@angular/common/http'
declare var Plotly: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'charts';
  selectedDevice:any;
  graph1:any;
  mapData: any;
  factors = [
  {
    id: "red", name: "a"
  },
  {
    id: "yellow", name: 'b'
  },
  {
    id: "blue", name: 'c'
  }
  ];
  graph = {
      data :[
        {
       type: 'scattergeo',
       mode: 'markers+text',
       text: [
           'Montreal', 'Toronto', 'Vancouver', 'Calgary', 'Edmonton',
           'Ottawa', 'Halifax', 'Victoria', 'Winnepeg', 'Regina'
       ],
       lon: [
           -73.57],
       lat: [
           45.5
       ],
       marker: {
           size: 7,
           color: 
               '#bebada',
           line: {
               width: 1
           }
       },
       name: 'Canadian cities',
       textposition: [
           'top right', 'top left', 'top center', 'bottom right', 'top right',
           'top left', 'bottom right', 'bottom left', 'top right', 'top right'
       ],
   }],
   
    layout : {
       title: 'Canadian cities',
       font: {
           family: 'Droid Serif, serif',
           size: 6
       },
       titlefont: {
           size: 16
       },
       geo: {
           scope: 'north america',
           resolution: 50,
           lonaxis: {
               'range': [-130, -55]
           },
           lataxis: {
               'range': [40, 70]
           },
           showrivers: true,
           rivercolor: '#fff',
           showlakes: true,
           lakecolor: '#fff',
           showland: true,
           landcolor: '#EAEAAE',
           countrycolor: '#d3d3d3',
           countrywidth: 1.5,
           subunitcolor: '#d3d3d3'
       }
   }
  };

constructor(private http: HttpClient) {
  this.selectedDevice=this.factors[0].name;
}

ngOnInit(){
  console.log(this.selectedDevice,'this.sel')
  
this.http.get('assets/dataFile.json').subscribe(data => {
  console.log(data)
  this.mapData = data;
  this.callGraph(this.mapData);
})  
}

onChange(val: any){
console.log(val,'val');
this.selectedDevice = val;
console.log(this.selectedDevice,'this.selected')
this.graph1.data[0].marker.color = this.selectedDevice;
}

 callGraph(ObjectData: any) {
   console.log(ObjectData,'hi');
   for(let i=0;i<ObjectData.length; i++) {
     this.graph.data[0].lat[i] = ObjectData[i].lat;
     this.graph.data[0].lon[i] = ObjectData[i].lon;
     
   }
   console.log(this.graph)
   this.graph1=this.graph;
  
 }
}







