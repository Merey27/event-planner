import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventServiceService} from '../../services/event-service.service';
import {EventType} from '../../shared/enum';

@Component({
  selector: 'app-create-edit-event',
  templateUrl: './create-edit-event.component.html',
  styleUrls: ['./create-edit-event.component.scss']
})
export class CreateEditEventComponent implements OnInit {

  createEventForm: FormGroup;
  eventType = EventType;
  selectedEventType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private service: EventServiceService,
    public dialogRef: MatDialogRef<CreateEditEventComponent>,
  ) { }

  ngOnInit(): void {
    this.createEventForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      place: [''],
      time: [''],
      money: [''],
      text: ['']
    });

    if (this.data.event) {
      this.createEventForm.patchValue(this.data.event);
      this.selectedEventType = this.data.event.type;
    }

    this.createEventForm.controls.type.valueChanges.subscribe(
      data => this.selectedEventType = data);

    this.setValidators();

  }

  createEvent(): void {
    if (this.createEventForm.invalid) {
      return;
    }

    if (this.data.event) {
      this.service.editEvent(this.createEventForm.getRawValue(), this.data.date);
    } else {
      this.service.createEvent(this.createEventForm.getRawValue(), this.data.date);
    }

    this.service.getEvents(this.data.date);
    this.dialogRef.close();
  }

  setValidators(): void {
    switch (this.selectedEventType) {
      case this.eventType.holidays:
        this.createEventForm.controls.place.setValidators([Validators.required]);
        this.createEventForm.controls.place.setValidators([Validators.required]);
        break;
      case this.eventType.events:
        this.createEventForm.controls.money.setValidators([Validators.required]);
        break;
      case this.eventType.remarks:
        this.createEventForm.controls.text.setValidators([Validators.required]);
        break;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
