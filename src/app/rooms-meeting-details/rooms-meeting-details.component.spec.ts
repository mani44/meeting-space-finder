import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsMeetingDetailsComponent } from './rooms-meeting-details.component';
import { MeetingRoomService } from '../meeting-room/meeting-room.service';
import { of } from 'rxjs';

describe('RoomsMeetingDetailsComponent', () => {
  let component: RoomsMeetingDetailsComponent;
  let fixture: ComponentFixture<RoomsMeetingDetailsComponent>;
  let meetingRoomService: MeetingRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsMeetingDetailsComponent],
      providers: [MeetingRoomService],
    });
    fixture = TestBed.createComponent(RoomsMeetingDetailsComponent);
    component = fixture.componentInstance;
    meetingRoomService = TestBed.inject(MeetingRoomService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize meetingRooms on ngOnInit', () => {  
    const meetingRooms = [{ name: 'Room A', bookings: [] }, { name: 'Room B', bookings: [] }];  
    spyOn(meetingRoomService, 'getMeetingRooms').and.returnValue(meetingRooms);  
  
    component.ngOnInit();  
  
    expect(component.meetingRooms).toEqual(meetingRooms);  
  });  
  
  it('should unsubscribe from subscriptions on ngOnDestroy', () => {  
    const unsubscribeSpy = spyOn(component.subscriptions[0], 'unsubscribe');  
  
    component.ngOnDestroy();  
  
    expect(unsubscribeSpy).toHaveBeenCalled();  
  });  
  
  it('should update selectedRoom and roomMeetings on room selection change', () => {  
    const meetingRooms = [{ name: 'Room A', bookings: [] }, { name: 'Room B', bookings: [] }];  
    component.meetingRooms = meetingRooms;  
    const event = { target: { value: 'Room A' } };  
  
    component.onRoomSelectionChange(event);  
  
    expect(component.selectedRoom).toEqual('Room A');  
    expect(component.roomMeetings).toEqual([]);  
  }); 
});
