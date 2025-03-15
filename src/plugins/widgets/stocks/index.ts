import { Config } from "../../types";
import Stocks from "./Stocks";
import StocksSettings from "./StocksSettings";

const config: Config = {
  key: "widget/stocks",
  name: "Stock Market",
  description: "Track your favorite stocks.",
  dashboardComponent: Stocks,
  settingsComponent: StocksSettings,
};

export default config;