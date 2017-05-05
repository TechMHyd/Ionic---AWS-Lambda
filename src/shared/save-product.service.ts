import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class InsertNewService {

    baseUrl = 'https://pr7w5v87p0.execute-api.us-east-1.amazonaws.com/dev';

    constructor(private _http:Http) { }

    saveNewProduct(dataInput:any):Observable<any>{
        let api= '/savenewproduct';
        let tokenId= localStorage.getItem("tokenId");
        let headers      = new Headers({ 'Authorization': tokenId }); 
        let options       = new RequestOptions({ headers: headers }); 

        return this._http.post(this.baseUrl+api,dataInput,options)
                        .map((response:Response) =>{
                            return response.json();
                        })

    }

}