import DesktopHeader from "@/components/DesktopHeader";
import MobileHeader from "@/components/MobileHeader";
import { cn } from "@/utils/styles";
import { type FC } from "react";

type Props = {
  className?: string;
};

const Header: FC<Props> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <DesktopHeader className="not-sm:hidden" />
      <MobileHeader className="sm:hidden" />
    </div>
  );
};

export default Header;
