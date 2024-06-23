import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeetingRoomComponent } from './meeting-room.component';
import { MAT_DIALOG_SCROLL_STRATEGY, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MeetingRoomFormComponent } from './meeting-room-form/meeting-room-form.component';
import { MeetingRoomService } from './meeting-room.service';

describe('MeetingRoomComponent', () => {
  let component: MeetingRoomComponent;
  let fixture: ComponentFixture<MeetingRoomComponent>;
  let dialog: MatDialog;  
  let meetingRoomService: MeetingRoomService; 
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingRoomComponent],
      providers: [MeetingRoomService, MatDialog,
        {  
          provide: MAT_DIALOG_SCROLL_STRATEGY,  
          useValue: () => {},  
        }],
      imports: [MatDialogModule], 
    });
    fixture = TestBed.createComponent(MeetingRoomComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);  
    meetingRoomService = TestBed.inject(MeetingRoomService);  
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog with the correct configuration', () => {  
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);  
    dialogRefSpy.afterClosed.and.returnValue(of({ roomName: 'Room A', username: 'Mani', date: '2022-01-01', timeFrom: '09:00', timeTo: '10:00', agenda: 'Meeting agenda' }));  
    spyOn(dialog, 'open').and.returnValue(dialogRefSpy);  
    spyOn(localStorage, 'getItem').and.returnValue('Mani');  
  
    component.openDialog();  
  
    expect(dialog.open).toHaveBeenCalledWith(MeetingRoomFormComponent, {  
      width: '700px',  
      minHeight: '400px',  
      disableClose: true,  
      hasBackdrop: true,  
      data: component.bookingForm.value,  
    });  
    expect(dialogRefSpy.afterClosed).toHaveBeenCalled();  
  });
});
