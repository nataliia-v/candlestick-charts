# Modern.js Package

## Setup

Install the dependencies:

```bash
npm run install
```

## Get Started

Run and debug the module:

```bash
npm run dev
```

Run test cases:

```bash
npm run test
```

Build the module for production:

```bash
npm run build
```

Enable optional features:

```bash
npm run new
```

Other commands:

```bash
npm run lint         # Lint and fix source files
npm run change       # Add a new changeset
npm run bump         # Update version and changelog via changeset
npm run release      # Release the package
```

For more information, see the [Modern.js Module documentation](https://modernjs.dev/module-tools/en).


Kline/Candlestick Streams Response example:
```
{
  "e": "kline",         // Event type
  "E": 1672515782136,   // Event time
  "s": "BNBBTC",        // Symbol
  "k": {
    "t": 1672515780000, // Kline start time
    "T": 1672515839999, // Kline close time
    "s": "BNBBTC",      // Symbol
    "i": "1m",          // Interval
    "f": 100,           // First trade ID
    "L": 200,           // Last trade ID
    "o": "0.0010",      // Open price
    "c": "0.0020",      // Close price
    "h": "0.0025",      // High price
    "l": "0.0015",      // Low price
    "v": "1000",        // Base asset volume
    "n": 100,           // Number of trades
    "x": false,         // Is this kline closed?
    "q": "1.0000",      // Quote asset volume
    "V": "500",         // Taker buy base asset volume
    "Q": "0.500",       // Taker buy quote asset volume
    "B": "123456"       // Ignore
  }
}

```
