import { Component } from '@angular/core';
import { NavController, NavParams, MenuController,LoadingController } from 'ionic-angular';

import { InsertNewService } from '../../shared/shared-pages.export';

@Component({
  selector: 'page-save-new-product',
  templateUrl: 'save-new-product.html'
})
export class SaveNewProductPage {

  productInput:any = {
    productID:'',
    productName:'',
    category:'',
    price:'',
    quantity:'',
    model: ''
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public _menuController: MenuController,
              public _insertNewService:InsertNewService,
              public _loadingController:LoadingController) {}
 
  toggleMenu(){
    this._menuController.open();
  }

  save(){
        console.log(this.productInput);
        let loader = this._loadingController.create({
            content: "Loading..."
    });
    loader.present().then(() =>{
          this._insertNewService.saveNewProduct(this.productInput)
                              .subscribe(data => {
                                if(data == "New Record Saved Successfully.."){
                                  alert("Added Successfully");
                                  this.productInput = {
                                    productID:'',
                                    productName:'',
                                    category:'',
                                    price:'',
                                    quantity:'',
                                    model: ''
                                  }
                                }
                                loader.dismiss();
                              },
                              error => {
                                alert(error);
                                loader.dismiss();
                            }
                              );
    })
        
    }
}
