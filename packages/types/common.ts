export const cityList = [
  "Bridgewatch",
  "Fort Sterling",
  "Lymhurst",
  "Martlock",
  "Thetford",
  "Arthurs Rest",
  "Caerleon",
] as const;
export const marketList = [...cityList, "Black Market"] as const;

export type TCity = typeof cityList[number];
export type TMarkets = typeof marketList[number];

export enum QUALITIES_ENUM {
  Normal = 1,
  Good = 2,
  Outstanding = 3,
  Excellent = 4,
  Masterpiece = 5,
}

export enum ENCHANTMENTS_ENUM {
  Normal,
  Uncommon,
  Rare,
  Exceptional,
}

export enum TIERS_ENUM {
  Beginner = 1,
  Novice = 2,
  Journeyman = 3,
  Adept = 3,
  Expert = 4,
  Master = 5,
  Grandmaster = 6,
  Elder = 7,
}

export type AllowedTimeScales = 1 | 2 | 3 | 4 | 5 | 6;
