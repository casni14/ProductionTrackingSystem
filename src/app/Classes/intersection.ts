export class Intersection {
    intersectionAddress: string
    latitude: number
    longitude: number


    constructor(lat: number, lng: number, adr: string) {
        this.latitude = lat;
        this.longitude = lng;
        this.intersectionAddress = adr;
     }

     set setAddress(adr: string){
         this.intersectionAddress = adr;
     }


}
