import dayjs from "dayjs";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://www.albion-online-data.com/api/v2/stats/",
});

export function flattenOptionalArray(
  param?: string | string[] | number | number[]
): string | number {
  if (typeof param === "undefined") return "";
  return Array.isArray(param) ? param.join(",") : param;
}

export function convertDateToString(date?: Date | string): string {
  if (!date) return "";
  return dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
}

type ParamsObj = {
  [key: string]: number | string | boolean | undefined;
};

export function dynamicQueryParams(params: ParamsObj): ParamsObj {
  const queryParams: ParamsObj = {};

  for (const [key, value] of Object.entries(params)) {
    if (value || typeof value === "boolean") {
      queryParams[key] = value;
    }
  }

  return queryParams;
}

export const appendUTC = (date: string) => `${date}Z`;

// TODO: There are a lot of small varitions like planks __LEVEL1@1 - need to research this more
// export function resolveEnchantment(item: TItemID)
