import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { AddEventPage } from '../add-event/add-event';
import { NgAnalyzeModulesHost } from '@angular/compiler';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fecha:any;
  diasEnEsteMes:any;
  diasEnPasadoMes:any;
  diasEnSiguienteMes:any;
  meses:string[];
  mesActual:any;
  annoActual:any;
  fechaActual:any;
  
  listaEvento:any;
  seleccionarEvento:any;
  estaSeleccionado:any;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private calendar:Calendar) {

  }

  ionViewWillEnter(){
    this.fecha=new Date();
    this.meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    this.getMesDias();
    this.cargarEventoEsteMes();
  }

  getMesDias(){
    this.diasEnEsteMes=new Array();
    this.diasEnPasadoMes=new Array();
    this.diasEnSiguienteMes=new Array();
    this.mesActual=this.meses[this.fecha.getMonth()];
    this.annoActual=this.fecha.getFullYear();
    if(this.fecha.getMonth()===new Date().getMonth()){
      this.fechaActual=new Date().getDate();
    }else{
      this.fechaActual=999;
    }

    var primerDiaEsteMes=new Date(this.fecha.getFullYear(),this.fecha.getMonth(),0).getDay();
    var previoNumeroDias=new Date(this.fecha.getFullYear(),this.fecha.getMonth(),0).getDate();
    for(var i=previoNumeroDias-(primerDiaEsteMes-1);i<=previoNumeroDias;i++){
      this.diasEnPasadoMes.push(i);
    }

    var esteNumeroDias=new Date(this.fecha.getFullYear(),this.fecha.getMonth()+1,0).getDate();
    for(var i=0;i<esteNumeroDias;i++){
      this.diasEnEsteMes.push(i+1);
    }

    var ultimoDiaEsteMes=new Date(this.fecha.getFullYear(),this.fecha.getMonth()+1,0).getDay();
    var siguenteNumeroDias=new Date(this.fecha.getFullYear(),this.fecha.getMonth()+2,0).getDate();
    for(var i=0;i<(6-ultimoDiaEsteMes);i++){
      this.diasEnSiguienteMes.push(i+1);
    }

    var diasTotales=this.diasEnPasadoMes.length+this.diasEnEsteMes.length+this.diasEnSiguienteMes.length;

    if(diasTotales<36){
      for(var i=(7-ultimoDiaEsteMes);i<((7-ultimoDiaEsteMes)+7);i++){
        this.diasEnSiguienteMes.push(i);
      }
    }
  }

  irMesAnterior(){
    this.fecha = new Date(this.fecha.getFullYear(),this.fecha.getMonth(),0);
    this.getMesDias();
  }

  irMesSiguiente(){
    this.fecha=new Date(this.fecha.getFullYear(),this.fecha.getMonth()+2,0);
    this.getMesDias();
  }

  addEvent(){
    this.navCtrl.push(AddEventPage);
  }

  cargarEventoEsteMes(){
    this.listaEvento=new Array();
    var fechaInicio =new Date(this.fecha.getFullYear(),this.fecha.getMonth(),1);
    var fechaFin =new Date(this.fecha.getFullYear(),this.fecha.getMonth()+1,0);
    this.calendar.listEventsInRange(fechaInicio,fechaFin).then(
      (msg)=>{
        msg.forEach(item =>{
          this.listaEvento.push(item);
        });
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  marcarEvento(dia){
    var hasEvent=false;
    var fecha1=this.fecha.getFullYear()+"-"+(this.fecha.getMonth()+1)+"-"+dia+" 00:00:00";
    var fecha2=this.fecha.getFullYear()+"-"+(this.fecha.getMonth()+1)+"-"+dia+" 23:59:59";
    this.listaEvento.forEach(event =>{
      if(((event.fechaInicio >= fecha1)&&(event.fechaInicio <= fecha2))||((event.fechaFin >=fecha1)&&(event.fechaFin<=fecha2))){
        this.estaSeleccionado=true;
        this.seleccionarEvento.push(event);
      }
    });
  }

  seleccionarFecha(dia){
    this.estaSeleccionado=false;
    this.seleccionarEvento=new Array();
    var fecha1=this.fecha.getFullYear()+"-"+(this.fecha.getMonth()+1)+"-"+dia+" 00:00:00";
    var fecha2=this.fecha.getFullYear()+"-"+(this.fecha.getMonth()+1)+"-"+dia+" 23:59:59";
    this.listaEvento.forEach(event=>{
      if(((event.fechaInicio >= fecha1)&&(event.fechaInicio <= fecha2))||((event.fechaFin >= fecha1)&&(event.fechaFin <= fecha2))){
        this.estaSeleccionado=true;
        this.seleccionarEvento.push(event);
      }
    });
  }

  borrarEvento(evt){
    let alert=this.alertCtrl.create({
      title: 'Confirmar Borrado',
      message: '¿Seguro que quiere borrar este evento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler:()=>{
            console.log('Cancelar pulsado');
          }
        },
        {
          text: 'Ok',
          handler: ()=>{
            this.calendar.deleteEvent(evt.titulo,evt.localizacion,evt.mensaje,new Date(evt.fechaIncio.replace(/\s/,'T')),new Date(evt.fechaFin.replace(/\s/,'T'))).then(
              (msg)=>{
                console.log(msg);
                this.cargarEventoEsteMes();
                this.seleccionarFecha(new Date(evt.fechaIncio.replace(/\s/,'T')).getDate());
              },
              (err)=>{
                console.log(err);
              }
            )
          }
        }
      ]
    });
    alert.present();
  }

}
