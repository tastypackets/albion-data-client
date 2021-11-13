import { ReactElement, useMemo } from "react";
import { useQuery } from "react-query";
import { getPriceData, TPrice, ENCHANTMENTS_ENUM } from "@albion-data/client";

import { Loader } from "../Loader";
import { Table, TColumn } from "../Table";
import {
  ItemOption,
  MarketOptions,
  QualityOption,
  EnchantmentOption,
} from "../../options";
import { resolveItemName } from "../../utils";
import { ItemDescription } from "../ItemDescription";
import { TableIcon } from "../TableIcon";
// QUALITIES_ENUM[row.quality]

type PriceItemProps = {
  selectedItem: ItemOption;
  selectedMarket?: MarketOptions | null;
  selectedQuality?: QualityOption | null;
  selectedEnchantment?: EnchantmentOption | null;
  showIcons: boolean;
};

export function PriceItem({
  selectedItem,
  selectedMarket,
  selectedQuality,
  selectedEnchantment,
  showIcons,
}: PriceItemProps): ReactElement {
  const itemName = resolveItemName(
    selectedItem.value,
    selectedEnchantment?.value
  );

  const { data, isError, isLoading } = useQuery(
    [itemName, selectedMarket?.value, selectedQuality?.value],
    () =>
      getPriceData({
        itemList: itemName,
        locations: selectedMarket?.value,
        qualities: selectedQuality?.value,
      }),
    {
      cacheTime: 10000,
    }
  );

  const columns: TColumn<TPrice>[] = useMemo(
    () => [
      { label: "Market", accessor: "city" },
      {
        label: "Quality",
        accessor: (row) => (
          <TableIcon
            id={row.item_id}
            quality={row.quality}
            showIcon={showIcons}
          />
        ),
      },
      { label: "Min Sell Price", accessor: "sell_price_min" },
      {
        label: "Min Sell Updated",
        accessor: "sell_price_min_date",
        date: true,
      },
      { label: "Max Sell Price", accessor: "sell_price_max" },
      {
        label: "Max Sell Updated",
        accessor: "sell_price_max_date",
        date: true,
      },
      { label: "Min Buy Price", accessor: "buy_price_min" },
      { label: "Min Buy Updated", accessor: "buy_price_min_date", date: true },
      { label: "Max Buy Price", accessor: "buy_price_max" },
      { label: "MaxBuy Updated", accessor: "buy_price_max_date", date: true },
      {
        label: "Enchantment",
        accessor: (row) =>
          ENCHANTMENTS_ENUM[parseInt(row.item_id.split("@")[1]) || 0],
      },
    ],
    [showIcons]
  );

  if (isError) return <h1>Error fetching data from Albion Data Project</h1>;
  if (isLoading) return <Loader />;

  return (
    <div>
      <ItemDescription
        item={selectedItem}
        enchantment={selectedEnchantment}
        showIcon={false}
      />
      <div className="cities-wrapper">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}
