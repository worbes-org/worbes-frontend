import { AuctionFilterContext } from "@/providers/AuctionFilterProvider";
import { assert } from "@/utils/assert";
import { useContext } from "react";

export function useAuctionFilter() {
  const context = useContext(AuctionFilterContext);

  assert(context, "use <AuctionFilterProvider> to access AuctionFilterContext");

  return context;
}
