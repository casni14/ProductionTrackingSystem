import { Injectable } from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from "@angular/http"

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Customer } from '../Classes/customer';
import { Constants }      from '../Classes/Constants' 

@Injectable()
export class CustomerService {
  private customerUrl = 'http://' + Constants.trackingRestIp + ':8080/api/clients'

  constructor(private http: Http) { }

  getCustomer(): Observable<Customer[]>{
    return this.http.get(this.customerUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  addCustomer(name: string, sapid: number): Observable<Customer> {
	  let data = new URLSearchParams();
	  data.append('name', name);
	  data.append('sap-id', sapid +"");
      let headers = new Headers({'Access-Control-Allow-Origin': '*' })
      let options = new RequestOptions({ headers: headers})

      return this.http.post(this.customerUrl, data, options)
                      .map(this.extractData)
                      .catch(this.handleError);
}

editCustomer(name: string, sapid: number, id: number) : Observable<Customer> {
  console.log("hello")
   let data = new URLSearchParams();
    data.append('id', id + "");
	  data.append('name', name);
	  data.append('sap-id', sapid +"");
      let headers = new Headers({'Access-Control-Allow-Origin': '*' })
      let options = new RequestOptions({ headers: headers})

      return this.http.put(this.customerUrl, data, options)
                      .map(this.extractData)
                      .catch(this.handleError);
} 

  deleteCustomer(customerId: number): Observable<Response> {
    let headers = new Headers({'Access-Control-Allow-Origin': '*' })
    let options = new RequestOptions({ headers: headers})
    return this.http.delete(this.customerUrl+ "?id=" + customerId, options);
  } 

  private extractData(res: Response){
    let body = res.json();
    console.log(body)
    return body || {};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if(error instanceof Response){
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

