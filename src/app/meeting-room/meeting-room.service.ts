import { Injectable } from '@angular/core';
import { Booking, MeetingRoom } from './meeting-room.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingRoomService {
  id: number = 3;
  meetingRooms: MeetingRoom[] = [
    {
      "name": "Meeting Room 1",
      "bookings": [ {
        "id": 1,
        "username": 'mani',
        "date": "2024-06-23",
        "timeFrom": "15:55",
        "timeTo": "16:30",
        "agenda": "Meeting Agenda 1"
      },
      {
        "id": 2,
        "username": 'mani',
        "date": "2024-06-22",
        "timeFrom": "10:35",
        "timeTo": "12:35",
        "agenda": "Meeting Agenda 2"
      }
    ]
    },
    {
      "name": "Meeting Room 2",
      "bookings": []
    },
    {
      "name": "Meeting Room 3",
      "bookings": []
    },
    {
      "name": "Meeting Room 4",
      "bookings": []
    },
    {
      "name": "Meeting Room 5",
      "bookings": []
    },
    {
      "name": "Meeting Room 6",
      "bookings": []
    },
    {
      "name": "Meeting Room 7",
      "bookings": []
    },
    {
      "name": "Meeting Room 8",
      "bookings": []
    },
    {
      "name": "Meeting Room 9",
      "bookings": []
    },
    {
      "name": "Meeting Room 10",
      "bookings": []
    }
  ];

  private openingTime: number = 9; 
  private closingTime: number = 18;

  bookedRoom = new Subject<Boolean>();
  bookedRoom$ = this.bookedRoom.asObservable(); 
  
  getMeetingRooms(): MeetingRoom[] {  
    return this.meetingRooms;  
  }  
    
  getMeetingsForRoom(roomName: string): Booking[] {  
    const room = this.meetingRooms.find(room => room.name === roomName);  
    return room?.bookings || [];  
  }  
    
  getUpcomingMeetings() {  
    const currentDate = new Date();  
    const upcomingMeetings = [];  
    
    for (const room of this.meetingRooms) {  
      const roomUpcomingMeetings = room.bookings.filter(booking => {  
        const bookingDateTime = new Date(booking.date + 'T' + booking.timeFrom);  
        return bookingDateTime > currentDate;  
      });  
    
      const name = room.name;  
      const upcomingMeetingsWithRoomName = roomUpcomingMeetings.map(booking => ({  
        ...booking,  
        name  
      }));  
    
      upcomingMeetings.push(...upcomingMeetingsWithRoomName);  
    }  
    
    upcomingMeetings.sort((a, b) => {  
      const aDateTime = new Date(a.date + 'T' + a.timeFrom);  
      const bDateTime = new Date(b.date + 'T' + b.timeFrom);  
      return aDateTime.getTime() - bDateTime.getTime();  
    });  
    
    return upcomingMeetings;  
  }  
    
  bookMeetingRoom(roomName: string, username: string, date: string, timeFrom: string, timeTo: string, agenda: string): void {  
    const room = this.meetingRooms.find(r => r.name === roomName);  
    if (room) {  
      room.bookings.push({  
        id: this.id++,  
        username,  
        date,  
        timeFrom,  
        timeTo,  
        agenda  
      });  
    }  
    this.bookedRoom.next(true);  
  }  
    
  checkAvailability(date: string ,startTime: number, endTime: number): MeetingRoom[] {    
    const availableRooms: MeetingRoom[] = [];     
      for (const room of this.meetingRooms) {    
        const bookingsOnDate = room.bookings.filter(booking => booking.date === date);    
        if (bookingsOnDate.length === 0) {    
          availableRooms.push(room);    
        }   
        else {    
          const isAvailable = bookingsOnDate.every(booking => {    
            const existingStartTime = this.parseTime(booking.timeFrom);    
            const existingEndTime = this.parseTime(booking.timeTo);    
            return !this.isTimeOverlap(startTime, endTime, existingStartTime, existingEndTime);    
          });    
      
          if (isAvailable) {    
            availableRooms.push(room);    
          }      
      }    
    }    
    return availableRooms;    
  }   
    
  isTimeOverlap(startTime1: number, endTime1: number, startTime2: number, endTime2: number): boolean {    
    return (startTime1 < endTime2) && (startTime2 < endTime1);    
  }   
  
  parseTime(timeString: string): number {  
    const timeParts = timeString.split(':');  
    const hours = parseInt(timeParts[0], 10);  
    const minutes = parseInt(timeParts[1], 10);  
    return hours + minutes / 60;  
  }  
  
  isValidTime(time: number): boolean {  
    return time >= this.openingTime && time < this.closingTime;  
  }  
  
  isValidBookingDuration(startTime: number, endTime: number): boolean {  
    return endTime - startTime >= 0.5;
  } 

  deleteMeetingById(id: number): boolean {  
    for (const room of this.meetingRooms) {  
      const index = room.bookings.findIndex(booking => booking.id === id);  
      if (index !== -1) {  
        room.bookings.splice(index, 1);  
        return true;  
      }  
    }  
    return false;  
  }

}
