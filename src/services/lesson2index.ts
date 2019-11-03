import { Lesson } from '../externalTypes';
import { createHash } from 'crypto';

function reducedHashCode(...strs: string[]): number {
  const hash = createHash('md5');

  for (const str of strs) {
    hash.update(str);
  }

  return hash.digest()[0];
}

export function lesson2index(lesson: Lesson, maxIndex: number) {
  return reducedHashCode(lesson.name, lesson.type) % maxIndex;
}
