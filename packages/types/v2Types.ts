import { TMarkets } from "./common";
import { TItemID } from "./items";

export type TChart = {
  data: {
    timestamps: string[];
    prices_avg: number[];
    item_count: number[];
  };
  location: TMarkets;
  item_id: TItemID;
  quality: number;
};

export type THistoryItem = {
  item_count: number;
  avg_price: number;
  timestamp: string;
};

export type THistory = {
  location: TMarkets;
  item_id: TItemID;
  quality: number;
  data: THistoryItem[];
};

export type TGold = {
  price: number;
  timestamp: string;
};

export type TPrice = {
  item_id: TItemID;
  city: TMarkets;
  quality: number;
  sell_price_min: number;
  sell_price_min_date: string;
  sell_price_max: number;
  sell_price_max_date: string;
  buy_price_min: number;
  buy_price_min_date: string;
  buy_price_max: number;
  buy_price_max_date: string;
};
