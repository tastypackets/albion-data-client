import axios from "axios";
import { TItemID } from "@albion-data/types";

import { baseItemDetails } from "./baseUrl";
import { TItemLocaleOptions } from "./types";

export type TSearchResponse = {
  id: TItemID;
  name: string;
  description: string;
};

type GetItemLocaleParams = {
  identifier: string;
  locale?: TItemLocaleOptions;
};

export async function getItemLocale({
  identifier,
  locale = "en-US",
}: GetItemLocaleParams): Promise<TSearchResponse> {
  const { data } = await axios.get(
    `${baseItemDetails}/${locale}/${identifier}`
  );

  return data;
}
