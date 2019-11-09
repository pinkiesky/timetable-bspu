import { ScheduleBackend } from './types';
import { Schedule, Group } from '../externalTypes';
import { AxiosInstance } from 'axios';

export class HttpScheduleBackend implements ScheduleBackend {
  private readonly axios: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  loadGroups(): Promise<Group> {
    return this.axios.get('/loadGroups');
  }

  loadSchedule(from: string, to: string, groupId: string): Promise<Schedule> {
    return this.axios.get(`/loadSchedule?from=${from}&to=${to}&groupId=${groupId}`);
  }
}
