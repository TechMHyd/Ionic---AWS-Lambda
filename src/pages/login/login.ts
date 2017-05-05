import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FormBuilder,FormGroup , Validators } from '@angular/forms'; 
import { CognitoUserPool, CognitoUserAttribute, CognitoUser,AuthenticationDetails } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

import { RegisterPage,AppHomePage } from '../pages.export';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  login={
    username:'admin',
    password: 'Techm123$',
    role:'admin'
  }

  signUpForm={
    email:'',
    username:'',
    password:''
  }
  
  aws_config = {
    userPoolId: 'us-east-1_P8Tghqyud',
    appClientId: '493o3rsbregssd2vj7iuvbcqje',
    identityPoolId: 'us-east-1:883587243396:userpool/us-east-1_P8Tghqyud',
    region: 'us-east-1'	
  };

  admin_aws_config = {
    userPoolId: 'us-east-1_k3YSBGNhr',
	  appClientId: '7kk2jb00h2o6m6pd0k26fnspgk',
    identityPoolId: 'us-east-1:883587243396:userpool/us-east-1_k3YSBGNhr',
    region: 'us-east-1'
  }

  admin_cognito_config = {
    language: "",
    poolData: {
    	UserPoolId: '',
    	ClientId: ''
    },
    userData: {
        Username: '',
        Pool: null
    },
    idpKey: null,
    userPool: null,
    cognitoUser: null,
    authenticationDetails: null
}

cognito_config= {
    language: "",
    poolData: {
        UserPoolId: '',
        ClientId: ''
    },
    userData: {
        Username: '',
        Pool: null
    },
    idpKey: null,
    userPool: null,
    cognitoUser: null,
    authenticationDetails: null
}


  constructor(public navCtrl: NavController,
              public _formBuilder:FormBuilder,
              public _loadingController:LoadingController) {
               
  }
  authForm = this._formBuilder.group({
          'username' : [null, Validators.compose([Validators.required])],
		      'password': [null,Validators.compose([Validators.required])],
          'role': [null,Validators.compose([Validators.required])]
		})

  register(){
    this.navCtrl.push(RegisterPage);
  }  

  ionViewWillEnter(){
    this.cognito_config.poolData.UserPoolId = this.aws_config.userPoolId,
    this.cognito_config.poolData.ClientId = this.aws_config.appClientId
    var userPool = new CognitoUserPool(this.cognito_config.poolData);
    var session = userPool.getCurrentUser();
    console.log("session::>>"+JSON.stringify(session));
   if (session != null) {
       this.navCtrl.push(AppHomePage);
    }else{
      
    }
  }

  setUserPool(username, password){
      this.cognito_config.poolData.UserPoolId = this.aws_config.userPoolId,
      this.cognito_config.poolData.ClientId = this.aws_config.appClientId
      this.cognito_config.userPool = new CognitoUserPool(this.cognito_config.poolData);
      this.cognito_config.userData.Username = username;
      this.cognito_config.userData.Pool = this.cognito_config.userPool;
      this.cognito_config.cognitoUser = new CognitoUser(this.cognito_config.userData);
      var authenticationData = {
        Username : username,
        Password : password
      };
      this.cognito_config.authenticationDetails = new AuthenticationDetails(authenticationData);
  }

  setAdminPool(username, password){
      this.admin_cognito_config.poolData.UserPoolId = this.admin_aws_config.userPoolId,
      this.admin_cognito_config.poolData.ClientId = this.admin_aws_config.appClientId
      this.admin_cognito_config.userPool = new CognitoUserPool(this.admin_cognito_config.poolData);
      this.admin_cognito_config.userData.Username = username;
      this.admin_cognito_config.userData.Pool = this.admin_cognito_config.userPool;
      this.admin_cognito_config.cognitoUser = new CognitoUser(this.admin_cognito_config.userData);
        var authenticationData = {
          Username : username,
          Password : password
        };
      this.admin_cognito_config.authenticationDetails = new AuthenticationDetails(authenticationData);
  }

  authenticateUser(){
    localStorage.setItem("username",this.cognito_config.cognitoUser.username);
    var key = this.cognito_config.idpKey;
    var IdentityPoolIdValue = this.aws_config.identityPoolId;
    var cognitoUserValue = this.cognito_config.cognitoUser;
    this.cognito_config.idpKey = ('cognito-idp.'+ this.aws_config.region + '.amazonaws.com/' + this.aws_config.userPoolId);
    var navigate = this.navCtrl;
    let loader = this._loadingController.create({
            content: "Loading..."
    });
      loader.present().then(() =>{
        this.cognito_config.cognitoUser.authenticateUser(this.cognito_config.authenticationDetails,
        {  									
          onSuccess : function(result) {
              
            var tokenId = result.getIdToken().getJwtToken();  	
            localStorage.setItem("tokenId",tokenId);
            
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                  IdentityPoolId : IdentityPoolIdValue, 
              Logins : {
                        key : result.getIdToken().getJwtToken()
                  }
                });
            
            cognitoUserValue
                .getUserAttributes(function(err,result) {
                  if (err) {
                    alert(err);
                    loader.dismiss();
                  }
                  
                });
            
            loader.dismiss();
            navigate.push(AppHomePage);
          },
          onFailure : function(err) {
            alert(err);
            loader.dismiss();
          }

        });
      })

    
  }

  authenticateAdmin(){
    var admin_cognito_config = this.admin_cognito_config;
    var admin_aws_config = this.admin_aws_config;
    var loginForm = this.login;
    var navCtrl = this.navCtrl;
    let loader = this._loadingController.create({
            content: "Loading..."
    });
      loader.present().then(() =>{
        this.admin_cognito_config.cognitoUser.authenticateUser(this.admin_cognito_config.authenticationDetails,
            {  									
              onSuccess : function(result) {
               localStorage.setItem("username",admin_cognito_config.cognitoUser.username);
                var tokenId = result.getIdToken().getJwtToken();  	
                localStorage.setItem("tokenId",tokenId);
                admin_cognito_config.idpKey = ('cognito-idp.'+ admin_aws_config.region + '.amazonaws.com/' + admin_aws_config.userPoolId);
                var key = admin_cognito_config.idpKey;
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                      IdentityPoolId : admin_aws_config.identityPoolId, 
                  Logins : {
                            key : result.getIdToken().getJwtToken()
                      }
                    });
                
                admin_cognito_config.cognitoUser
                    .getUserAttributes(function(err,result) {
                      if (err) {
                      }
                      loader.dismiss();
                    });
                loader.dismiss();
                navCtrl.push(AppHomePage);
                
              },
              onFailure : function(err) {
               alert(err);
                   loader.dismiss();
              },

              newPasswordRequired : function(userAttributes,requiredAttributes) {
                var newPassword = loginForm.password;
                userAttributes.email = 'ad00440946@techmahindra.com';
                console.log(userAttributes.email);
                admin_cognito_config.cognitoUser.completeNewPasswordChallenge(newPassword,userAttributes,this)
              }
            });
      })
    
  }

  proceed(){
    console.log(this.login);
    
    localStorage.setItem("userRole",this.login.role);
    let loader = this._loadingController.create({
            content: "Loading..."
    });
    loader.present().then(() =>{
           if(this.login.role == "user"){
              this.setUserPool(this.login.username,this.login.password);
              this.authenticateUser();
            
            }
            else if(this.login.role == "admin") {
              this.setAdminPool(this.login.username,this.login.password);
              this.authenticateAdmin();
            
              }
            loader.dismiss();
        })

    
  }
  
}
