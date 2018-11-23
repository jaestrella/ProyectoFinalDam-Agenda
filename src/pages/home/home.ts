import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService} from '../../servicios/eventService';
import { AlertController, NavController } from 'ionic-angular';
import { Evento } from '../../modelo/evento';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  eventos: Observable<Evento[]>;
  title:string;
  start:string;
  end:string;

  calendarOptions:Options;
  displayEvent:any;
  date: any;
  eventList: any;
  selectedEvent: any;
  isSelected: any;
  events=null;
  @ViewChild(CalendarComponent) ucCalendar:CalendarComponent;
  constructor(protected eventService:EventService,public navCtrl: NavController){
    this.eventos = this.eventService.getEvents();
  }
  ionViewDidLoad(){
    this.calendarOptions={
      editable:true,
      eventLimit:false,
      header:{
        left:'prev,next,today',
        center:'title',
        right:'month,agendaWeek,agendaDay,listMonth'
      },
      events:[],
      
    };
  }

  loadEvents(){
    this.eventService.getEvents().subscribe(data =>{
      this.events=data;
    });
  }

  clickButton(model:any){
    this.displayEvent=model;
  }

  dayClick(model:any){
    console.log(model);
  }

  eventClick(model:any){
    model={
      event:{
        start:model.event.start,
        end:model.event.end,
        title:model.event.title
      },
      duration:{}
    }
    this.displayEvent=model;
  }

  updateEvent(model:any){
    model={
      event:{
        start:model.event.start,
        end:model.event.end,
        title:model.event.title,
      },
      duration:{
        _data:model.duration._data
      }
    }
    this.displayEvent=model;
  }

  nuevoEvento(){
    this.eventService.insertarEvento({title: this.title, start: this.start, end: this.end});
  }
  
}