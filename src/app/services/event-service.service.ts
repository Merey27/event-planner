import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  private eventsSubject = new BehaviorSubject([]);
  eventsObs = this.eventsSubject.asObservable();

  constructor() {}

  createEvent(data, date): void {
    const allEvent = JSON.parse(localStorage.getItem(date));
    if (allEvent) {
      localStorage.setItem(date, JSON.stringify([...allEvent, data]));
    } else {
      localStorage.setItem(date, JSON.stringify([data]));
    }
  }

  getEvents(data): void {
    const event = JSON.parse(localStorage.getItem(data));
    this.eventsSubject.next(event);
  }

  editEvent(data, date): void {
    const allEvent = JSON.parse(localStorage.getItem(date));
    const editedEvents = allEvent.filter(item => item.title !== data.title);
    localStorage.setItem(date, JSON.stringify([data, ...editedEvents]));
  }

  deleteEvent(data: any, date): void {
    const allEvent = JSON.parse(localStorage.getItem(date));
    const editedEvents = allEvent.filter(item => item.title !== data.title);
    localStorage.setItem(date, JSON.stringify([...editedEvents]));
  }
}
