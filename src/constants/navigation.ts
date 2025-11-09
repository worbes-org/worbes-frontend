import { AppUrlBuilder } from "@/utils/url";

export const HEADER_NAV_ITEMS = [
  {
    label: "Home",
    href: AppUrlBuilder.home(),
  },
  {
    label: "Auctions",
    href: AppUrlBuilder.auctions(),
  },
] as const;
