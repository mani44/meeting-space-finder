import { TestBed } from '@angular/core/testing';
import { MeetingRoomService } from './meeting-room.service';

describe('MeetingRoomService', () => {
  let service: MeetingRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingRoomService);
    service.meetingRooms = [
      {
        "name": "Room A",
        "bookings": [  
          { id: 1, username: 'Mani', date: '2022-01-01', timeFrom: '09:00', timeTo: '10:00', agenda: 'Meeting 1' },  
          { id: 2, username: 'Mani', date: '2022-01-01', timeFrom: '10:00', timeTo: '11:00', agenda: 'Meeting 2' },  
        ]
      },
      {
        "name": "Room B",
        "bookings": []
      },
      {
        "name": "Room C",
        "bookings": []
      }
    ]
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all meeting rooms', () => {  
    const meetingRooms = service.getMeetingRooms();  
    expect(meetingRooms).toBeTruthy();  
  });  
  
  it('should return meetings for a specific room', () => {  
    const roomName = 'Room A';  
    const meetings = service.getMeetingsForRoom(roomName);  
    expect(meetings).toBeTruthy();  
  });  
  
  it('should return an empty array when no meetings found for a specific room', () => {  
    const roomName = 'Non-existent Room';  
    const meetings = service.getMeetingsForRoom(roomName);  
    expect(meetings).toBeDefined();  
    expect(meetings.length).toBe(0);  
  });  
  
  it('should return upcoming meetings', () => {  
    const upcomingMeetings = service.getUpcomingMeetings();  
    expect(upcomingMeetings).toBeTruthy();  
  });
  
  it('should book a meeting room', () => {  
    const roomName = 'Room A';  
    const username = 'Mani';  
    const date = '2022-01-01';  
    const timeFrom = '09:00';  
    const timeTo = '10:00';  
    const agenda = 'Meeting agenda';  
  
    service.bookMeetingRoom(roomName, username, date, timeFrom, timeTo, agenda);  
  
    const room = service.getMeetingRooms().find(r => r.name === roomName);  
    expect(room).toBeTruthy();  
    expect(room?.bookings.length).toBe(3);  
    expect(room?.bookings[0].username).toBe(username);   
  });  
  
  it('should check availability and return available meeting rooms', () => {  
    const date = '2022-01-01';  
    const startTime = 9;  
    const endTime = 10;  
  
    const availableRooms = service.checkAvailability(date, startTime, endTime);  

    expect(availableRooms).toBeTruthy();  
  });   
  
  it('should check if there is a time overlap', () => {  
    const startTime1 = 9;  
    const endTime1 = 10;  
    const startTime2 = 10;  
    const endTime2 = 11;  
  
    const isOverlap = service.isTimeOverlap(startTime1, endTime1, startTime2, endTime2);  
  
    expect(isOverlap).toBeFalse();  
  });

  it('should parse time string to a number', () => {  
    const timeString = '09:30';  
    const expectedTime = 9.5;  
  
    const parsedTime = service.parseTime(timeString);  
  
    expect(parsedTime).toEqual(expectedTime);  
  });  
  
  it('should check if a time is valid', () => {  
    const validTime = 9.5;  
    const invalidTime = 8.0;  
  
    const isValid = service.isValidTime(validTime);  
    const isInvalid = service.isValidTime(invalidTime);  
  
    expect(isValid).toBeTrue();  
    expect(isInvalid).toBeFalse();  
  });  
  
  it('should check if a booking duration is valid', () => {  
    const validStartTime = 9.0;  
    const validEndTime = 10.0;  
    const invalidStartTime = 10.0;  
    const invalidEndTime = 9.0;  
  
    const isValidDuration = service.isValidBookingDuration(validStartTime, validEndTime);  
    const isInvalidDuration = service.isValidBookingDuration(invalidStartTime, invalidEndTime);  
  
    expect(isValidDuration).toBeTrue();  
    expect(isInvalidDuration).toBeFalse();  
  });  
  
  it('should delete a meeting by ID', () => {  
    const bookingId = 1;  
    const deleted = service.deleteMeetingById(bookingId);
    expect(deleted).toBeTrue();  
  });  
  
  it('should return false when trying to delete a non-existent meeting', () => {  
    const nonExistentId = 999;  
    const deleted = service.deleteMeetingById(nonExistentId);
    expect(deleted).toBeFalse();  
  });
  
});
