import { AppUrlBuilder } from "@/utils/url";
import { redirect } from "next/navigation";
import { AFC } from "react";

const HomePage: AFC = async () => {
  // TODO: Implement home page
  redirect(AppUrlBuilder.auctions());
  // return null;
};

export default HomePage;
