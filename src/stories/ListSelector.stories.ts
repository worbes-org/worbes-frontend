import ListSelector from "@/components/ListSelector";
import type { ListSelectorOption } from "@/types/selector";
import type { Meta, StoryObj } from "@storybook/nextjs";

const options: ListSelectorOption<string>[] = [
  {
    label: "Category A",
    value: "a",
    children: [
      {
        label: "Sub A1",
        value: "a1",
      },
      {
        label: "Sub A2",
        value: "a2",
      },
    ],
  },
  {
    label: "Category B",
    value: "b",
    children: [
      {
        label: "Sub B1",
        value: "b1",
      },
    ],
  },
  {
    label: "Category C",
    value: "c",
  },
];

const meta = {
  component: ListSelector,
  args: {
    options,
    selectedValues: [],
    onSelect: () => {},
  },
} satisfies Meta<typeof ListSelector>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
