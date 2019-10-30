import { Group, ISODate, Schedule } from '../externalTypes';

export interface ScheduleBackend {
  loadGroups(): Promise<Group>;
  loadSchedule(from: ISODate, to: ISODate, groupId: string): Promise<Schedule>;
}