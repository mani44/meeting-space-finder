import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MeetingRoomService } from './meeting-room.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeetingRoomFormComponent } from './meeting-room-form/meeting-room-form.component';

@Component({
  selector: 'app-meeting-room',
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.css']
})
export class MeetingRoomComponent {
  bookingForm!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private meetingRoomService: MeetingRoomService,
    private formBuilder: FormBuilder
  ) {
    this.bookingForm = this.formBuilder.group({
      roomName: [null, Validators.required],
      username: ['', Validators.required],
      date: [null, Validators.required],
      timeFrom: [null, Validators.required],
      timeTo: [null, Validators.required],
      agenda: ['', Validators.required]
    });
  }

  openDialog(): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(MeetingRoomFormComponent, {
      width: '700px',
      minHeight: '400px',
      disableClose: true,
      hasBackdrop: true,
      data: this.bookingForm.value
    });

    dialogRef.afterClosed().subscribe(result => {
      const userName = localStorage.getItem('username');
      result.username = userName;
      const { roomName, username, date, timeFrom, timeTo, agenda } = result;
      this.meetingRoomService.bookMeetingRoom(roomName, username, date, timeFrom, timeTo, agenda);
    });
  }
}
