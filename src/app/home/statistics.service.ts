import { Injectable } from '@angular/core';
import { Constants } from "../Classes/Constants";
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs";
import { Order } from '../Classes/order';
import { DatePipe } from "@angular/common";



@Injectable()
export class StatisticsService {
  
  datePipe: DatePipe;
  private orderUrl = 'http://' + Constants.trackingRestIp + ':8080/api/orders'

  constructor(private http: Http) { 
    this.datePipe = new DatePipe('en-US');
  }

  getOrders(monthsBack:number): Observable<Order[]>{
    var d = new Date();
    d.setMonth(d.getMonth() - monthsBack);

    let data = new URLSearchParams();
    data.append('start', this.datePipe.transform(d, 'MM/dd/yyyy'));
    data.append('end', this.datePipe.transform(new Date(), 'MM/dd/yyyy'));

    return this.http.get(this.orderUrl, data).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    body.forEach((d) => {
      d.createdAt = new Date(d.createdAt);
      d.updatedAt = new Date(d.updatedAt);
    });
    return body || {};
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
