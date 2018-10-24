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
  
  eventList:any;
  selectedEvent:any;
  isSelected:any;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private calendar:Calendar) {

  }

  ionViewWillEnter(){
    this.fecha=new Date();
    this.meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    this.getMesDias();
    //this.loadEventThisMonth();
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

  loadEventThisMonth(){
    this.eventList=new Array();
    var startDate =new Date(this.fecha.getFullYear(),this.fecha.getMonth(),1);
    var endDate =new Date(this.fecha.getFullYear(),this.fecha.getMonth()+1,0);
    this.calendar.listEventsInRange(startDate,endDate).then(
      (msg)=>{
        msg.forEach(item =>{
          this.eventList.push(item);
        });
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  checkEvent(day){
    var hasEvent=false;
    var thisDate1=this.fecha.getFullYear()+"-"+(this.fecha.getMonth()+1)+"-"+day+" 00:00:00";
    var thisDate2=this.fecha.getFullYear()+"-"+(this.fecha.getMonth()+1)+"-"+day+" 23:59:59";
    this.eventList.forEach(event =>{
      if(((event.startDate >= thisDate1)&&(event.startDate <= thisDate2))||((event.endDate >=thisDate1)&&(event.endDate<=thisDate2))){
        this.isSelected=true;
        this.selectedEvent.push(event);
      }
    });
  }

}
