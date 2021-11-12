import { TItemID } from "@albion-data/client";

export function resolveItemName(
  item: TItemID,
  enchantment?: string | number
): TItemID {
  if (!enchantment) return item;

  // Since this is only an example I'm just going to force TS into think this is valid lol
  return `${item}@${enchantment}` as unknown as TItemID;
}

export function resolveImg(itemName: TItemID): string {
  return `https://render.albiononline.com/v1/item/${itemName}.png`;
}
