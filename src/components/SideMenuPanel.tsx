import RealmSelector from "@/components/RealmSelector";
import RegionSelector from "@/components/RegionSelector";
import { useSelectedRealm } from "@/hooks/useSelectedRealm";
import { useSelectedRegion } from "@/hooks/useSelectedRegion";
import { cn } from "@/utils/styles";
import { FC } from "react";

type Props = {
  className?: string;
};

const SideMenuPanel: FC<Props> = ({ className }) => {
  const [selectedRegion, setSelectedRegion] = useSelectedRegion();
  const [selectedRealm, setSelectedRealm] = useSelectedRealm();

  return (
    <div className={cn("bg-green-900 p-5", className)}>
      <RegionSelector value={selectedRegion} onChange={setSelectedRegion} />
      <RealmSelector
        region={selectedRegion}
        value={selectedRealm}
        onChange={setSelectedRealm}
      />
    </div>
  );
};

export default SideMenuPanel;
