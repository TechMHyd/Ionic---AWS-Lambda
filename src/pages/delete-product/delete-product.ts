import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { DeleteProductsService } from '../../shared/shared-pages.export';

@Component({
  selector: 'page-delete-product',
  templateUrl: 'delete-product.html'
})
export class DeleteProductPage {

  productId:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public _menuController: MenuController,
              private _deleteProductsService:DeleteProductsService,
              public _loadingController:LoadingController) {}
 
  toggleMenu(){
    this._menuController.open();
  }

  delete(){
    let loader = this._loadingController.create({
            content: "Loading..."
    });
    loader.present().then(() =>{
        this._deleteProductsService.deleteAProduct(this.productId)
                                .subscribe(data => {
                                  console.log(data._body);
                                  alert("Deleted Successfully!");
                                  this.productId = '';
                                  loader.dismiss();
                              });
    })
    
  }

}
