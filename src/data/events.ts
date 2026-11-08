export type CampusEvent = {
  id: number;
  title: string;
  date: string;
  place: string;
  seats: number;
};

export const events: CampusEvent[] = [
  { id: 1, title: 'Go Backend Workshop', date: '2026-11-04', place: 'Room 412', seats: 24 },
  { id: 2, title: 'Frontend Code Review Night', date: '2026-11-08', place: 'Coworking Lab 205', seats: 3 },
  { id: 3, title: 'KBTU Hackathon Pitch Session', date: '2026-11-14', place: 'Main Auditorium', seats: 40 },
  { id: 4, title: 'TypeScript Testing Clinic', date: '2026-11-19', place: 'Room 308', seats: 15 },
];
