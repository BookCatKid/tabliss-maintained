import React from "react";
import { DateRange, Props, defaultData } from "./types";

const StocksSettings: React.FC<Props> = ({ data = defaultData, setData }) => {
  // Ensure tradingView exists by merging with defaultData
  const currentData = {
    ...defaultData,
    ...data,
    tradingView: {
      ...defaultData.tradingView,
      ...(data?.tradingView || {})
    }
  };

  return (
    <div className="StocksSettings">
      <h4>TradingView Widget Settings</h4>
      
      <label>
        <input
          type="checkbox"
          checked={currentData.tradingView.enabled}
          onChange={(event) =>
            setData?.({
              ...currentData,
              tradingView: { ...currentData.tradingView, enabled: event.target.checked }
            })
          }
        />
        Show TradingView widget
      </label>

      {currentData.tradingView.enabled && (
        <>
          <label>
            Default Symbol
            <input
              type="text"
              value={currentData.tradingView.symbol}
              onChange={(event) =>
                setData?.({
                  ...currentData,
                  tradingView: { ...currentData.tradingView, symbol: event.target.value.toUpperCase() }
                })
              }
              placeholder="AAPL"
            />
          </label>

          <label>
            Date Range
            <select
              value={currentData.tradingView.dateRange}
              onChange={(event) =>
                setData?.({
                  ...currentData,
                  tradingView: { ...currentData.tradingView, dateRange: event.target.value as DateRange }
                })
              }
            >
              <option value="1D">1 Day</option>
              <option value="1M">1 Month</option>
              <option value="3M">3 Months</option>
              <option value="1Y">1 Year</option>
              <option value="5Y">5 Years</option>
              <option value="All">All Time</option>
            </select>
          </label>

          <label>
            <input
              type="checkbox"
              checked={currentData.tradingView.autosize}
              onChange={(event) =>
                setData?.({
                  ...currentData,
                  tradingView: { ...currentData.tradingView, autosize: event.target.checked }
                })
              }
            />
            Auto-size widget
          </label>

          {!currentData.tradingView.autosize && (
            <>
              <label>
                Width (px)
                <input
                  type="number"
                  value={currentData.tradingView.width}
                  onChange={(event) =>
                    setData?.({
                      ...currentData,
                      tradingView: { ...currentData.tradingView, width: Number(event.target.value) }
                    })
                  }
                  min={200}
                  max={1000}
                />
              </label>

              <label>
                Height (px)
                <input
                  type="number"
                  value={currentData.tradingView.height}
                  onChange={(event) =>
                    setData?.({
                      ...currentData,
                      tradingView: { ...currentData.tradingView, height: Number(event.target.value) }
                    })
                  }
                  min={100}
                  max={800}
                />
              </label>
            </>
          )}

          <label>
            Theme
            <select
              value={currentData.tradingView.colorTheme}
              onChange={(event) =>
                setData?.({
                  ...currentData,
                  tradingView: { ...currentData.tradingView, colorTheme: event.target.value as "light" | "dark" }
                })
              }
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>

          <label>
            <input
              type="checkbox"
              checked={currentData.tradingView.isTransparent}
              onChange={(event) =>
                setData?.({
                  ...currentData,
                  tradingView: { ...currentData.tradingView, isTransparent: event.target.checked }
                })
              }
            />
            Transparent background
          </label>
        </>
      )}

      <hr />

      <h4>Stock Price API Settings</h4>

      <label>
        <input
          type="checkbox"
          checked={currentData.enableAPI}
          onChange={(event) =>
            setData?.({
              ...currentData,
              enableAPI: event.target.checked
            })
          }
        />
        Enable stock price updates
      </label>

      {currentData.enableAPI && (
        <>
          <div className="warning" style={{ marginBottom: '1em', color: '#ff9800' }}>
            Note: For now this just gives stock info, so you would have to style it yourself.
          </div>

          <label>
            Stock Symbols (comma-separated)
            <input
              type="text"
              value={currentData.symbols.join(',')}
              onChange={(event) =>
                setData?.({
                  ...currentData,
                  symbols: event.target.value.toUpperCase().split(',').map(s => s.trim()).filter(Boolean)
                })
              }
              placeholder="AAPL,MSFT,GOOGL"
            />
          </label>

          <label>
            Refresh Interval
            <select
              value={currentData.refreshInterval}
              onChange={(event) =>
                setData?.({ ...currentData, refreshInterval: Number(event.target.value) })
              }
            >
              <option value={60000}>1 minute</option>
              <option value={300000}>5 minutes</option>
              <option value={900000}>15 minutes</option>
              <option value={1800000}>30 minutes</option>
            </select>
          </label>

          <label>
            <input
              type="checkbox"
              checked={currentData.showChangePercent}
              onChange={(event) =>
                setData?.({ ...currentData, showChangePercent: event.target.checked })
              }
            />
            Show percentage change
          </label>

          <label>
            <input
              type="checkbox"
              checked={currentData.showName}
              onChange={(event) =>
                setData?.({ ...currentData, showName: event.target.checked })
              }
            />
            Show symbol names
          </label>
        </>
      )}
    </div>
  );
};

export default StocksSettings;
