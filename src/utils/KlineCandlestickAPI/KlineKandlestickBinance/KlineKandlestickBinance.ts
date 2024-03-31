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

    return getBinanceKlineCandlestickData({
      queryParams: {
        symbol: symbol.symbol,
        interval,
        startTime: String(startTime.toMillis()),
        endTime: String(endTime.toMillis()),
      },
    });
  }
}

export default KlineKandlestickBinance;
