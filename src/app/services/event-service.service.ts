import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IEvent} from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  private eventsSubject = new BehaviorSubject([]);
  eventsObs = this.eventsSubject.asObservable();

  constructor() {}

  createEvent(data: IEvent, date): void {
    const allEvent = this.getEventsFromStorage(date);
    if (allEvent) {
      localStorage.setItem(date, JSON.stringify([...allEvent, data]));
    } else {
      localStorage.setItem(date, JSON.stringify([data]));
    }
    this.setIndexForItems(date);
  }

  setIndexForItems(date): void {
    const allEvent = this.getEventsFromStorage(date);
    allEvent.map((event, index) => event.index = index);
    localStorage.setItem(date, JSON.stringify(allEvent));
  }

  getEvents(date): void {
    const event = this.getEventsFromStorage(date);
    this.eventsSubject.next(event);
  }

  editEvent(data: IEvent, date): void {
    const allEvent = this.getEventsFromStorage(date);
    const editedEvents = allEvent.filter(item => item.index !== data.index);
    localStorage.setItem(date, JSON.stringify([...editedEvents, data]));
  }

  deleteEvent(data: IEvent, date): void {
    const allEvent = this.getEventsFromStorage(date);
    const editedEvents = allEvent.filter(item => item.index !== data.index);
    localStorage.setItem(date, JSON.stringify([...editedEvents]));
  }

  getEventsFromStorage(date): IEvent[] {
    return JSON.parse(localStorage.getItem(date));
  }
}
