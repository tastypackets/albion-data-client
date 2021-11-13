import {
  TMarkets,
  QUALITIES_ENUM,
  AllowedTimeScales,
  TChart,
  THistory,
  marketList,
} from "@albion-data/types";
import axios, { AxiosResponse } from "axios";

import {
  flattenOptionalArray,
  convertDateToString,
  dynamicQueryParams,
  appendUTC,
} from "../utils";
import { baseChartsUrl, historyBaseUrl } from "./baseUrl";

/**
 * @description Paramters for Chart API calls, timeScale can only be used when selecting one item and one city
 */
export type TChartParams = {
  /** @description ID of the item you want to lookup */
  itemList: string | string[];
  /** @description The city or cities to lookup the item in */
  locations?: TMarkets | TMarkets[];
  /** @description The date to start the query */
  startDate?: Date | string;
  /** @description The date to end the query */
  endDate?: Date | string;
  /** @description The quality level of the item, for example normal = 1 */
  qualities?: QUALITIES_ENUM | QUALITIES_ENUM[];
  /** @description TODO */
  timeScale?: AllowedTimeScales | AllowedTimeScales[];
};

/**
 * @description Unformatted raw axios response
 */
export async function getChartRaw(
  params: TChartParams
): Promise<AxiosResponse<TChart[], any>> {
  const items = flattenOptionalArray(params.itemList);
  const locations = flattenOptionalArray(params.locations || [...marketList]);
  const qualities = flattenOptionalArray(params.qualities);
  const timeScale = flattenOptionalArray(params.timeScale || 1);
  const startDate = convertDateToString(params.startDate);
  const endDate = convertDateToString(params.endDate);

  const url = `${baseChartsUrl}/${encodeURIComponent(items)}.json`;
  return await axios.get<TChart[]>(url, {
    params: dynamicQueryParams({
      locations,
      date: startDate,
      end_date: endDate,
      qualities,
      "time-scale": timeScale,
    }),
  });
}

/**
 * @description Returns just data with dates converted to UTC
 */
export async function getChartData(params: TChartParams): Promise<TChart[]> {
  const { data } = await getChartRaw(params);

  return data.map((obj) => ({
    ...obj,
    data: {
      ...obj.data,
      // Add UTC timezone indicator
      timestamps: obj.data.timestamps.map(appendUTC),
    },
  }));
}

/**
 * @description Unformatted raw axios response
 */
export async function getChartHistoryRaw(
  params: TChartParams
): Promise<AxiosResponse<THistory[], any>> {
  const items = flattenOptionalArray(params.itemList);
  const locations = flattenOptionalArray(params.locations || [...marketList]);
  const qualities = flattenOptionalArray(params.qualities);
  const timeScale = flattenOptionalArray(params.timeScale || 1);
  const startDate = convertDateToString(params.startDate);
  const endDate = convertDateToString(params.endDate);

  const url = `${historyBaseUrl}/${encodeURIComponent(items)}.json`;
  return await axios.get<THistory[]>(url, {
    params: dynamicQueryParams({
      locations,
      date: startDate,
      end_date: endDate,
      qualities,
      "time-scale": timeScale,
    }),
  });
}

/**
 * @description Returns just data with dates converted to UTC
 */
export async function getChartHistoryData(
  params: TChartParams
): Promise<THistory[]> {
  const { data } = await getChartHistoryRaw(params);

  return data.map((history) => ({
    ...history,
    data: history.data.map((i) => ({
      ...i,
      timestamp: appendUTC(i.timestamp),
    })),
  }));
}
