import CategoryListPanel from "@/components/CategoryListPanel";
import ListSelector from "@/components/ListSelector";
import Text from "@/components/Text";
import { CategorySelection } from "@/types/category";
import type { ListSelectorOption } from "@/types/selector";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { noop, range } from "lodash-es";
import { useState } from "react";

const meta = {
  component: ListSelector,
  parameters: { layout: "padded" },
  args: {
    fadeGradientClassName: {
      from: "from-transparent",
      to: "to-gray-950",
    },
    options: [],
    selectedValues: [],
    onSelect: noop,
  },
} satisfies Meta<typeof ListSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Flat: Story = {
  render: (args) => {
    const OPTIONS: ListSelectorOption<string>[] = range(100).map((i) => ({
      label: `Option ${i + 1}`,
      value: `option-${i + 1}`,
    }));

    const [values, setValues] = useState<string[]>([]);

    return (
      <ListSelector
        {...args}
        listClassName="max-h-[50dvh] overflow-y-auto"
        options={OPTIONS}
        selectedValues={values}
        onSelect={handleSelect}
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

export const Nested: Story = {
  render: (args) => {
    const [selection, setSelection] = useState<CategorySelection>({});
    return (
      <div className="w-full space-y-2">
        <Text theme="secondary" size="sm">
          {JSON.stringify(selection)}
        </Text>

        <CategoryListPanel
          {...args}
          listClassName="max-h-[600px] overflow-y-auto"
          value={selection}
          onChange={setSelection}
        />
      </div>
    );
  },
};
