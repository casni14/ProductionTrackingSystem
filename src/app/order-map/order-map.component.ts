import { Component, OnInit }  from '@angular/core'
import { MapsAPILoader }      from '@agm/core'

import { OrderMapService }    from './order-map.service'
import { Intersection }       from '../Classes/intersection'

declare var google: any

@Component({
  selector: 'app-order-map',
  templateUrl: './order-map.component.html',
  styleUrls: ['../w3.css', './order-map.component.css'],
  providers: [OrderMapService]

})
export class OrderMapComponent implements OnInit {

  intersections: Intersection[] = []
  errorMessage: string
  autocompleteItems: string[] = []
  searchParams = []
  title: string = 'Intersection overview';
  geocoder : any;

  constructor(private orderMapService: OrderMapService, private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
  this.getAdresses()
  this.requestAutoCompleteItems()
   
      this.mapsAPILoader.load().then(() => {
      console.log('google script loaded')
      this.geocoder = new google.maps.Geocoder();
      this.convertAddresses()
    })
  }

  getAdresses() {
    this.orderMapService.getAddresses()
                          .subscribe(
                            intersections => {this.intersections = intersections; this.convertAddresses();},
                            error => this.errorMessage = <any>error
                          );
  }

  requestAutoCompleteItems() {
    this.orderMapService.requestAutocompleteItems()
                          .subscribe(
                            autocompleteItems => this.autocompleteItems = autocompleteItems,
                            error => this.errorMessage = <any>error 
                          )
  }

  sortIntersections(params) {
    console.log(this.searchParams[0]);
    var stringParams: string[] = [];
    for (let object of params) {
      stringParams.push(object.value)
    }
    console.log(stringParams[0]);
    this.orderMapService.getAdressesWithParams(stringParams)
                          .subscribe(
                            intersections => {this.intersections = intersections; this.convertAddresses();},
                            error => this.errorMessage = <any>error 
                          )
  }

  /*onSubmit(intersectionId: number, latitude: number, longitude: number){
     if(!intersectionId || !latitude || !longitude) { return;}
    this.orderMapService.addIntersection(intersectionId, latitude, longitude)
                          .subscribe(
                            intersection => this.intersections.push(intersection),
                            error => this.errorMessage = <any>error
                          );
  }*/

  convertAddresses(){
    if (this.geocoder == null) return;
      var index = 0;
      for(let intersection of this.intersections){
        this.geocoder.geocode({'address': intersection.intersectionAddress}, (results, status) => {
          if(results != null){
          this.intersections[index].latitude = parseFloat(results[0].geometry.location.lat())
          this.intersections[index].longitude = parseFloat(results[0].geometry.location.lng())
          index++
          }
        })
      }
  }

 

 

}

