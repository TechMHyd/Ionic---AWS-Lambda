import { Component } from '@angular/core';
import { NavController, NavParams, MenuController,LoadingController } from 'ionic-angular';

import { AllProductsService } from '../../shared/shared-pages.export';

@Component({
  selector: 'page-all-products',
  templateUrl: 'all-products.html'
})
export class AllProductsPage {

  allProducts:any=[{
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
    }];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public _menuController: MenuController,
              private _allProductsService:AllProductsService,
              public _loadingController:LoadingController) {}
 
  toggleMenu(){
    this._menuController.open();
  }

  ionViewDidLoad(){
    let loader = this._loadingController.create({
            content: "Loading..."
    });

    loader.present().then(() =>{
            this._allProductsService.getAllProducts()
                  .subscribe(data =>{
                    this.allProducts = JSON.parse(data._body).items;
                    loader.dismiss();
                  })
            
        })
   
  }

}
