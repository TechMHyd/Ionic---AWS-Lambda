import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-all-products',
  templateUrl: 'all-products.html'
})
export class AllProductsPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public _menuController: MenuController) {}
 
  toggleMenu(){
    this._menuController.open();
  }

}
