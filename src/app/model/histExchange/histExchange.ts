import {Rate} from '../rate/rate';
import {HistRate} from '../histrate/histRate';

export class HistExchange {
  base: string;
  rates: Rate[];
  startAt: Date;
  endAt: Date;
}
