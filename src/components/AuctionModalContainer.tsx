"use client";

import AuctionDetailContainer from "@/components/AuctionDetailContainer";
import FullscreenModal from "@/components/FullscreenModal";
import { usePathnameWithoutLocale } from "@/hooks/usePathnameWithoutLocale";
import { Nullable } from "@/types/misc";
import type { WowheadItem } from "@/types/wowhead";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";

type Params = {
  realmId: string;
  auctionId: string;
};

type AuctionModalContainerProps = {
  item: WowheadItem;
  initialParams: Params;
};

const AuctionModalContainer: FC<AuctionModalContainerProps> = ({
  item,
  initialParams,
}) => {
  const router = useRouter();
  const pathname = usePathnameWithoutLocale();
  const searchParams = useSearchParams();

  const reactiveParams = useMemo<Nullable<Params>>(
    () => extractParams(pathname),
    [pathname],
  );
  const activeParams = reactiveParams ?? initialParams;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nextVisible = !!reactiveParams;
    setVisible(!!nextVisible);
  }, [reactiveParams]);

  return (
    <FullscreenModal
      title="Auction Detail"
      visible={visible}
      onClose={handleClose}
    >
      <AuctionDetailContainer
        realmId={activeParams.realmId}
        auctionId={activeParams.auctionId}
        itemBonus={searchParams.get("itemBonus")}
      />
    </FullscreenModal>
  );

  function handleClose() {
    router.push("/auctions");
  }
};

function extractParams(pathname: string): Nullable<Params> {
  const regex = /\/auctions\/(\d+)\/realms\/(\d+)/;
  const match = pathname.match(regex);
  const auctionId = match?.[1];
  const realmId = match?.[2];

  if (typeof realmId !== "string" || typeof auctionId !== "string") {
    return null;
  }

  return { realmId, auctionId };
}

export default AuctionModalContainer;
