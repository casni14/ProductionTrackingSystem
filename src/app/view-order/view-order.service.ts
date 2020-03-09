import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http'
 
import { Observable } from 'rxjs/Observable'
import { Order }      from '../Classes/order' 
import { Constants }      from '../Classes/Constants' 

@Injectable()

export class ViewOrderService {
  private orderUrl = 'http://' + Constants.trackingRestIp + ':8080/api/orders'


  constructor(private http: Http) { }

    getOrder(startDate: string, endDate: string): Observable<Order[]>{
     
      var prosessedString: string  = this.processUrlString(startDate, endDate)

      return this.http.get(prosessedString)
                      .map(this.extractData)
                      .catch(this.handleError)
    }

    private processUrlString(startDate: string, endDate: string): string{
      if(startDate != undefined && endDate != undefined){
        var urlSearchString: string = this.orderUrl + "?start=" + startDate + "%2000:00:00" + "&end=" + endDate + "%2000:00:00" 
        return urlSearchString
      } else if(startDate != undefined && endDate == undefined){
        var urlSearchString: string = this.orderUrl + "?start=" + startDate + "%2000:00:00"
        return urlSearchString
      } else{
        return this.orderUrl
      }
    }

    deleteOrder(orderId: number): Observable<Response> {
      let headers = new Headers({'Access-Control-Allow-Origin': '*' })
      let options = new RequestOptions({ headers: headers})
      return this.http.delete(this.orderUrl+ "?id=" + orderId + "&release-components=true" + "&delete-components=true", options);
    } 

    private extractData(res: Response) {
      let body = res.json();
      console.log(body)
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
      console.error(errMsg)
      return Observable.throw(errMsg)
    }

}
