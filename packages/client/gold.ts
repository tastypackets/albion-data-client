import { TGold } from "@albion-data/types";
import { AxiosResponse } from "axios";

import {
  axiosClient,
  convertDateToString,
  dynamicQueryParams,
  appendUTC,
} from "./utils";

/**
 * @description Paramters for Gold API calls
 */
export type TGoldParams = {
  /** @description The date to start the query */
  startDate?: Date | string;
  /** @description The date to end the query */
  endDate?: Date | string;
  /** How many records to return */
  count?: number;
};

/**
 * @description Unformatted raw axios response
 */
export async function getGoldRaw(
  params?: TGoldParams
): Promise<AxiosResponse<TGold[], any>> {
  const startDate = convertDateToString(params?.startDate);
  const endDate = convertDateToString(params?.endDate);

  const url = `Gold.json`;
  return await axiosClient.get<TGold[]>(url, {
    params: dynamicQueryParams({
      date: startDate,
      end_date: endDate,
      count: params?.count,
    }),
  });
}

/**
 * @description Returns just data with dates converted to UTC
 */
export async function getGoldData(params: TGoldParams): Promise<TGold[]> {
  const { data } = await getGoldRaw(params);

  return data.map((gold) => ({
    ...gold,
    timestamp: appendUTC(gold.timestamp),
  }));
}
