import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AllProductsService {

    baseUrl= 'https://wwzdkqw72c.execute-api.us-east-1.amazonaws.com/dev';

    constructor(private _http:Http) { }

    getAllProducts():Observable<any>{
        let api= '/getallproducts';
        let tokenId= localStorage.getItem("tokenId");
        let headers      = new Headers({ 'Authorization': tokenId }); 
        let options       = new RequestOptions({ headers: headers }); 
        return this._http.get(this.baseUrl+api,options)
                         .map((response:Response)=>{
                             console.log(response);
                             return response;
                         })
                            

    }
}