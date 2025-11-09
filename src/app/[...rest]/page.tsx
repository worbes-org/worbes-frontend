import { redirect } from "next/navigation";
import { type FC } from "react";

const CatchAllPage: FC = () => {
  redirect("/auctions");
  // notFound();
};

export default CatchAllPage;
