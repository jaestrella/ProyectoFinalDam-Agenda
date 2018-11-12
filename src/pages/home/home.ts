import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService} from '../../providers/eventService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  calendarOptions:Options;
  displayEvent:any;
  events=null;
  @ViewChild(CalendarComponent) ucCalendar:CalendarComponent;
  constructor(protected eventService:EventService){}
  ionViewDidLoad(){
    this.calendarOptions={
      editable:true,
      eventLimit:false,
      header:{
        left:'prev,next,today',
        center:'title',
        right:'month,agendaWeek,agendaDay,listMonth'
      },
      events:[]
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
        id:model.event.id,
        start:model.event.start,
        end:model.event.end,
        title:model.event.title,
        allDay:model.event.allDay
      },
      duration:{}
    }
    this.displayEvent=model;
  }

  updateEvent(model:any){
    model={
      event:{
        id:model.event.id,
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
}
  
  


