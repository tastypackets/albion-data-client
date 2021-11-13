import { useState, ReactElement } from "react";
import Select from "react-select";

import { ChartItem } from "./ChartItem";
import {
  options,
  ItemOption,
  marketOptions,
  MarketOptions,
  QualityOption,
  qualityOptions,
  EnchantmentOption,
  enchantmentOptions,
} from "../../options";
import { selectTheme } from "../../selectTheme";

type ChartProps = {
  showIcons: boolean;
};

export function Chart({ showIcons }: ChartProps): ReactElement {
  const [selectedItem, setSelectedItem] = useState<ItemOption | null>(null);
  const [selectedEnchantment, setSelectedEnchantment] =
    useState<EnchantmentOption | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<QualityOption | null>(
    null
  );
  const [selectedMarket, setSelectedMarket] = useState<MarketOptions | null>(
    null
  );
  return (
    <div className="chart-wrapper">
      <div className="search-wrapper">
        <Select
          className="find-item"
          classNamePrefix="select"
          isSearchable
          name="Find Item"
          options={options}
          onChange={setSelectedItem}
          theme={selectTheme}
          placeholder="Item"
        />
        <Select
          className="find-quality"
          classNamePrefix="select"
          isSearchable
          name="Quality"
          options={qualityOptions}
          onChange={setSelectedQuality}
          theme={selectTheme}
          isClearable
          placeholder="Quality"
        />
        <Select
          className="find-enchantment"
          classNamePrefix="select"
          isSearchable
          name="Enchantment"
          options={enchantmentOptions}
          onChange={setSelectedEnchantment}
          theme={selectTheme}
          isClearable
          placeholder="Enchantment"
        />
        <Select
          className="find-city"
          classNamePrefix="select"
          isSearchable
          name="Find City"
          options={marketOptions}
          onChange={setSelectedMarket}
          theme={selectTheme}
          isClearable
          placeholder="Market"
        />
      </div>
      {selectedItem && (
        <ChartItem
          selectedItem={selectedItem}
          selectedMarket={selectedMarket}
          selectedQuality={selectedQuality}
          selectedEnchantment={selectedEnchantment}
          showIcons={showIcons}
        />
      )}
    </div>
  );
}
