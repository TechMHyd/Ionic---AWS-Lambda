import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder,FormGroup , Validators } from '@angular/forms'; 

import { RegisterPage,AppHomePage } from '../pages.export';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  login={
    username:'agnimitra',
    password: 'agnimitra',
    role:'user'
  }

  constructor(public navCtrl: NavController,public _formBuilder:FormBuilder) {

  }
  authForm = this._formBuilder.group({
          'username' : [null, Validators.compose([Validators.required])],
		      'password': [null,Validators.compose([Validators.required])],
          'role': [null,Validators.compose([Validators.required])]
		})

  register(){
    this.navCtrl.push(RegisterPage);
  }  

  proceed(){
    console.log(this.login);
    this.navCtrl.push(AppHomePage);
  }
  
}
