import { safeParseInt, safeParseString } from "@/parsers/misc";
import { WowheadItem } from "@/types/wowhead";
import { XMLParser } from "fast-xml-parser";

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

export function parseWowheadItemXml(xmlText: string): WowheadItem {
  const item = xmlParser.parse(xmlText)?.wowhead?.item;

  const id = safeParseInt(item?.["@_id"]);
  const qualityId = safeParseInt(item?.quality?.["@_id"]);
  const name = safeParseString(item?.name);
  const qualityLabel = safeParseString(item?.quality);
  const iconName = safeParseString(item?.icon);

  if (!id || !name || qualityId == null || !qualityLabel || !iconName) {
    throw new Error("Invalid Wowhead XML: missing required fields");
  }

  const iconUrl = `https://www.wowhead.com/images/wow/icons/medium/${iconName}.jpg`;

  return {
    id,
    name,
    qualityId,
    qualityLabel,
    iconName,
    iconUrl,
  };
}
