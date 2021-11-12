import { useState, ReactElement, useEffect } from "react";
import { useQuery } from "react-query";
import {
  getPriceData,
  TPrice,
  ENCHANTMENTS_ENUM,
  QUALITIES_ENUM,
} from "@albion-data/client";

import { Loader } from "../Loader";
import { Table, TColumn } from "../Table";
import {
  ItemOption,
  MarketOptions,
  QualityOption,
  EnchantmentOption,
} from "../../options";
import { resolveItemName, resolveImg } from "../../utils";
import { ItemDescription } from "../ItemDescription";

const columns: TColumn<TPrice>[] = [
  { label: "Market", accessor: "city" },
  { label: "Quality", accessor: (row) => QUALITIES_ENUM[row.quality] },
  { label: "Min Sell Price", accessor: "sell_price_min" },
  { label: "Min Sell Updated", accessor: "sell_price_min_date", date: true },
  { label: "Max Sell Price", accessor: "sell_price_max" },
  { label: "Max Sell Updated", accessor: "sell_price_max_date", date: true },
  { label: "Min Buy Price", accessor: "buy_price_min" },
  { label: "Min Buy Updated", accessor: "buy_price_min_date", date: true },
  { label: "Max Buy Price", accessor: "buy_price_max" },
  { label: "MaxBuy Updated", accessor: "buy_price_max_date", date: true },
  {
    label: "Enchantment",
    accessor: (row) =>
      ENCHANTMENTS_ENUM[parseInt(row.item_id.split("@")[1]) || 0],
  },
];

type PriceItemProps = {
  selectedItem: ItemOption;
  selectedMarket?: MarketOptions | null;
  selectedQuality?: QualityOption | null;
  selectedEnchantment?: EnchantmentOption | null;
};

export function PriceItem({
  selectedItem,
  selectedMarket,
  selectedQuality,
  selectedEnchantment,
}: PriceItemProps): ReactElement {
  const [imgLoaded, setImagLoaded] = useState<boolean>(false);
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
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}
