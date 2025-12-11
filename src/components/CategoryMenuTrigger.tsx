import BottomDrawer from "@/components/BottomDrawer";
import CategoryListPanel from "@/components/CategoryListPanel";
import Input from "@/components/Input";
import MenuTrigger from "@/components/MenuTrigger";
import { useTranslations } from "@/hooks/useTranslations";
import { CategorySelection } from "@/types/category";
import { Nullable } from "@/types/misc";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

type Props = {
  className?: string;
  value: Nullable<CategorySelection>;
  onChange: (value: CategorySelection) => void;
};

const CategoryMenuTrigger: FC<Props> = ({ className, value, onChange }) => {
  const t = useTranslations();
  return (
    <MenuTrigger
      className={className}
      closeOnClickAway={false}
      renderButton={({ onClick }) => (
        <div role="button" onClick={onClick}>
          <Input
            className="pointer-events-none"
            size="md"
            value={value?.label}
            placeholder={t("Select Category")}
            rightIcon={<ChevronUpDownIcon />}
          />
        </div>
      )}
      renderMenu={({ isOpen, onClose }) => (
        <BottomDrawer
          className="max-h-[70dvh]"
          title={t("Select Category")}
          theme="primary"
          isOpen={isOpen}
          onClose={onClose}
        >
          <CategoryListPanel
            listClassName="max-h-[calc(70dvh-7rem)] overflow-y-auto"
            value={value}
            fadeGradientClassName={{
              to: "to-gray-900",
            }}
            onChange={onChange}
          />
        </BottomDrawer>
      )}
    />
  );
};

export default CategoryMenuTrigger;
