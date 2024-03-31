import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { ApiProvider } from '@/types/ApiProvider';
import { KlineCandlestickChart } from '@/KlineCandlestickChart/KlineCandlestickChart';

type Props = {
  apiProvider: ApiProvider;
  pair: string;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, staleTime: 3600000, gcTime: 7200000 },
  },
});

const KlineCandlestickChartWrapper: React.FC<Props> = ({
  apiProvider = ApiProvider.Binance,
  pair = 'BTCUSD',
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <KlineCandlestickChart apiProvider={apiProvider} pair={pair} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default KlineCandlestickChartWrapper;
