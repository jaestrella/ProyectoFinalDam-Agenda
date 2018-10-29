import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {

  event={titulo:"",localizacion:"",mensaje:"",fechaInicio:"",fechaFin:""};

  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, private calendar:Calendar) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  save(){
    this.calendar.createEvent(this.event.titulo,this.event.localizacion,this.event.mensaje,new Date(this.event.fechaInicio),new Date(this.event.fechaFin)).then(
      (msg) =>{
        let alert=this.alertCtrl.create({
          title:'¡Éxito!',
          subTitle:'Evento creado con éxito',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.pop();
      },
      (err)=>{
        let alert=this.alertCtrl.create({
          title:'¡Fallo!',
          subTitle:err,
          buttons:['OK']
        });
        alert.present();
      }
    );
  }

}
