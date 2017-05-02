import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';


@Component({
  selector: 'page-search-product',
  templateUrl: 'search-product.html'
})
export class SearchProductPage {

  search={
    productId: ''
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public _menuController: MenuController) {}
 
  toggleMenu(){
    this._menuController.open();
  }

}
