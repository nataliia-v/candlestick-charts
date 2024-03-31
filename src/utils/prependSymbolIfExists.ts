export const prependSymbolIfExists = (symbol: string, str?: string) => {
  return str ? `${symbol}${str}` : '';
};
