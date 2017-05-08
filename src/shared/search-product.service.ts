import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

    baseUrl= 'https://3yznlsrs97.execute-api.us-east-1.amazonaws.com/dev';

    constructor(private _http:Http) { }

    doSearch(productID:any):Observable<any>{
        let api= '/searchproduct';
        let tokenId= localStorage.getItem("tokenId");
        let headers  = new Headers({ 'Authorization': tokenId }); 
        let options  = new RequestOptions({ headers: headers }); 
        return this._http.post(this.baseUrl+api,productID,options)
                         .map((response:Response)=>{
                             return response;
                         })
    }
}