import type { LibraryExample } from '../../types';
import { Candlestick } from './Candlestick';
import { candlestickSpecs } from './specs';

export const candlestick: LibraryExample = {
  id: 'candlestick',
  platform: 'elements',
  name: 'Candlestick chart',
  kind: 'Price chart',
  category: 'Data',
  size: 'wide',
  inspiredBy: ['TradingView', 'Robinhood'],
  description:
    'A stock’s minute-by-minute price as green and red candles with wicks, volume bars along the bottom, the live price’s label on the axis and a crosshair whose tooltip reads open, high, low and close.',
  Component: Candlestick,
  specs: candlestickSpecs,
};
