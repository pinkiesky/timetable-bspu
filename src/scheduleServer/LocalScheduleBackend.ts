import { ScheduleBackend } from './types';
import { Group, Schedule, DaySchedule } from '../externalTypes';
import { promises as fs } from 'fs';
import { join } from 'path';
import { moment } from '../services/moment';

const DEFAULT_FIXTURES_FOLDER = join(__dirname, '..', '..', 'fixtures');

export class LocalScheduleBackend implements ScheduleBackend {
  readonly fixturesFolder: string;

  constructor(fixturesFolder: string = DEFAULT_FIXTURES_FOLDER) {
    this.fixturesFolder = fixturesFolder;
  }

  private async loadFile<T>(filename: string): Promise<T> {
    const json = await fs.readFile(join(this.fixturesFolder, filename), {
      encoding: 'utf8',
    });

    return JSON.parse(json);
  }

  async loadGroups(): Promise<Group> {
    return this.loadFile<Group>('groups.json');
  }

  async loadSchedule(
    from: string,
    to: string,
    groupId: string,
  ): Promise<Schedule> {
    const day = await this.loadFile<DaySchedule>(`${groupId}.json`);

    const toMmt = moment(to);
    const daysCount = toMmt.diff(from, 'days') + 1;

    return {
      from,
      to,
      groupId,
      days: new Array(daysCount).fill(day),
    };
  }
}
