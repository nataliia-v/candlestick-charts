import { DateTime } from 'luxon';
import { Kline } from '@/types/Kline';

const dataFromKlines = (klines: Kline[]) => {
  return (klines || []).map(kline => {
    return {
      x: kline[0],
      y: [kline[1], kline[2], kline[3], kline[4]],
    };
  });
};

export const getChartOptions = (klines: Kline[]) => {
  const randomBuySignal = klines.length
    ? klines[Math.floor(Math.random() * klines.length)]
    : undefined;
  const randomSellSignal = klines.length
    ? klines[Math.floor(Math.random() * klines.length)]
    : undefined;

  return {
    chart: {
      type: 'candlestick',
      height: 350,
      width: '100%',
    },
    tooltip: {
      enabled: true,
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
      xaxis: (randomBuySignal || randomSellSignal) && [
        {
          x: randomBuySignal[0],
          borderColor: '#00E396',
          label: {
            borderColor: '#00E396',
            style: {
              fontSize: '12px',
              color: '#fff',
              background: '#00E396',
            },
            orientation: 'horizontal',
            position: 'bottom',
            offsetY: 7,
            text: `Buy. Volume - ${randomBuySignal[5]}`,
          },
        },
        {
          x: randomSellSignal[0],
          borderColor: '#e30000',
          label: {
            borderColor: '#e30000',
            style: {
              fontSize: '12px',
              color: '#fff',
              background: '#e30000',
            },
            orientation: 'horizontal',
            position: 'top',
            offsetY: 7,
            text: `Sell. Volume - ${randomSellSignal[5]}`,
          },
        },
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
