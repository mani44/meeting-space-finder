import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MeetingRoomService } from '../meeting-room/meeting-room.service';
import { Booking, MeetingRoom } from '../meeting-room/meeting-room.model';

@Component({
  selector: 'app-rooms-meeting-details',
  templateUrl: './rooms-meeting-details.component.html',
  styleUrls: ['./rooms-meeting-details.component.css']
})
export class RoomsMeetingDetailsComponent implements OnInit, OnDestroy {
  selectedRoom: string = '';
  roomMeetings: Booking[] = [];
  meetingRooms: MeetingRoom[] = [];
  subscriptions: Subscription[] = [];

  constructor(private meetingRoomService: MeetingRoomService) {
  }

  ngOnInit(): void {
    this.meetingRooms = this.meetingRoomService.getMeetingRooms();
    this.subscriptions.push(
      this.meetingRoomService.bookedRoom$.subscribe(() => {
        this.meetingRooms = this.meetingRoomService.getMeetingRooms();
        this.onRoomSelectionChange({ target: { value: this.selectedRoom } });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onRoomSelectionChange(event: any) {
    this.selectedRoom = event.target.value;
    // Find the selected room  
    const room = this.meetingRooms.find(meeting => meeting.name === this.selectedRoom);
    this.roomMeetings = room ? room.bookings : [];
  }
}
