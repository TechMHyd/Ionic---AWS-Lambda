import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { AllProductsPage,DeleteProductPage,SaveNewProductPage,SearchProductPage } from '../pages.export';

@Component({
  selector: 'page-app-home',
  templateUrl: 'app-home.html'
})
export class AppHomePage {

  userRole:any;
 
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public _menuController: MenuController) {}

 ionViewDidLoad(){
   this.userRole = localStorage.getItem("userRole");
 }

  toggleMenu(){
    this._menuController.open();
  }

  showAll(){
    this.navCtrl.push(AllProductsPage);
  }

  addNew(){
    this.navCtrl.push(SaveNewProductPage);
  }

  search(){
    this.navCtrl.push(SearchProductPage);
  }

  delete(){
    this.navCtrl.push(DeleteProductPage);
  }

}
