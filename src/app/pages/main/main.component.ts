import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CreateEditEventComponent} from '../../components/create-edit-event/create-edit-event.component';
import {DatePipe} from '@angular/common';
import {EventServiceService} from '../../services/event-service.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [DatePipe]
})
export class MainComponent implements OnInit {
  dateValue: any;
  events: Observable<any[]>;

  constructor(
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private service: EventServiceService,
  ) {
  }

  ngOnInit(): void {
    this.dateValue = new Date();
    this.service.getEvents(this.datePipe.transform(this.dateValue, 'shortDate'));

    this.events = this.service.eventsObs;
  }

  dateSelected(): void {
    this.service.getEvents(this.datePipe.transform(this.dateValue, 'shortDate'));
  }

  createEvent(): void {
    this.dialog.open(CreateEditEventComponent, {
      data: {
        title: 'Добавить событие',
        date: this.datePipe.transform(this.dateValue, 'shortDate') ,
      },
      width: '400px'
    });
  }

  editEvent(event: any): void {
    this.dialog.open(CreateEditEventComponent, {
      data: {
        title: 'Редактировать событие',
        date: this.datePipe.transform(this.dateValue, 'shortDate'),
        event
      },
      width: '400px'
    });
  }

  deleteEvent(event: any): void {
    const date = this.datePipe.transform(this.dateValue, 'shortDate');
    this.service.deleteEvent(event, date);
    this.service.getEvents(date);
  }
}
