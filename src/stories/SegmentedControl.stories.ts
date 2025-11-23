import SegmentedControl, {
  type SegmentedControlOption,
} from "@/components/SegmentedControl";
import type { Meta, StoryObj } from "@storybook/nextjs";

const baseOptions: SegmentedControlOption<string>[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const meta = {
  component: SegmentedControl,
  args: {
    value: "option1",
    size: "md",
    options: baseOptions,
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};
