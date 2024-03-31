import { DateTime } from 'luxon';
import { Kline } from '@/types/Kline';
import { CandlestickInterval } from '@/types/CandlestickInterval';

export interface CandlestickStrategy {
  execute: (
    pair: string,
    interval: CandlestickInterval,
    startTime: DateTime,
    endTime: DateTime,
  ) => Promise<Kline[]>;
}
