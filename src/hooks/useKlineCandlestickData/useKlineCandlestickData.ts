import { useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { ApiProvider } from '@/types/ApiProvider';
import KlineCandlestickAPIContext from '@/utils/KlineCandlestickAPI/KlineCandlestickAPIContext';
import KlineKandlestickBinance from '@/utils/KlineCandlestickAPI/KlineKandlestickBinance/KlineKandlestickBinance';
import { CandlestickInterval } from '@/types/CandlestickInterval';

type Props = {
  apiProvider: ApiProvider;
  pair: string;
  startTime: DateTime;
  endTime: DateTime;
  interval: CandlestickInterval;
};

const useKlineCandlestickData = ({
  apiProvider,
  pair,
  startTime,
  endTime,
  interval,
}: Props) => {
  const klinesQuery = useQuery({
    queryKey: [
      apiProvider,
      pair,
      interval,
      startTime.toMillis(),
      endTime.toMillis(),
      'candlesticksSeries',
    ],
    queryFn: async () => {
      let context: KlineCandlestickAPIContext;

      if (apiProvider === ApiProvider.Binance) {
        context = new KlineCandlestickAPIContext(new KlineKandlestickBinance());
      } else {
        return Promise.reject(new Error('Wrong api provider specified'));
      }

      return context.execute(pair, interval, startTime, endTime);
    },
    enabled: true,
  });

  console.log('klinesQuery', klinesQuery);

  return {
    isLoading: klinesQuery.isLoading,
    klines: klinesQuery.data,
  };
};

export default useKlineCandlestickData;
