"use client";

import AuctionDetail, {
  AuctionDetailSkeleton,
} from "@/components/AuctionDetail";
import Modal from "@/components/Modal";
import { usePathnameWithoutLocale } from "@/hooks/usePathnameWithoutLocale";
import { Nullable } from "@/types/misc";
import type { WowheadItem } from "@/types/wowhead";
import { useRouter } from "next/navigation";
import { FC, Suspense, useEffect, useMemo, useState } from "react";

type Params = {
  realmId: string;
  auctionId: string;
};

type Props = {
  item: WowheadItem;
  initialParams: Params;
  itemBonus: Nullable<string>;
};

const AuctionModalContainer: FC<Props> = ({
  item,
  initialParams,
  itemBonus,
}) => {
  const router = useRouter();
  const pathname = usePathnameWithoutLocale();

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
    <Modal
      title="Auction Detail"
      size="3xl"
      visible={visible}
      onClose={handleClose}
    >
      <Suspense fallback={<AuctionDetailSkeleton />}>
        <AuctionDetail
          historyClassName="lg:sticky lg:top-4"
          realmId={activeParams.realmId}
          auctionId={activeParams.auctionId}
          item={item}
          itemBonus={itemBonus}
        />
      </Suspense>
    </Modal>
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
