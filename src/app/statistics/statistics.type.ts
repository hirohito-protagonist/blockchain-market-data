export interface StatisticsInfo {
  'market_price_usd': number;
  'hash_rate': number;
  'total_fees_btc': number;
  'n_btc_mined': number;
  'n_tx': number;
  'n_blocks_mined': number;
  'minutes_between_blocks': number;
  'totalbc': number;
  'n_blocks_total': number;
  'estimated_transaction_volume_usd': number;
  'blocks_size': number;
  'miners_revenue_usd': number;
  'nextretarget': number;
  'difficulty': number;
  'estimated_btc_sent': number;
  'miners_revenue_btc': number;
  'total_btc_sent': number;
  'trade_volume_btc': number;
  'trade_volume_usd': number;
  'timestamp': number;
}

export interface ChartOptions {
  responsive: boolean;
  animation: {
    duration: number;
  };
  hover: {
      animationDuration: number;
  };
  responsiveAnimationDuration: number;
  elements: {
    line: {
      fill: boolean;
      tension: number;
    };
  };
}

export interface Chart {
  name: string;
  description: string;
  datasets: ChartDataset[];
  labels: string[];
  type: string;
  options: ChartOptions;
}

export interface ChartDataset {
  label: string;
  data: number[];
}

export interface ChartQuery {
  name: string;
  start: string;
  timespan: string;
  rollingAverage: string;
  format: string;
  sampled: boolean;
}
