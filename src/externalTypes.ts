type ISODate = string;

interface Group {
  id: string;
  displayedName: string;
  subgroup: Group[] | null;
}

interface Schedule {
  from: ISODate;
  to: ISODate;
  groupId: string;

  // days.size = (to - from).deltaDays
  days: DaySchedule[];
}

interface DaySchedule {
  lessons: (Lesson | null)[];
}

interface Lesson {
  classroom: string;
  name: string;
  teacher: string;
  type: string;
}
