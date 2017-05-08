import { Component } from '@angular/core';
import { NavController, NavParams, MenuController,LoadingController } from 'ionic-angular';

import { SearchService } from '../../shared/shared-pages.export';

@Component({
  selector: 'page-search-product',
  templateUrl: 'search-product.html'
})
export class SearchProductPage {
    productDetails: any=[{
        productModel:{  
            s:""
         },
         Category:{  
            s:""
         },
         productID:{  
            s:""
         },
         Price:{  
            n:""
         },
         Quantity:{  
            n:""
         },
         productName:{  
            s:"" 
        },
    }];;

    productId: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public _menuController: MenuController,
              private _searchService:SearchService,
              public _loadingController:LoadingController) {}
 
  toggleMenu(){
    this._menuController.open();
  }

  search(){
    let loader = this._loadingController.create({
            content: "Loading..."
    });
    loader.present().then(() =>{
      this._searchService.doSearch(this.productId)
                        .subscribe(data =>{
                            this.productDetails = JSON.parse(data._body).items;
                            if(this.productDetails.length === 0){
                              alert("Not Found");
                              this.productId = '';
                            }
                            loader.dismiss();
                        },
                        error => {
                                alert(error);
                                loader.dismiss();
                            });
    })
    
  }

  modifyString(str){
    return "'" + str + "'";
  }

}
