import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import 'rxjs/add/observable/of';
import { Evento } from '../modelo/evento';
@Injectable()
export class EventService{
    private eventosRef:AngularFireList<any>;
    constructor(private db: AngularFireDatabase) {
        this.eventosRef = this.db.list<Evento>('/agenda');
    }
    public getEvents():Observable<Evento[]>{
        let data:any=[
        {
            title:'partido',
            start:'2018-12-01T16:00:00',
            end:'2018-12-04'
        }];
          return Observable.of(data);
    }

    insertarEvento(evento:Evento) {
        this.eventosRef.push(evento);
    }
    
    eliminarEvento(evento:Evento) {
        this.eventosRef.remove(evento.key);
    }
    
}