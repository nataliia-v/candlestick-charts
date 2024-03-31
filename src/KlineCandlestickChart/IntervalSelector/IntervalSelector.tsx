import React, { ChangeEventHandler } from 'react';
import { Select, Box, Text } from '@chakra-ui/react';

import { CandlestickInterval } from '@/types/CandlestickInterval';

const intervalOptions = [
  CandlestickInterval['1m'],
  CandlestickInterval['3m'],
  CandlestickInterval['5m'],
  CandlestickInterval['15m'],
  CandlestickInterval['30m'],
  CandlestickInterval['1h'],
  CandlestickInterval['2h'],
  CandlestickInterval['4h'],
  CandlestickInterval['6h'],
  CandlestickInterval['8h'],
  CandlestickInterval['12h'],
  CandlestickInterval['1d'],
  CandlestickInterval['3d'],
  CandlestickInterval['1w'],
  CandlestickInterval['1M'],
].map(interval => {
  return {
    label: interval,
    value: interval,
  };
});

type Props = {
  value: CandlestickInterval;
  onChange: ChangeEventHandler<any>;
};

const IntervalSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Box>
      <Text mb="8px">Interval</Text>
      <Select value={value} onChange={onChange} placeholder="Select interval">
        {intervalOptions.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

export default IntervalSelector;
