import { AppUrlBuilder } from "@/utils/url";
import { HomeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

export const HEADER_NAV_ITEMS = [
  {
    label: "Home",
    href: AppUrlBuilder.home(),
    Icon: HomeIcon,
  },
  {
    label: "Auctions",
    href: AppUrlBuilder.auctions(),
    Icon: ShoppingBagIcon,
  },
] as const;
