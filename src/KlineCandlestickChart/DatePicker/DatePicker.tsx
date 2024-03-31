import React, { ChangeEventHandler, useMemo } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';

type Props = {
  label: string;
  selected: DateTime;
  onChange: ChangeEventHandler<any>;
};

const DatePicker: React.FC<Props> = ({ label, selected, onChange }) => {
  const value = useMemo(() => {
    return selected.toISODate() || undefined;
  }, [selected]);

  return (
    <Box>
      <Text mb="8px">{label}</Text>
      <Flex
        borderWidth="1px"
        borderRadius="lg"
        p={1}
        px={2}
        height="40px"
        align="center"
        overflow="hidden"
      >
        <input
          type="date"
          value={value}
          onChange={onChange}
          style={{ height: '100%', border: 'none' }}
        />
      </Flex>
    </Box>
  );
};

export default DatePicker;
