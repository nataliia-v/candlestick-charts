import { BinanceKline } from './BinanceKline';
import { BinanceExchangeInfo } from './BinanceExchangeInfo';
import { createApiRequest } from '@/utils/createApiRequest';
import { CandlestickInterval } from '@/types/CandlestickInterval';

const binanceApi = createApiRequest('https://dapi.binance.com');
export const getBinanceExchangeInfo = binanceApi<
  BinanceExchangeInfo,
  void,
  void
>({
  url: '/dapi/v1/exchangeInfo',
});

export const getBinanceKlineCandlestickData = binanceApi<
  BinanceKline[],
  {
    symbol: string;
    interval: CandlestickInterval;
    startTime: string;
    endTime: string;
  },
  void
>({
  url: '/dapi/v1/klines',
});
