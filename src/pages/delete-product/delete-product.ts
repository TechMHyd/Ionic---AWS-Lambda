import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-delete-product',
  templateUrl: 'delete-product.html'
})
export class DeleteProductPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public _menuController: MenuController) {}
 
  toggleMenu(){
    this._menuController.open();
  }

}
