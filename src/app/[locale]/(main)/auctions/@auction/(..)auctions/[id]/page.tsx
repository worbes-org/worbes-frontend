"use client";

import FullscreenModal from "@/components/FullscreenModal";
import { usePathnameWithoutLocale } from "@/hooks/usePathnameWithoutLocale";
import { useRouter } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import { usePrevious } from "react-use";

type Props = {};

const AuctionDetailModal: FC<Props> = ({}) => {
  const router = useRouter();
  const pathname = usePathnameWithoutLocale();

  const [visible, setVisible] = useState(false);

  const reactiveId = useMemo(() => extractId(pathname), [pathname]);
  const prevId = usePrevious(reactiveId);

  useEffect(() => {
    setVisible(!!reactiveId);
  }, [reactiveId]);

  const activeId = reactiveId ?? prevId;

  return (
    <FullscreenModal
      title="Auction Detail"
      visible={visible}
      onClose={handleClose}
    >
      <div className="h-[200dvh]">Modal: {activeId}</div>
    </FullscreenModal>
  );

  function handleClose() {
    router.push("/auctions");
  }

  function extractId(pathname: string) {
    const regex = /\/auctions\/(\d+)/;
    const match = pathname.match(regex);
    return match?.[1];
  }
};

export default AuctionDetailModal;
