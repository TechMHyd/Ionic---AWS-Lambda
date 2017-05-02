import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';


@Component({
  selector: 'page-save-new-product',
  templateUrl: 'save-new-product.html'
})
export class SaveNewProductPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public _menuController: MenuController) {}
 
  toggleMenu(){
    this._menuController.open();
  }
}
