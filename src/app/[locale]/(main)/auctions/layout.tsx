import { ReactNode, type FC } from "react";

type Props = {
  auction: ReactNode;
  children: ReactNode;
};

const AuctionsLayout: FC<Props> = ({ auction, children }) => {
  return (
    <>
      {children}
      {auction}
    </>
  );
};

export default AuctionsLayout;
