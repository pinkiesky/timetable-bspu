import { ScheduleBackend } from './types';
import { Group, Schedule } from '../externalTypes';
import { promises as fs } from 'fs';
import { join } from 'path';

const DEFAULT_FIXTURES_FOLDER = join(__dirname, '..', '..', 'fixtures');

export class LocalScheduleBackend implements ScheduleBackend {
  readonly fixturesFolder: string;

  constructor(fixturesFolder: string = DEFAULT_FIXTURES_FOLDER) {
    this.fixturesFolder = fixturesFolder;
  }

  private loadFile(filename: string): Promise<string> {
    return fs.readFile(join(this.fixturesFolder, filename), {
      encoding: 'utf8',
    });
  }

  async loadGroups(): Promise<Group> {
    const data = await this.loadFile('groups.json');
    return JSON.parse(data);
  }

  async loadSchedule(
    from: string,
    to: string,
    groupId: string,
  ): Promise<Schedule> {
    const data = await this.loadFile(`${groupId}.json`);
    const days = JSON.parse(data);

    return {
      from,
      to,
      groupId,
      days,
    };
  }
}
