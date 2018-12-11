import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class EventService{
    
    public getEvents():Observable<any>{
        let data:any=[
        {
            title:'partido',
            start:'2018-12-01T16:00:00',
            end:'2018-12-04'
        }];
          return Observable.of(data);
    }

    
}