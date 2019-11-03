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

export type DaySchedule = (Lesson | null)[];

export interface Lesson {
  classroom: string | null;
  name: string;
  teacher: string | null;
  type: string;
}
