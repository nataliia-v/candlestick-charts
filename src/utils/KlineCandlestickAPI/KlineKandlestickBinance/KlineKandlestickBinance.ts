import { DateTime } from 'luxon';
import { CandlestickStrategy } from '@/types/CandlestickStrategy';
import { Kline } from '@/types/Kline';
import {
  getBinanceExchangeInfo,
  getBinanceKlineCandlestickData,
} from '@/utils/KlineCandlestickAPI/KlineKandlestickBinance/api';
import { CandlestickInterval } from '@/types/CandlestickInterval';

class KlineKandlestickBinance implements CandlestickStrategy {
  async execute(
    pair: string,
    interval: CandlestickInterval,
    startTime: DateTime,
    endTime: DateTime,
  ): Promise<Kline[]> {
    const exchangeInfo = await getBinanceExchangeInfo();
    const symbol = exchangeInfo.symbols.find(it => {
      return it.pair === pair;
    });

    if (!symbol) {
      throw new Error('Symbol not found');
    }

    const data = await getBinanceKlineCandlestickData({
      queryParams: {
        symbol: symbol.symbol,
        interval,
        startTime: String(startTime.toMillis()),
        endTime: String(endTime.toMillis()),
      },
    });

    console.log('data', data);

    return data.map(it => {
      return [it[0], it[1], it[2], it[3], it[4]];
    });
  }
}

export default KlineKandlestickBinance;
