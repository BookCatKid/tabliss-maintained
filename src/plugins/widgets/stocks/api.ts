import { StockData } from "./types";

const FINNHUB_API_KEY = 'cv6hn79r01qi7f6qeh30cv6hn79r01qi7f6qeh3g'; // You'll need to sign up at finnhub.io
const BASE_URL = 'https://finnhub.io/api/v1';

export async function fetchStockData(symbol: string): Promise<StockData | null> {
  try {
    const response = await fetch(`${BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
    const data = await response.json();
    
    if (!data || data.error) {
      console.error(`Error fetching data for ${symbol}:`, data);
      return null;
    }

    return {
      symbol,
      name: symbol,
      price: data.c, // Current price
      change: data.d, // Change
      changePercent: data.dp / 100 // Change percent
    };
  } catch (error) {
    console.error(`Failed to fetch stock data for ${symbol}:`, error);
    return null;
  }
}

// Batch fetch - no need for delays with Finnhub
export async function fetchStocksData(symbols: string[]): Promise<StockData[]> {
  const promises = symbols.map(symbol => fetchStockData(symbol));
  const results = await Promise.all(promises);
  return results.filter((result): result is StockData => result !== null);
}

// Optional: Fetch company name separately
export async function fetchCompanyName(symbol: string): Promise<string | null> {
  try {
    const response = await fetch(`${BASE_URL}/company?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
    const data = await response.json();
    
    return data.Name || null;
  } catch (error) {
    console.error(`Failed to fetch company name for ${symbol}:`, error);
    return null;
  }
}
