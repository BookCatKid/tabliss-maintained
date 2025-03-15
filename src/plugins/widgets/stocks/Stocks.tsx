import React, { useRef } from "react";
import { useCachedEffect } from "../../../hooks";
import { Props, defaultData } from "./types";
import { fetchStocksData } from "./api";
import "./Stocks.sass";

const Stocks: React.FC<Props> = ({ 
  data = defaultData, 
  cache,
  setCache 
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const abortController = React.useRef<AbortController | null>(null);

  // Ensure data has all required properties by merging with defaultData
  const currentData = {
    ...defaultData,
    ...data,
    tradingView: {
      ...defaultData.tradingView,
      ...(data?.tradingView || {})
    }
  };

  // Create a settings key that will change whenever any TradingView setting changes
  const tradingViewKey = JSON.stringify(currentData.tradingView);

  useCachedEffect(
    () => {
      // Don't fetch if API is disabled or no symbols are specified
      if (!currentData.enableAPI || !currentData.symbols.length) {
        return;
      }
      
      // Cleanup previous request if exists
      if (abortController.current) {
        abortController.current.abort();
      }
      
      // Create new abort controller for this request
      abortController.current = new AbortController();
      
      async function fetchData() {
        try {
          setIsLoading(true);
          setError(null);
          
          const stocks = await fetchStocksData(currentData.symbols);
          
          // Check if we got any valid stock data
          if (stocks.length === 0) {
            setError('No valid stock data received. Please check your symbols.');
            return;
          }

          // Check if we got data for all requested symbols
          if (stocks.length !== currentData.symbols.length) {
            const missingSymbols = currentData.symbols.filter(
              symbol => !stocks.find(stock => stock.symbol === symbol)
            );
            setError(`Unable to fetch data for: ${missingSymbols.join(', ')}`);
          }
          
          setCache?.({ stocks, timestamp: Date.now() });
        } catch (error) {
          // Only set error if not aborted
          if (error instanceof DOMException && error.name === 'AbortError') {
            return;
          }
          
          setError('Failed to fetch stock data. Please check your internet connection and try again.');
          console.error('Failed to fetch stock data:', error);
        } finally {
          setIsLoading(false);
        }
      }

      fetchData();

      // Return cleanup function
      return () => {
        if (abortController.current) {
          abortController.current.abort();
        }
      };
    },
    cache ? cache.timestamp + currentData.refreshInterval : 0,
    [currentData.symbols.join(','), currentData.refreshInterval, currentData.enableAPI]
  );

  const tradingViewSettings = {
    symbol: currentData.tradingView.symbol,
    width: currentData.tradingView.autosize ? undefined : currentData.tradingView.width,
    height: currentData.tradingView.autosize ? undefined : currentData.tradingView.height,
    locale: currentData.tradingView.locale,
    dateRange: currentData.tradingView.dateRange,
    colorTheme: currentData.tradingView.colorTheme,
    trendLineColor: currentData.tradingView.trendLineColor,
    underLineColor: currentData.tradingView.underLineColor,
    isTransparent: currentData.tradingView.isTransparent,
    autosize: currentData.tradingView.autosize,
    largeChartUrl: ""
  };

  const embedName = "mini-symbol-overview";
  const tradingViewUrl = `https://s.tradingview.com/embed-widget/${embedName}/?locale=${tradingViewSettings.locale}#${JSON.stringify(tradingViewSettings)}`;

  return (
    <div className="Stocks">
      {currentData.tradingView.enabled && (
        <iframe 
          key={tradingViewKey}
          src={tradingViewUrl} 
          style={{ 
            border: 'none',
            width: currentData.tradingView.autosize ? '100%' : `${currentData.tradingView.width}px`,
            height: currentData.tradingView.autosize ? '100%' : `${currentData.tradingView.height}px`,
            marginBottom: '1rem'
          }}
        />
      )}

      {currentData.enableAPI && (
        <div className="stocks-api-container">
          {error && (
            <div className="stocks-error">
              {error}
            </div>
          )}

          {isLoading && !cache?.stocks?.length && (
            <div className="stocks-loading">Loading stock data...</div>
          )}

          {!isLoading && !error && !cache?.stocks?.length && (
            <div className="stocks-empty">No stocks to display</div>
          )}

          {cache && cache.stocks && cache.stocks.length > 0 && (
            <div className="stocks-grid">
              {cache.stocks.map(stock => (
                <div key={stock.symbol} className="stock-item">
                  {currentData.showName && (
                    <div className="stock-name">{stock.name}</div>
                  )}
                  <div className="stock-symbol">{stock.symbol}</div>
                  <div className="stock-price">${(stock.price || 0).toFixed(2)}</div>
                  <div className={`stock-change ${(stock.change || 0) >= 0 ? 'positive' : 'negative'}`}>
                    {(stock.change || 0) >= 0 ? '+' : ''}{(stock.change || 0).toFixed(2)}
                    {currentData.showChangePercent && (
                      <span className="stock-change-percent">
                        ({(stock.change || 0) >= 0 ? '+' : ''}{((stock.changePercent || 0) * 100).toFixed(2)}%)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Stocks;
