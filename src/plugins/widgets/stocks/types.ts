export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export type DateRange = "1D" | "1M" | "3M" | "1Y" | "5Y" | "all";

export interface TradingViewSettings {
  enabled: boolean;
  symbol: string;
  width: number;
  height: number;
  locale: string;
  dateRange: DateRange;
  colorTheme: "light" | "dark";
  trendLineColor: string;
  underLineColor: string;
  isTransparent: boolean;
  autosize: boolean;
}

export interface Data {
  symbols: string[];
  refreshInterval: number;
  showChangePercent: boolean;
  showName: boolean;
  tradingView: TradingViewSettings;
  enableAPI: boolean;
}

export const defaultData: Data = {
  symbols: [],
  refreshInterval: 60000,
  showChangePercent: true,
  showName: true,
  enableAPI: false,
  tradingView: {
    enabled: false,
    symbol: "AAPL",
    width: 350,
    height: 220,
    locale: "en",
    dateRange: "1Y",
    colorTheme: "light",
    trendLineColor: "#37a6ef",
    underLineColor: "#e3f2fd",
    isTransparent: false,
    autosize: true
  }
};

export interface Props {
  data?: Data;
  setData?: (data: Data) => void;
  cache?: { stocks: StockData[]; timestamp: number };
  setCache?: (cache: { stocks: StockData[]; timestamp: number }) => void;
}
