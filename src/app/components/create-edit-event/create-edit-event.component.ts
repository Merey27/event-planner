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
      place: ['', Validators.required],
      time: ['', Validators.required],
      money: ['', Validators.required],
      text: ['', Validators.required]
    });

    this.createEventForm.controls.type.valueChanges.subscribe(
      data => this.selectedEventType = data);
  }

  createEvent(): void {
    if (this.createEventForm.invalid) {
      return;
    }

    this.service.createEvent(this.createEventForm.getRawValue(), this.data.date);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
