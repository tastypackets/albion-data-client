export function resolveItemName(
  item: string,
  enchantment?: string | number
): string {
  if (!enchantment) return item;

  // Since this is only an example I'm just going to force TS into think this is valid lol
  return `${item}@${enchantment}`;
}
