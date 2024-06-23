export interface MeetingRoom {
  name: string;
  bookings: Booking[];
}

export interface Booking {
  id: number;
  username: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  agenda: string;
}


export interface DialogData {
  username: string;
  roomId: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  agenda: string;
}
