"use client";

import BottomDrawer from "@/components/BottomDrawer";
import DropdownPanel from "@/components/DropdownPanel";
import ListSelector from "@/components/ListSelector";
import Responsive from "@/components/Responsive";
import SelectorTrigger from "@/components/SelectorTrigger";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { ListSelectorOption } from "@/types/selector";
import { ViewportBreakpoint } from "@/types/viewport";
import { cn } from "@/utils/styles";
import { ReactNode, type ComponentProps, type ReactElement } from "react";
import Input from "./Input";

type Props<TValue extends string | number, TMetadata = unknown> = {
  className?: string;
  breakpoint?: ViewportBreakpoint;
  button: {
    size: ComponentProps<typeof Input>["size"];
    label: string;
    placeholder: string;
    leftIcon?: ReactElement<ComponentProps<"svg">>;
    rightIcon?: ReactElement<ComponentProps<"svg">>;
    isLoading?: boolean;
  };
  panel: {
    options: ListSelectorOption<TValue, TMetadata>[];
    values?: TValue[];
    closeOnSelect?: boolean;
    drawer: {
      title: string;
      renderContent?: (args: {
        isOpen: boolean;
        onClose: () => void;
      }) => ReactNode;
    };
    onSelect?: (
      option: ListSelectorOption<TValue, TMetadata>,
      isOpen?: boolean,
    ) => void;
  };
};

const ResponsiveSelector = <
  TValue extends string | number,
  TMetadata = unknown,
>({
  className,
  breakpoint = "md",
  button,
  panel,
}: Props<TValue, TMetadata>) => {
  const isBreakpoint = useBreakpoint(breakpoint);

  return (
    <SelectorTrigger
      className={cn("", className)}
      closeOnClickAway={isBreakpoint}
      {...button}
    >
      {({ isOpen, onClose }) => {
        return (
          <Responsive
            breakpoint={breakpoint}
            mobile={
              <BottomDrawer
                title={panel.drawer.title}
                theme="primary"
                isOpen={isOpen}
                onClose={onClose}
              >
                <ListSelector
                  listClassName="scrollbar-hide max-h-[calc(70dvh-7.5rem)] overflow-y-auto"
                  options={panel.options}
                  selectedValues={panel.values ?? []}
                  onSelect={handleSelect}
                >
                  {panel.drawer.renderContent?.({ isOpen, onClose })}
                </ListSelector>
              </BottomDrawer>
            }
            desktop={
              <DropdownPanel isOpen={isOpen}>
                <ListSelector
                  listClassName="scrollbar-hide max-h-70 overflow-y-auto"
                  options={panel.options}
                  selectedValues={panel.values ?? []}
                  onSelect={handleSelect}
                />
              </DropdownPanel>
            }
          />
        );

        function handleSelect(
          option: ListSelectorOption<TValue, TMetadata>,
          isOpen?: boolean,
        ) {
          panel.onSelect?.(option, isOpen);

          if (!panel.closeOnSelect) {
            return;
          }
          onClose();
        }
      }}
    </SelectorTrigger>
  );
};

export default ResponsiveSelector;
