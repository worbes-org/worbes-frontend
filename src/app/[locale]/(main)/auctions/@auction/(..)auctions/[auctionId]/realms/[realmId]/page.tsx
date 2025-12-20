"use client";

import AuctionDetail from "@/components/AuctionDetail";
import FullscreenModal from "@/components/FullscreenModal";
import { usePathnameWithoutLocale } from "@/hooks/usePathnameWithoutLocale";
import { useSettingsContext } from "@/hooks/useSettingsContext";
import { useRouter } from "next/navigation";
import { FC, Suspense, useEffect, useMemo, useState } from "react";
import { usePrevious } from "react-use";

type Props = {};

const AuctionDetailModal: FC<Props> = ({}) => {
  const router = useRouter();
  const pathname = usePathnameWithoutLocale();

  const {
    settings: { region: selectedRegion },
  } = useSettingsContext();

  const [visible, setVisible] = useState(false);

  const reactiveParams = useMemo(() => extractParams(pathname), [pathname]);
  const prevParams = usePrevious(reactiveParams);

  useEffect(() => {
    const nextVisible = !!reactiveParams;
    setVisible(!!nextVisible);
  }, [reactiveParams]);

  const activeParams = reactiveParams ?? prevParams;

  return (
    <FullscreenModal
      title="Auction Detail"
      visible={visible}
      onClose={handleClose}
    >
      {activeParams && (
        <Suspense fallback={<div>Loading...</div>}>
          <AuctionDetail
            region={selectedRegion}
            realmId={activeParams.realmId}
            itemId={activeParams.auctionId}
            itemBonus={null}
          />
        </Suspense>
      )}
    </FullscreenModal>
  );

  function handleClose() {
    router.push("/auctions");
  }

  function extractParams(pathname: string) {
    const regex = /\/auctions\/(\d+)\/realms\/(\d+)/;
    const match = pathname.match(regex);
    const realmId = Number(match?.[1]);
    const auctionId = Number(match?.[2]);

    if (Number.isNaN(realmId)) {
      console.error(`Invalid realm ID: ${match?.[1]}`);
      return null;
    }

    if (Number.isNaN(auctionId)) {
      console.error(`Invalid auction ID: ${match?.[2]}`);
      return null;
    }

    return { realmId, auctionId };
  }
};

export default AuctionDetailModal;
