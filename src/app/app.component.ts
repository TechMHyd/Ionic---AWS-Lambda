import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage,AllProductsPage,AppHomePage,DeleteProductPage,SaveNewProductPage,SearchProductPage } from '../pages/pages.export';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild(Nav) nav: Nav;
  userRole:any;
  username:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.userRole = localStorage.getItem("userRole");
      this.username = localStorage.getItem("username");
      console.log("this.userRole-PR"+this.userRole);
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

  goToSearch(){
    this.nav.push(SearchProductPage);
  }

  goToDelete(){
    this.nav.push(DeleteProductPage);
  }

  logOut(){
    localStorage.removeItem("CognitoIdentityServiceProvider.493o3rsbregssd2vj7iuvbcqje.LastAuthUser");
    localStorage.removeItem("CognitoIdentityServiceProvider.493o3rsbregssd2vj7iuvbcqje.agnimitra.accessToken");
    localStorage.removeItem("CognitoIdentityServiceProvider.493o3rsbregssd2vj7iuvbcqje.agnimitra.idToken");
    localStorage.removeItem("CognitoIdentityServiceProvider.493o3rsbregssd2vj7iuvbcqje.agnimitra.refreshToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    localStorage.removeItem("tokenId");
    this.nav.push(LoginPage);
  }
}

