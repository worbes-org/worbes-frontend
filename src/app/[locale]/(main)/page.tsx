import { redirectWithoutLocale } from "@/hooks/usePathnameWithoutLocale";
import { AppUrlBuilder } from "@/utils/url";
import { getLocale } from "next-intl/server";
import { AFC } from "react";

const HomePage: AFC = async () => {
  const locale = await getLocale();
  redirectWithoutLocale({ href: AppUrlBuilder.auctions(), locale });
};

export default HomePage;
