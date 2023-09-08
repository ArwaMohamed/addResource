import { Time } from '@angular/common';

export interface ISchedule {
  day: string;
  times: [
    {
      startTime: string;
      endTime: string;
    }
  ];
}
