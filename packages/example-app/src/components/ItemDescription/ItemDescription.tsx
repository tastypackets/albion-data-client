import { ReactElement } from "react";

import { ItemOption, EnchantmentOption } from "../../options";
import { resolveItemName, resolveImg } from "../../utils";
import "./item.css";

type ItemDescriptionProps = {
  item: ItemOption;
  enchantment?: EnchantmentOption | null;
};

export function ItemDescription({
  item,
  enchantment,
}: ItemDescriptionProps): ReactElement {
  const itemName = resolveItemName(item.value, enchantment?.value);

  return (
    <div className="item-details">
      <div>
        <img
          // !!! WARNING -- Please do not him someone elses end point like this without permission, this is only for an example and may break at any time.
          src={resolveImg(itemName)}
          alt={`${itemName} icon`}
          className="item-icon"
        />
      </div>
      <div className="item-content">
        <h1>{item.label}</h1>
        <span>{item.description}</span>
      </div>
    </div>
  );
}
