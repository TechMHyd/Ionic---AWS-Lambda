import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'

import { MyApp } from './app.component';
import { LoginPage,RegisterPage,AppHomePage,AllProductsPage,DeleteProductPage,SaveNewProductPage,SearchProductPage,UpdateProductPage } from '../pages/pages.export';
import { RegisterService } from '../shared/shared-pages.export';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    AppHomePage,
    AllProductsPage,
    DeleteProductPage,
    SaveNewProductPage,
    SearchProductPage,
    UpdateProductPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    AppHomePage,
    AllProductsPage,
    DeleteProductPage,
    SaveNewProductPage,
    SearchProductPage,
    UpdateProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RegisterService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
