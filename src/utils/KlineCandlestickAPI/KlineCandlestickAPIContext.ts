import { DateTime } from 'luxon';
import { Kline } from '@/types/Kline';
import { CandlestickStrategy } from '@/types/CandlestickStrategy';
import { CandlestickInterval } from '@/types/CandlestickInterval';

class KlineCandlestickAPIContext {
  private _strategy: CandlestickStrategy;

  constructor(strategy: CandlestickStrategy) {
    this._strategy = strategy;
  }

  set strategy(value: CandlestickStrategy) {
    this._strategy = value;
  }

  get strategy(): CandlestickStrategy {
    return this._strategy;
  }

  public async execute(
    pair: string,
    interval: CandlestickInterval,
    startTime: DateTime,
    endTime: DateTime,
  ): Promise<Kline[]> {
    return this._strategy.execute(pair, interval, startTime, endTime);
  }
}

export default KlineCandlestickAPIContext;
