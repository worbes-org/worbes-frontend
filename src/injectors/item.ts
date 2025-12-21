import { parseWowheadItemXml } from "@/parsers/item";
import type { Nullable } from "@/types/misc";
import type { WowheadItem } from "@/types/wowhead";

export async function injectWowheadItem(
  itemId: number,
): Promise<Nullable<WowheadItem>> {
  try {
    const res = await fetch(`https://www.wowhead.com/item=${itemId}&xml`, {
      headers: {
        accept: "text/xml, application/xml;q=0.9, text/plain;q=0.8, */*;q=0.5",
      },
    });

    if (!res.ok) {
      throw new Error(`Wowhead request failed: ${res.status}`);
    }

    const xmlText = await res.text();
    return parseWowheadItemXml(xmlText);
  } catch (error) {
    console.error(`Failed to fetch Wowhead item ${itemId}:`, error);
    return null;
  }
}
