import { safeParseInt, safeParseString } from "@/parsers/misc";
import { WowheadItem } from "@/types/wowhead";
import { XMLParser } from "fast-xml-parser";
import { isNull } from "lodash-es";

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
  const level = safeParseInt(item?.level);
  const classLabel = safeParseString(item?.class["#text"]);
  const subClassLabel = safeParseString(item?.subclass["#text"]);

  if (
    isNull(id) ||
    isNull(name) ||
    isNull(qualityId) ||
    isNull(qualityLabel) ||
    isNull(iconName) ||
    isNull(level) ||
    isNull(classLabel) ||
    isNull(subClassLabel)
  ) {
    throw new Error("Invalid Wowhead XML: missing required fields");
  }

  const iconUrl = `https://wow.zamimg.com/images/wow/icons/large/${iconName}.jpg`;
  return {
    id,
    name,
    qualityId,
    qualityLabel,
    iconName,
    iconUrl,
    level,
    classLabel,
    subClassLabel,
  };
}

export function parseItemBonus(itemBonus: string): string {
  return itemBonus.replace("_", ":");
}
