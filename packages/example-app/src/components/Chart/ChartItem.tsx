import { ReactElement, useEffect, useState, useMemo } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import {
  TMarkets,
  QUALITIES_ENUM,
  TItemID,
  ENCHANTMENTS_ENUM,
  getChartData,
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

type FormattedChart = {
  timestamps: string;
  prices_avg: number;
  item_count: number;
  location: TMarkets;
  item_id: TItemID;
  quality: number;
};

const columns: TColumn<FormattedChart>[] = [
  { label: "Quality", accessor: (row) => QUALITIES_ENUM[row.quality] },
  { label: "Avg Price", accessor: "prices_avg" },
  { label: "Count", accessor: "item_count" },
  { label: "Time Stamp", accessor: "timestamps", date: true },
  {
    label: "Enchantment",
    accessor: (row) =>
      ENCHANTMENTS_ENUM[parseInt(row.item_id.split("@")[1]) || 0],
  },
];

export function ChartItem({
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
      getChartData({
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

  const formattedData = useMemo(() => {
    console.log(data);
    return (
      data?.map(
        (market) =>
          market?.data?.timestamps?.map((timestamp, key) => ({
            location: market.location,
            quality: market.quality,
            item_id: market.item_id,
            timestamps: timestamp,
            prices_avg: market.data.prices_avg[key],
            item_count: market.data.item_count[key],
          })) || []
      ) || []
    );
  }, [data]);

  if (isError) return <h1>Error fetching data from Albion Data Project</h1>;
  if (isLoading || !imgLoaded) return <Loader />;

  return (
    <div>
      <ItemDescription item={selectedItem} enchantment={selectedEnchantment} />
      <div className="cities-wrapper">
        {formattedData.map((market, i) => (
          <Table
            title={market[0].location}
            columns={columns}
            data={market}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
