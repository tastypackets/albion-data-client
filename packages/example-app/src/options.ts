import {
  TItemID,
  marketList,
  TMarkets,
  QUALITIES_ENUM,
} from "@albion-data/client";

export type ItemOption = {
  value: TItemID;
  label: string;
  description: string;
};

export type MarketOptions = {
  value: TMarkets;
  label: TMarkets;
};

export type QualityOption = {
  value: number;
  label: keyof typeof QUALITIES_ENUM;
};

export type EnchantmentOption = {
  value: "" | 1 | 2 | 3;
  label: "Normal" | "Uncommon" | "Rare" | "Exceptional";
};

export const enchantmentOptions: EnchantmentOption[] = [
  { value: "", label: "Normal" },
  { value: 1, label: "Uncommon" },
  { value: 2, label: "Rare" },
  { value: 3, label: "Exceptional" },
];

export const qualityOptions: QualityOption[] = [
  { value: 1, label: "Normal" },
  { value: 2, label: "Good" },
  { value: 3, label: "Outstanding" },
  { value: 4, label: "Excellent" },
  { value: 5, label: "Masterpiece" },
];

export const marketOptions: MarketOptions[] = marketList.map((market) => ({
  value: market,
  label: market,
}));

export const options: ItemOption[] = [
  { value: "T2_BAG", label: "Novice's Bag", description: "Equipment Item" },
  { value: "T3_BAG", label: "Journeyman's Bag", description: "Equipment Item" },
  { value: "T4_BAG", label: "Adept's Bag", description: "Equipment Item" },
  { value: "T5_BAG", label: "Expert's Bag", description: "Equipment Item" },
  { value: "T6_BAG", label: "Master's Bag", description: "Equipment Item" },
  {
    value: "T7_BAG",
    label: "Grandmaster's Bag",
    description: "Equipment Item",
  },
  { value: "T8_BAG", label: "Elder's Bag", description: "Equipment Item" },
];
