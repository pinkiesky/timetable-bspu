import { HttpScheduleBackend } from './HttpScheduleBackend';
import { LocalScheduleBackend } from './LocalScheduleBackend';
import { Axios } from '../services/axios';
import { ScheduleBackend } from './types';

export function loadBackendFromEnv(): ScheduleBackend {
  const { TT_BACKEND_TYPE, TT_BACKEND_URI } = process.env;

  switch (TT_BACKEND_TYPE) {
    case 'http':
      return new HttpScheduleBackend(Axios.create({ baseURL: TT_BACKEND_URI }));
    case 'local':
    default:
      return new LocalScheduleBackend();
  }
}

export const backend: ScheduleBackend = loadBackendFromEnv();
