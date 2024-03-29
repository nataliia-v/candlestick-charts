import React from 'react';

type Props = {
  test: string;
};

export const Index: React.FC<Props> = ({ test }) => {
  return <div>Test {test}</div>;
};
