import {
  TMarkets,
  QUALITIES_ENUM,
  TPrice,
  marketList,
} from "@albion-data/types";
import axios, { AxiosResponse } from "axios";

import { flattenOptionalArray, dynamicQueryParams, appendUTC } from "../utils";
import { basePricseUrl } from "./baseUrl";

/**
 * @description Paramters for Prices API calls
 */
export type TPriceParams = {
  /** @description ID of the item you want to lookup */
  itemList: string | string[];
  /** @description The city or cities to lookup the item in */
  locations?: TMarkets | TMarkets[];
  /** @description The quality level of the item, for example normal = 1 */
  qualities?: QUALITIES_ENUM | QUALITIES_ENUM[];
  /** How many records to return */
};

/**
 * @description Unformatted raw axios response
 */
export async function getPriceRaw(
  params: TPriceParams
): Promise<AxiosResponse<TPrice[], any>> {
  const items = flattenOptionalArray(params.itemList);
  const locations = flattenOptionalArray(params.locations || [...marketList]);
  const qualities = flattenOptionalArray(params.qualities);

  const url = `${basePricseUrl}/${encodeURIComponent(items)}.json`;
  return await axios.get<TPrice[]>(url, {
    params: dynamicQueryParams({
      locations,
      qualities,
    }),
  });
}

/**
 * @description Returns just data with dates converted to UTC
 */
export async function getPriceData(params: TPriceParams): Promise<TPrice[]> {
  const { data } = await getPriceRaw(params);

  return data.map((price) => ({
    ...price,
    sell_price_min_date: appendUTC(price.sell_price_min_date),
    sell_price_max_date: appendUTC(price.sell_price_max_date),
    buy_price_min_date: appendUTC(price.buy_price_min_date),
    buy_price_max_date: appendUTC(price.buy_price_max_date),
  }));
}
