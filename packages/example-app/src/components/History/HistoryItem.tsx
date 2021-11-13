import { ReactElement } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import {
  getChartHistoryData,
  THistoryItem,
  getItemIconUrl,
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
import { resolveItemName } from "../../utils";
import { ItemDescription } from "../ItemDescription";

type ChartProps = {
  selectedItem: ItemOption;
  selectedMarket?: MarketOptions | null;
  selectedQuality?: QualityOption | null;
  selectedEnchantment?: EnchantmentOption | null;
  showIcons: boolean;
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
  showIcons,
}: ChartProps): ReactElement {
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

  if (isError) return <h1>Error fetching data from Albion Data Project</h1>;
  if (isLoading) return <Loader />;

  return (
    <div>
      <ItemDescription
        item={selectedItem}
        enchantment={selectedEnchantment}
        quality={selectedQuality?.value}
        showIcon={false}
      />
      <div className="cities-wrapper">
        {data?.map((market, i) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
}
