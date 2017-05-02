import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage,AllProductsPage,AppHomePage,DeleteProductPage,SaveNewProductPage,SearchProductPage,UpdateProductPage } from '../pages/pages.export';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goToHome(){
    this.nav.push(AppHomePage);
  }

  goToAll(){
    this.nav.push(AllProductsPage);
  }

  goToAddNew(){
    this.nav.push(SaveNewProductPage);
  }

  goToUpdate(){
    this.nav.push(UpdateProductPage);
  }

  goToSearch(){
    this.nav.push(SearchProductPage);
  }

  goToDelete(){
    this.nav.push(DeleteProductPage);
  }

  logOut(){
    this.nav.push(LoginPage);
  }
}

