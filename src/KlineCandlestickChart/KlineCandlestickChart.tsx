import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ApexCharts from 'apexcharts';
import { DateTime } from 'luxon';
import { Spinner, HStack, Flex, Box } from '@chakra-ui/react';
import useKlineCandlestickData from '@/hooks/useKlineCandlestickData';
import { ApiProvider } from '@/types/ApiProvider';
import { getChartOptions } from '@/KlineCandlestickChart/chartOptions';
import { CandlestickInterval } from '@/types/CandlestickInterval';
import IntervalSelector from '@/KlineCandlestickChart/IntervalSelector';
import DatePicker from '@/KlineCandlestickChart/DatePicker';

type Props = {
  apiProvider: ApiProvider;
  pair: string;
};

export const KlineCandlestickChart: React.FC<Props> = ({
  apiProvider,
  pair,
}: Props) => {
  const [startTime, setStartTime] = useState<DateTime>(
    DateTime.now().minus({ days: 30 }),
  );
  const [endTime, setEndTime] = useState<DateTime>(DateTime.now());
  const [interval, setInterval] = useState<CandlestickInterval>(
    CandlestickInterval['1d'],
  );
  const { isLoading, klines } = useKlineCandlestickData({
    apiProvider,
    pair,
    startTime,
    endTime,
    interval,
  });
  const chartRef = useRef<ApexCharts>();

  useEffect(() => {
    if (isLoading || !klines) {
      return;
    }

    if (chartRef.current) {
      chartRef.current.updateOptions(getChartOptions(klines));
    } else {
      const chart = new ApexCharts(
        document.querySelector('#chart'),
        getChartOptions(klines),
      );
      chart.render();
      chartRef.current = chart;
    }
  }, [isLoading, klines]);

  const onIntervalChange = useCallback(
    (event: ChangeEvent<{ value: CandlestickInterval }>) => {
      setInterval(event.target.value);
    },
    [],
  );

  const onStartTimeChange = useCallback(
    (event: ChangeEvent<{ value: string }>) => {
      setStartTime(DateTime.fromISO(event.target.value));
    },
    [],
  );

  const onEndTimeChange = useCallback(
    (event: ChangeEvent<{ value: string }>) => {
      setEndTime(DateTime.fromISO(event.target.value));
    },
    [],
  );

  return (
    <Box
      maxW="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
    >
      <Flex minW="100%" minH="365px" sx={{ position: 'relative' }}>
        <div id="chart" style={{ width: '100%' }} />
        {isLoading && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <Spinner
              size="md"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </Box>
        )}
      </Flex>
      <HStack direction="row" spacing={3}>
        <IntervalSelector value={interval} onChange={onIntervalChange} />
        <DatePicker
          label="From"
          selected={startTime}
          onChange={onStartTimeChange}
        />
        <DatePicker label="To" selected={endTime} onChange={onEndTimeChange} />
      </HStack>
    </Box>
  );
};
