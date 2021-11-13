import { QUALITIES_ENUM } from "@albion-data/types";
import { stringify } from "qs";

import { baseUrlV1 } from "./baseUrl";
import { TItemIconSize, TSpellIconSize } from "./types";

/**
 * @description Paramters for Gold API calls
 */
type TIconById = {
  /** @description The item ID */
  identifier: string;
  /** @description Number repersenting the quality of the item */
  quality?: QUALITIES_ENUM;
  /** @description The localized item name */
  localizedName?: string;
  /** @description The locale for the localized item name, default is en */
  locale?: string;
  /** @description Sets width and height in px. Defaults to 217. Valid values are 1-217 */
  size?: number;
  /** @description The subdirectory used in the API to get this icon */
  subDirectory: "item" | "spell" | "destiny";
};

type TIconByLocale = Omit<TIconById, "identifier"> & {
  /** @description The localized item name */
  localizedName: string;
  /** @description The locale for the localized item name, default is en */
  locale: string;
  identifier?: string;
};

type ReuseableIconById = Omit<TIconById, "subDirectory">;
type ReuseableIconByLocale = Omit<TIconByLocale, "subDirectory">;

// If localizedName is passed instead of identifier it must have the locale as well
type TIconParams = TIconById | TIconByLocale;

/**
 * @description Generate a url for item icon
 */
function getIcon({
  identifier,
  localizedName,
  subDirectory,
  ...params
}: TIconParams): string {
  const queryParams = stringify(params, {
    addQueryPrefix: true,
  });

  let url = `${baseUrlV1}/${subDirectory}/`;
  if (localizedName) {
    url = `${url}${localizedName}`;
  } else {
    url = `${url}${identifier}`;
  }

  return `${url}${queryParams}`;
}

type TItemIconParams =
  | (Omit<ReuseableIconById, "size"> & {
      size?: TItemIconSize;
    })
  | (Omit<ReuseableIconByLocale, "size"> & {
      size?: TItemIconSize;
    });

// TODO: Add support for enchantments param, but need to resolve all oddities first like _LEVEL1@1
/**
 * @description Generate a url for item icon
 */
export function getItemIconUrl(params: TItemIconParams): string {
  return getIcon({ ...params, subDirectory: "item" });
}

type TSpellIconParams =
  | (Omit<ReuseableIconById, "quality" | "size"> & {
      size?: TSpellIconSize;
    })
  | (Omit<ReuseableIconByLocale, "quality" | "size"> & {
      size?: TSpellIconSize;
    });

/**
 * @description Generate a url for spell icon
 */
export function getSpellIconUrl(params: TSpellIconParams): string {
  return getIcon({ ...params, subDirectory: "spell" });
}

type TDestinyBoardParams =
  | Omit<ReuseableIconById, "quality" | "size">
  | Omit<ReuseableIconByLocale, "quality" | "size">;

/**
 * @description Generate a url for spell icon
 */
export function getDestinyBoardIconUrl(params: TDestinyBoardParams): string {
  return getIcon({ ...params, subDirectory: "destiny" });
}

// TODO: Add support for Guild logos
