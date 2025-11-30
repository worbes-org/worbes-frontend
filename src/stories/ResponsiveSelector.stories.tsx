import ResponsiveSelector from "@/components/ResponsiveSelector";
import type { ListSelectorOption } from "@/types/selector";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";

const SAMPLE_OPTIONS: ListSelectorOption<string>[] = [
  {
    label: "Weapons",
    value: "weapons",
  },
  {
    label: "Armor",
    value: "armor",
  },
  {
    label: "Miscellaneous",
    value: "misc",
  },
];

const meta = {
  component: ResponsiveSelector,
  args: {
    className: "max-w-sm",
    button: {
      size: "md",
      label: "Select Sample Item",
      placeholder: "Select sample item...",
      leftIcon: <GlobeAltIcon />,
    },
    panel: {
      drawer: {
        title: "Select Sample Item",
      },
      options: SAMPLE_OPTIONS,
    },
  },
} satisfies Meta<typeof ResponsiveSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [values, setValues] = useState<string[]>([]);

    return (
      <ResponsiveSelector
        {...args}
        panel={{
          ...args.panel,
          options: SAMPLE_OPTIONS,
          values,
          onSelect: handleSelect,
        }}
      />
    );

    function handleSelect(option: ListSelectorOption<string>) {
      setValues((prev) =>
        prev.includes(option.value)
          ? prev.filter((v) => v !== option.value)
          : [...prev, option.value],
      );
    }
  },
};

export const WithSearchInput: Story = {
  render: (args) => {
    const [values, setValues] = useState<string[]>([]);

    return (
      <ResponsiveSelector
        {...args}
        panel={{
          ...args.panel,
          searchInput: {
            placeholder: "Search...",
          },
          options: SAMPLE_OPTIONS,
          values,
          onSelect: handleSelect,
        }}
      />
    );

    function handleSelect(option: ListSelectorOption<string>) {
      setValues((prev) =>
        prev.includes(option.value)
          ? prev.filter((v) => v !== option.value)
          : [...prev, option.value],
      );
    }
  },
};
