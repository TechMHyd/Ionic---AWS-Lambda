import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RegisterService {

    baseUrl: any = '';

    constructor(private _http:Http) { }

    doRegister(data: Object): Observable<any>{
        let api = ''
        let headers      = new Headers({ 'Content-Type': 'application/json' }); 
        let options       = new RequestOptions({ headers: headers }); 

        return this._http.post((this.baseUrl+api),data,options)
                       
    }
}