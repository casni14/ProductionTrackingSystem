import { Injectable }               from '@angular/core'
import { Http, Response }           from '@angular/http'
import { Headers, RequestOptions }  from '@angular/http'
import { URLSearchParams }          from '@angular/http'
import { Intersection }             from '../Classes/intersection'
import { Constants }      from '../Classes/Constants' 

import { Observable }               from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/finally'

@Injectable()
export class OrderMapService {
  private intersectionsUrl = 'http://' + Constants.trackingRestIp + ':8080/api/intersections'
  private componentTypeUrl = 'http://' + Constants.trackingRestIp + ':8080/api/components/types'

  constructor(private http: Http) { }

  getAddresses(): Observable<Intersection[]>{
    return this.http.get(this.intersectionsUrl)
                    .map(this.extractData)
                    .catch(this.handleError)
  }

  requestAutocompleteItems(): Observable<string[]> {
     return this.http.get(this.componentTypeUrl)
                     .map(this.extractData)
                     .catch(this.handleError)
  }
  getAdressesWithParams(params: string[]): Observable<Intersection[]>{
      let searchString = this.generateSearchString(params);
      
      return this.http.get(this.intersectionsUrl + "?barcode-parts=" + searchString)
                      .map(this.extractData)
                      .catch(this.handleError)
  }

  private generateSearchString(params: string[]): string{
      var searchString: string = ""
      
      for (let param of params){
        searchString += param + ","
      }
        console.log(searchString)
      return searchString
  }


/*
  addIntersection(intersectionId: number, latitude: number, longitude: number): Observable<Intersection> {
      let data = new URLSearchParams();
      data.append('intersectionId', intersectionId + "");
	    data.append('lattitude', latitude + "");
	    data.append('longitude', longitude +"");

      let getString = "intersection-id=9&longitude="+ "30"+ "&latitude=" + "30"

      let headers = new Headers({ 'Content-Type': 'x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*' })
      let options = new RequestOptions({ headers: headers})

      let url = `${this.intersectionsUrl}/${intersectionId}`

     // console.log(this.http.post(this.intersectionsUrl, data, options))

      return this.http.post(this.intersectionsUrl, getString, options)
                      .catch(this.handleError);
}*/

  private extractData(res: Response){
    let body = res.json()

    return body || {}
  }

  private handleError (error: Response | any){
    let errMsg: string
    if(error instanceof Response){
      const body = error.json() || ''
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
