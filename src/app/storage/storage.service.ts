import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Headers, RequestOptions } from '@angular/http';


import { Observable } from 'rxjs/Observable'
import { StorageViewComponent } from '../Classes/order' 
import { Constants }      from '../Classes/Constants' 

@Injectable()
export class StorageService {
  
  private componentUrl = 'http://' + Constants.trackingRestIp + ':8080/api/components'

  constructor(private http: Http) { }

  getComponents(): Observable<StorageViewComponent[]> {
    return this.http.get(this.componentUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  deleteComponents(componentId: number): Observable<Response> {
    let headers = new Headers({'Access-Control-Allow-Origin': '*' })
    let options = new RequestOptions({ headers: headers})
    return this.http.delete(this.componentUrl+ "?id=" + componentId, options);
  } 

  private extractData(res: Response) {
    let body = res.json();
    console.log("json: " + body)
    return body || {}
  }

  private handleError (error: Response | any){
    let errMsg: string
    if(error instanceof Response){
      const body = error.json() || ''
      const err = body.error || JSON.stringify(body)
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error("fis:" +errMsg)
    return Observable.throw(errMsg)
  }

}
