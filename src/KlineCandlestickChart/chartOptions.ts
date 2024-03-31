import { DateTime } from 'luxon';
import { Kline } from '@/types/Kline';

const dataFromKlines = (klines: Kline[]) => {
  return klines.map(kline => {
    return {
      x: kline[0],
      y: [kline[1], kline[2], kline[3], kline[4]],
    };
  });
};

export const getChartOptions = (klines: Kline[]) => {
  console.log(' 1', klines[Math.floor(Math.random() * klines.length)]);

  const randomBuySignal = klines[Math.floor(Math.random() * klines.length)];
  // const randomSellSignal = klines[Math.floor(Math.random() * klines.length)];

  return {
    chart: {
      type: 'candlestick',
      height: 350,
      width: '100%',
    },
    tooltip: {
      enabled: true,
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter(val: number) {
          return DateTime.fromMillis(val).toLocaleString(DateTime.DATE_SHORT);
        },
      },
    },
    annotations: {
      xaxis: [
        randomBuySignal[0]
          ? {
              x: DateTime.fromMillis(randomBuySignal[0]).toLocaleString(
                DateTime.DATE_SHORT,
              ),
              borderColor: '#00E396',
              label: {
                borderColor: '#00E396',
                style: {
                  fontSize: '12px',
                  color: '#fff',
                  background: '#00E396',
                },
                orientation: 'horizontal',
                offsetY: 7,
                text: 'Annotation Test',
              },
            }
          : undefined,
      ],
    },
    series: [
      {
        data: dataFromKlines(klines),
      },
    ],
    // plotOptions: {
    //   candlestick: {
    //     colors: {
    //       upward: '#3C90EB',
    //       downward: '#DF7D46'
    //     },
    //     wick: {
    //       useFillColor: true,
    //     }
    //   }
    // }
  };
};
