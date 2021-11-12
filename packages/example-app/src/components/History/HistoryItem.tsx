import { ReactElement, useEffect, useState } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import {
  getChartHistoryData,
  THistoryItem,
  QUALITIES_ENUM,
} from "@albion-data/client";

import {
  ItemOption,
  MarketOptions,
  QualityOption,
  EnchantmentOption,
} from "../../options";
import { Table, TColumn } from "../Table";
import { Loader } from "../Loader";
import { resolveItemName, resolveImg } from "../../utils";
import { ItemDescription } from "../ItemDescription";

type ChartProps = {
  selectedItem: ItemOption;
  selectedMarket?: MarketOptions | null;
  selectedQuality?: QualityOption | null;
  selectedEnchantment?: EnchantmentOption | null;
};

const columns: TColumn<THistoryItem>[] = [
  { label: "Avg Price", accessor: "avg_price" },
  { label: "Count", accessor: "item_count" },
  { label: "Time Stamp", accessor: "timestamp", date: true },
];

export function HistoryItem({
  selectedItem,
  selectedMarket,
  selectedQuality,
  selectedEnchantment,
}: ChartProps): ReactElement {
  const [imgLoaded, setImagLoaded] = useState<boolean>(false);
  const itemName = resolveItemName(
    selectedItem.value,
    selectedEnchantment?.value
  );

  const { data, isError, isLoading } = useQuery(
    [itemName, selectedMarket?.value, selectedQuality?.value],
    () =>
      getChartHistoryData({
        itemList: itemName,
        startDate: dayjs().subtract(1, "days").toString(),
        endDate: dayjs().toString(),
        locations: selectedMarket?.value,
        qualities: selectedQuality?.value,
      }),
    {
      cacheTime: 10000,
    }
  );

  useEffect(() => {
    // Weird hack to try and wait for browser to cache this img lol, prob way better way todo this /shrug
    const img = new Image();
    img.onload = () => {
      setImagLoaded(true);
    };
    img.src = resolveImg(itemName);
    // If it takes over 2s to get img from slow wiki just display without it
    setTimeout(() => {
      setImagLoaded(true);
    }, 2000);
  }, [itemName]);

  if (isError) return <h1>Error fetching data from Albion Data Project</h1>;
  if (isLoading || !imgLoaded) return <Loader />;

  return (
    <div>
      <ItemDescription item={selectedItem} enchantment={selectedEnchantment} />
      <div className="cities-wrapper">
        {data?.map((market, i) => {
          return (
            <Table
              title={`${market.location} - Quality ${
                QUALITIES_ENUM[market.quality]
              }`}
              columns={columns}
              data={market.data}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
}
