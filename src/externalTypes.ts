export type ISODate = string;

export interface Group {
  id: string;
  displayedName: string;
  subgroup: Group[] | null;
}

export interface Schedule {
  from: ISODate;
  to: ISODate;
  groupId: string;

  // days.size = (to - from).deltaDays
  days: DaySchedule[];
}

export interface DaySchedule {
  lessons: (Lesson | null)[];
}

export interface Lesson {
  classroom: string;
  name: string;
  teacher: string;
  type: string;
}
