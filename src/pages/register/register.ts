import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder,FormGroup , Validators } from '@angular/forms'; 
import { CognitoUserPool, CognitoUserAttribute, CognitoUser,AuthenticationDetails } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
    verificationCode: any;
    verificationNo: any;

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
        Pool: ''
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
        Pool: ''
    },
    idpKey: null,
    userPool: null,
    cognitoUser: null,
    authenticationDetails: null
}

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _formBuilder:FormBuilder,
              public alertCtrl:AlertController) {}

  regForm = this._formBuilder.group({
           'email' : [null, Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)])],
          'username' : [null, Validators.compose([Validators.required])],
		      'password': [null,Validators.compose([Validators.required])]
		})

 ionViewWillEnter() {
   console.log("this.presentPrompt()"+this.presentPrompt());
  this.cognito_config.poolData.UserPoolId = this.aws_config.userPoolId;
   this.cognito_config.poolData.ClientId = this.aws_config.appClientId;
   
   var userPool = new CognitoUserPool(this.cognito_config.poolData);
   console.log("userPool:::>>>"+JSON.stringify(userPool));
	 var session = userPool.getCurrentUser();
   console.log("session::>>>>"+userPool.getCurrentUser());
   
 }   

 setUserPool(username, password){
    this.cognito_config.poolData.UserPoolId = this.aws_config.userPoolId;
	  this.cognito_config.poolData.ClientId = this.aws_config.appClientId;
    this.cognito_config.userPool = new CognitoUserPool(this.cognito_config.poolData);
    this.cognito_config.userData.Username = username;
    this.cognito_config.userData.Pool = this.cognito_config.userPool;
  //  this.cognito_config.cognitoUser = new CognitoUser(<CognitoUserPool>this.cognito_config.userData);
    var authenticationData = {
      Username : username,
      Password : password
    };
    this.cognito_config.authenticationDetails = new AuthenticationDetails(authenticationData);
    console.log("authenticationDetails"+JSON.stringify(this.cognito_config.authenticationDetails))
 }

 proceed(){
    this.setUserPool(this.signUpForm.username,this.signUpForm.password);
    var attributeList = [];
    var dataEmail = {
        Name : 'email',
        Value : this.signUpForm.email
    };
    var attributeEmail = new CognitoUserAttribute(dataEmail);
		attributeList.push(attributeEmail);

    this.cognito_config.userPool.signUp(this.signUpForm.username, this.signUpForm.password, attributeList, null, function (err, result) {
						            if (err) {
						               alert(err);
						                return;
						            }
						            
						           var cognitoUser = result.user;
                       this.presentPrompt(cognitoUser);
						           var verificationCode= prompt('Please provide verification code sent to Registered Email: ' ,'');
						            cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
						                if (err) {
						                   alert(err);
						                    return;
						                }
						               alert("User Registration SucessFul.Please Login to Application");
						            });
						        });
 }

presentPrompt(cognitoUser) {
  let alert = this.alertCtrl.create({
    title: 'Please enter the varification code from mail',
    inputs: [
      {
        name: 'verificationCode',
        placeholder: 'Verification Code'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Verify',
        handler: data => {
           
        }
      }
    ]
  });
  alert.present();
  
}

presentAlert(title,subTitle) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: subTitle,
    buttons: ['Dismiss']
  });
  alert.present();
}
}
