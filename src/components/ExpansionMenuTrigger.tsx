import BottomDrawer from "@/components/BottomDrawer";
import DropdownPanel from "@/components/DropdownPanel";
import Input from "@/components/Input";
import ListSelector from "@/components/ListSelector";
import MenuTrigger from "@/components/MenuTrigger";
import Responsive from "@/components/Responsive";
import { EXPANSIONS } from "@/constants/auction";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useTranslations } from "@/hooks/useTranslations";
import { getExpansionLabel } from "@/utils/auction";
import { cn } from "@/utils/styles";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

type Props = {
  className?: string;
  value?: number;
  onChange: (value: number) => void;
};

const ExpansionMenuTrigger: FC<Props> = ({ className, value, onChange }) => {
  const t = useTranslations();
  const isSmBreakpoint = useBreakpoint("sm");

  const selectedLabel = value ? getExpansionLabel(value) : null;
  const selectedValues = typeof value === "number" ? [value] : [];

  return (
    <MenuTrigger
      className={className}
      closeOnClickAway={isSmBreakpoint}
      renderButton={({ isOpen, onClick }) => (
        <div role="button" onClick={onClick}>
          <Input
            className="pointer-events-none"
            size="md"
            placeholder={t("All Expansions")}
            value={selectedLabel ? t(selectedLabel) : ""}
            rightIcon={
              <ChevronDownIcon
                className={cn(
                  "size-5 text-gray-300 transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            }
          />
        </div>
      )}
      renderMenu={({ isOpen, onClose }) => (
        <Responsive
          mobile={
            <BottomDrawer
              title={t("Expansion")}
              theme="primary"
              isOpen={isOpen}
              onClose={onClose}
            >
              <ListSelector
                listClassName="max-h-[60dvh] overflow-y-auto"
                fadeGradientClassName={{ to: "to-gray-900" }}
                options={EXPANSIONS.map((expansion) => ({
                  ...expansion,
                  label: t(expansion.label),
                }))}
                selectedValues={selectedValues}
                onSelect={(item) => {
                  onChange(item.value);
                  onClose();
                }}
              />
            </BottomDrawer>
          }
          desktop={
            <DropdownPanel
              className="overflow-hidden"
              position="bottom"
              isOpen={isOpen}
            >
              <ListSelector
                listClassName="max-h-80 overflow-y-auto"
                fadeGradientClassName={{ to: "to-gray-900" }}
                options={EXPANSIONS.map((expansion) => ({
                  ...expansion,
                  label: t(expansion.label),
                }))}
                selectedValues={selectedValues}
                onSelect={(item) => {
                  onChange(item.value);
                  onClose();
                }}
              />
            </DropdownPanel>
          }
        />
      )}
    />
  );
};

export default ExpansionMenuTrigger;
