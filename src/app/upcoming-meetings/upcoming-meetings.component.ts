import { Subscription } from 'rxjs';
import { MeetingRoomService } from './../meeting-room/meeting-room.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-meetings',
  templateUrl: './upcoming-meetings.component.html',
  styleUrls: ['./upcoming-meetings.component.css']
})
export class UpcomingMeetingsComponent implements OnInit, OnDestroy {
  upcomingMeetings: any[] = [];
  subscriptions: Subscription[] = [];
  constructor(private meetingRoomService: MeetingRoomService) { }

  ngOnInit() {
    this.upcomingMeetings = this.meetingRoomService.getUpcomingMeetings();
    this.subscriptions.push(
      this.meetingRoomService.bookedRoom$.subscribe(() => {
        this.upcomingMeetings = this.meetingRoomService.getUpcomingMeetings();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  deleteMeeting(meetingId: any){
    if(this.meetingRoomService.deleteMeetingById(meetingId)){
      this.upcomingMeetings = this.meetingRoomService.getUpcomingMeetings();
    }
    else{
      console.log('Error while deleting the meeting');
    }
  }
}
