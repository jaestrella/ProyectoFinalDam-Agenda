import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController
  ) {
    this.myForm=this.formBuilder.group({
      email: ['',Validators.required]
    });
  }

  resetPassword(){

    console.log("Email:" + this.myForm.value.email);

    this.afAuth.auth.sendPasswordResetEmail(this.myForm.value.email)
    .then( (user) =>{
      let alert=this.alertCtrl.create({
        message: "Recivirá un link en su correo.",
        buttons: [
          {
            text:"Ok",
            role:'cancelar',
            handler:()=>{
              this.navCtrl.pop();
            }
          }  
        ]
      });
      alert.present();
    }, (error)=>{
      var errorMessage: string=error.message;
      let errorAlert=this.alertCtrl.create({
        message:errorMessage,
        buttons:[
          {
            text:"Ok",
            role:'cancelar'
          }
        ]
      });
      errorAlert.present();
    });
  }
}
