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
  textStyle: {
    color: string;
  };
  tooltip: {
    trigger: string;
    axisPointer: {
        type: string;
        label: {
            backgroundColor: string;
        };
    };
  };
  xAxis: {
    type: string;
    data: any[];
    boundaryGap: boolean;
  }[];
  yAxis: {
    type: string;
    splitLine: {
      lineStyle: {
        color: string;
      };
    };
  }[];
  grid: {
    borderColor: string;
    left: string;
    right: string;
  };
  series: {
    name: string;
    type: string;
    data: any[];
    showSymbol: boolean;
    lineStyle: {
      color: string;
    };
    areaStyle: {
      color: string;
    };
  }[];
}

export interface Chart {
  name: string;
  description: string;
  options: ChartOptions;
}

export interface ChartQuery {
  name: string;
  start: string;
  timespan: string;
  rollingAverage: string;
  format: string;
  sampled: boolean;
}
