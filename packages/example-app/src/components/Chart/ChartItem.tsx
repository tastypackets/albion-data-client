import { ReactElement, useMemo } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import {
  QUALITIES_ENUM,
  TItemID,
  ENCHANTMENTS_ENUM,
  getChartData,
  getItemIconUrl,
} from "@albion-data/client";

import {
  ItemOption,
  MarketOptions,
  QualityOption,
  EnchantmentOption,
} from "../../options";
import { Table, TColumn } from "../Table";
import { Loader } from "../Loader";
import { resolveItemName } from "../../utils";
import { ItemDescription } from "../ItemDescription";

type ChartProps = {
  selectedItem: ItemOption;
  selectedMarket?: MarketOptions | null;
  selectedQuality?: QualityOption | null;
  selectedEnchantment?: EnchantmentOption | null;
  showIcons: boolean;
};

type FormattedChart = {
  timestamps: string;
  prices_avg: number;
  item_count: number;
  item_id: TItemID;
};

const columns: TColumn<FormattedChart>[] = [
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
  showIcons,
}: ChartProps): ReactElement {
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

  const formattedData = useMemo(() => {
    return (
      data?.map((market) => ({
        ...market,
        data:
          market?.data?.timestamps?.map((timestamp, key) => ({
            item_id: market.item_id,
            timestamps: timestamp,
            prices_avg: market.data.prices_avg[key],
            item_count: market.data.item_count[key],
          })) || [],
      })) || []
    );
  }, [data]);

  if (isError) return <h1>Error fetching data from Albion Data Project</h1>;
  if (isLoading) return <Loader />;

  return (
    <div>
      <ItemDescription item={selectedItem} showIcon={false} />
      <div className="cities-wrapper">
        {formattedData.map((market, i) => (
          <Table
            title={
              <div className="table-title">
                {showIcons && (
                  <img
                    src={getItemIconUrl({
                      identifier: itemName,
                      quality: market.quality,
                      size: 75,
                    })}
                    alt={QUALITIES_ENUM[market.quality]}
                  />
                )}
                {`${market.location} - ${QUALITIES_ENUM[market.quality]}`}
              </div>
            }
            columns={columns}
            data={market.data}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
