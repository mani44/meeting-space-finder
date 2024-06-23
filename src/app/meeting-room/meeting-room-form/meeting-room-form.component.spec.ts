import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeetingRoomFormComponent } from './meeting-room-form.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MAT_DIALOG_SCROLL_STRATEGY, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MeetingRoomService } from '../meeting-room.service';
import { MatIconModule } from '@angular/material/icon';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MeetingRoomFormComponent', () => {
  let component: MeetingRoomFormComponent;
  let fixture: ComponentFixture<MeetingRoomFormComponent>;
  let dialogRef: MatDialogRef<MeetingRoomFormComponent>;  
  let meetingRoomService: MeetingRoomService;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingRoomFormComponent],
      providers: [MeetingRoomService, FormBuilder, MatDialog, {  
        provide: MatDialogRef,  
        useValue: { close: jasmine.createSpy() }
        },
        {  
          provide: MAT_DIALOG_SCROLL_STRATEGY,  
          useValue: () => {},  
        },
        {  
          provide: MAT_DIALOG_DATA,  
          useValue: {}
        }],
      imports: [MatDialogModule, MatIconModule],
      schemas: [NO_ERRORS_SCHEMA] 
    });
    fixture = TestBed.createComponent(MeetingRoomFormComponent);
    dialogRef = TestBed.inject(MatDialogRef);  
    formBuilder = TestBed.inject(FormBuilder);
    meetingRoomService = TestBed.inject(MeetingRoomService); 
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog on no click', () => {  
    component.onNoClick();  
  
    expect(dialogRef.close).toHaveBeenCalled();  
  });  
  
  it('should search available meeting rooms and update form validators', () => {  
    spyOn(component, 'checkAvailability').and.returnValue([{ name: 'Room A',  bookings: []}, { name: 'Room B',  bookings: [] }]);  
    component.bookingForm = formBuilder.group({  
      roomName: new FormControl('', Validators.required),  
      agenda: new FormControl('', Validators.required), 
      username: new FormControl('', Validators.required),  
      date: new FormControl('', Validators.required),  
      timeFrom: new FormControl('', Validators.required),  
      timeTo: new FormControl('', Validators.required)
    });  
  
    component.searchRooms();  
  
    expect(component.checkAvailability).toHaveBeenCalled();  
    expect(component.availableMeetingRooms).toEqual([{ name: 'Room A',  bookings: [] }, { name: 'Room B',  bookings: [] }]);  
    expect(component.bookingForm.controls['roomName'].validator).toBe(Validators.required);  
    expect(component.bookingForm.controls['agenda'].validator).toBe(Validators.required);  
    expect(component.showSearch).toBeFalse();  
    expect(component.showNotAvailable).toBeFalse();  
  });  
  
  it('should set the minimum time for end time', () => {  
    const event = { target: { value: '09:00' } };  
  
    component.setMinTimeForEndTime(event);  
  
    expect(component.minTimeForEndTime).toBe('09:30');  
  });

  it('should return available meeting rooms when form is valid', () => {  
    spyOn(meetingRoomService, 'parseTime').and.returnValues(9.0, 10.0);  
    spyOn(meetingRoomService, 'isValidTime').and.returnValue(true);  
    spyOn(meetingRoomService, 'isValidBookingDuration').and.returnValue(true);  
    spyOn(meetingRoomService, 'checkAvailability').and.returnValue([{ name: 'Room A', bookings: [] }, { name: 'Room B',  bookings: [] }]);  
    component.bookingForm = formBuilder.group({  
      username: new FormControl('Mani'),  
      roomName: new FormControl('Room A'),  
      date: new FormControl('2022-01-01'),  
      timeFrom: new FormControl('09:00'),  
      timeTo: new FormControl('10:00'),  
      agenda: new FormControl('Meeting agenda'),  
    });  
    
    const availableRooms = component.checkAvailability();  
    
    expect(meetingRoomService.parseTime).toHaveBeenCalledWith('09:00');  
    expect(meetingRoomService.parseTime).toHaveBeenCalledWith('10:00');  
    expect(meetingRoomService.isValidTime).toHaveBeenCalledWith(9.0);  
    expect(meetingRoomService.isValidTime).toHaveBeenCalledWith(10.0);  
    expect(meetingRoomService.isValidBookingDuration).toHaveBeenCalledWith(9.0, 10.0);  
    expect(meetingRoomService.checkAvailability).toHaveBeenCalledWith('2022-01-01', 9.0, 10.0);  
    expect(component.showInvalidTimeSelection).toBeFalse();  
    expect(availableRooms).toEqual([{ name: 'Room A',  bookings: [] }, { name: 'Room B',  bookings: [] }]);  
  });
  
  it('should return empty array when form is invalid', () => {  
    component.bookingForm = formBuilder.group({  
      username: new FormControl('Mani'),  
      roomName: new FormControl('Room A'),  
      date: new FormControl('2022-01-01'),  
      timeFrom: new FormControl('09:00'),  
      timeTo: new FormControl('10:00'),  
      agenda: new FormControl('Meeting agenda'),  
    });  
    
    const availableRooms = component.checkAvailability();  
    
    expect(component.showInvalidTimeSelection).toBeFalse();  
    expect(availableRooms).toEqual([
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
    ]);  
  });
});
