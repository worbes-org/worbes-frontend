import AuctionDetail, {
  AuctionDetailSkeleton,
} from "@/components/AuctionDetail";
import LayoutContainer from "@/components/LayoutContainer";
import { injectWowheadItem } from "@/injectors/item";
import { parseItemBonus } from "@/parsers/item";
import { AppUrlBuilder } from "@/utils/url";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AFC, Suspense } from "react";

type Props = {
  params: Promise<{
    realmId: string;
    auctionId: string;
  }>;
  searchParams: Promise<{
    itemBonus: string;
  }>;
};

const AuctionDetailPage: AFC<Props> = async ({ params, searchParams }) => {
  const { itemBonus: _itemBonus } = await searchParams;
  const itemBonus = _itemBonus ? parseItemBonus(_itemBonus) : null;

  const { realmId, auctionId } = await params;
  if (Number.isNaN(Number(realmId)) || Number.isNaN(Number(auctionId))) {
    notFound();
  }

  const locale = await getLocale();
  const item = await injectWowheadItem({ itemId: Number(auctionId), locale });
  if (!item) {
    console.error(`Failed to fetch Wowhead item ${auctionId}`);
    notFound();
  }

  return (
    <LayoutContainer className="space-y-10 py-6">
      <Link
        className="flex items-center gap-x-4 text-gray-200 transition-colors duration-500 hover:text-gray-100"
        href={AppUrlBuilder.auctions()}
      >
        <ArrowLeftIcon className="size-6" />
        <span className="text-lg">Back to Auctions</span>
      </Link>

      <Suspense fallback={<AuctionDetailSkeleton />}>
        <AuctionDetail
          historyClassName="lg:sticky lg:top-[calc(var(--header-height)+1rem)] "
          realmId={realmId}
          auctionId={auctionId}
          item={item}
          itemBonus={itemBonus}
        />
      </Suspense>
    </LayoutContainer>
  );
};

export default AuctionDetailPage;
