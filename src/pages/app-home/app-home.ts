import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-app-home',
  templateUrl: 'app-home.html'
})
export class AppHomePage {
 
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public _menuController: MenuController) {}
 
  toggleMenu(){
    this._menuController.open();
  }

  

}
