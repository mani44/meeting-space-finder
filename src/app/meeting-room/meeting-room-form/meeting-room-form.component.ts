import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, MeetingRoom } from '../meeting-room.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MeetingRoomService } from '../meeting-room.service';

@Component({
  selector: 'app-meeting-room-form',
  templateUrl: './meeting-room-form.component.html',
  styleUrls: ['./meeting-room-form.component.css']
})
export class MeetingRoomFormComponent {
  bookingForm!: FormGroup;
  availableMeetingRooms: MeetingRoom[] = [];
  showSearch: boolean = true;
  showNotAvailable: boolean = false;
  today: string = '';
  minTimeForStartTime: string = '';
  minTimeForEndTime: string = '';
  showInvalidTimeSelection: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<MeetingRoomFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private meetingRoomService: MeetingRoomService) {
      const currentDateTime = new Date();  
      const currentHourForMinStartTime = currentDateTime.getHours().toString().padStart(2, '0');  
      const currentMinuteForMinStartTime = currentDateTime.getMinutes().toString().padStart(2, '0');  
      this.today = currentDateTime.toISOString().split('T')[0];  
      this.minTimeForStartTime = `${currentHourForMinStartTime}:${currentMinuteForMinStartTime}`;  
      const username = localStorage.getItem('username');
      this.bookingForm = new FormGroup({  
        username: new FormControl(username, [Validators.required]),  
        date: new FormControl(null, [Validators.required]),  
        timeFrom: new FormControl(null, [Validators.required]),  
        timeTo: new FormControl(null, [Validators.required]),  
        roomName: new FormControl(null),  
        agenda: new FormControl('')  
      });  
      this.bookingForm.controls['username'].disable();
    }

    onNoClick(): void {  
      this.dialogRef.close();  
    }  
      
    searchRooms() {  
      this.availableMeetingRooms = this.checkAvailability();  
      if (this.availableMeetingRooms.length > 0) {  
        this.bookingForm.controls['roomName'].setValidators(Validators.required);  
        this.bookingForm.controls['agenda'].setValidators(Validators.required);  
        this.bookingForm.controls['roomName'].updateValueAndValidity();  
        this.bookingForm.controls['agenda'].updateValueAndValidity();  
        this.showSearch = false;  
        this.showNotAvailable = false;  
      } else {  
        this.showNotAvailable = true;  
      }  
    }  
      
    setMinTimeForEndTime(event: any) {  
      const inputTime = event.target.value.split(':');  
      const currentTime = new Date();  
      currentTime.setHours(inputTime[0], inputTime[1]);  
      const newTime = new Date(currentTime.getTime() + 30 * 60000);  
      const newHour = newTime.getHours().toString().padStart(2, '0');  
      const newMinute = newTime.getMinutes().toString().padStart(2, '0');  
      this.minTimeForEndTime = `${newHour}:${newMinute}`;  
    }  
      
    checkAvailability(): MeetingRoom[] {  
      if (this.bookingForm.valid) {  
        const { username, roomName, date, timeFrom, timeTo, agenda } = this.bookingForm.value;  
        const startTime = this.meetingRoomService.parseTime(timeFrom);    
        const endTime = this.meetingRoomService.parseTime(timeTo);  
        if(this.meetingRoomService.isValidTime(startTime) && this.meetingRoomService.isValidTime(endTime) && this.meetingRoomService.isValidBookingDuration(startTime, endTime)) {  
          this.showInvalidTimeSelection = false;  
          return this.meetingRoomService.checkAvailability(date, startTime, endTime);  
        }  
        else {  
          this.showInvalidTimeSelection = true;  
          return [];  
        }  
      }  
      else {  
        return [];  
      }  
    }  

}   
