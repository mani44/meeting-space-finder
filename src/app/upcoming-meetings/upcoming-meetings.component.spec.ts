import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpcomingMeetingsComponent } from './upcoming-meetings.component';
import { MeetingRoomService } from '../meeting-room/meeting-room.service';

describe('UpcomingMeetingsComponent', () => {
  let component: UpcomingMeetingsComponent;
  let fixture: ComponentFixture<UpcomingMeetingsComponent>;
  let meetingRoomService: MeetingRoomService;  

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingMeetingsComponent],
      providers: [MeetingRoomService]
    });
    fixture = TestBed.createComponent(UpcomingMeetingsComponent);
    component = fixture.componentInstance;
    meetingRoomService = TestBed.inject(MeetingRoomService); 
    fixture.detectChanges();
  });

  it('should create the component', () => {  
    expect(component).toBeTruthy();  
  });  
  
  it('should initialize upcomingMeetings on ngOnInit', () => {  
    const upcomingMeetings = [{ id: 1, name: 'Meeting 1', username: 'Mani', date: '27/06/2024', timeFrom: '3:30', timeTo: '4:10', agenda: 'Meeting Agenda 1' }];  
    spyOn(meetingRoomService, 'getUpcomingMeetings').and.returnValue(upcomingMeetings);  
  
    component.ngOnInit();  
  
    expect(component.upcomingMeetings).toEqual(upcomingMeetings);  
  }); 
  
  it('should delete a meeting and update upcomingMeetings', () => {  
    const meetingId = 1;  
    const deleted = true;  
    spyOn(meetingRoomService, 'deleteMeetingById').and.returnValue(deleted);  
    spyOn(meetingRoomService, 'getUpcomingMeetings').and.returnValue([]);  
  
    component.deleteMeeting(meetingId);  
  
    expect(meetingRoomService.deleteMeetingById).toHaveBeenCalledWith(meetingId);  
    expect(component.upcomingMeetings).toEqual([]);  
  });  
  
  it('should handle error when deleting a meeting', () => {  
    const meetingId = 1;  
    const deleted = false;  
    spyOn(meetingRoomService, 'deleteMeetingById').and.returnValue(deleted);  
    component.deleteMeeting(meetingId); 
    expect(meetingRoomService.deleteMeetingById).toHaveBeenCalledWith(meetingId);  
  });  
  
  it('should unsubscribe from subscriptions on ngOnDestroy', () => {  
    const unsubscribeSpy = spyOn(component.subscriptions[0], 'unsubscribe');  
  
    component.ngOnDestroy();  
  
    expect(unsubscribeSpy).toHaveBeenCalled();  
  }); 
});
