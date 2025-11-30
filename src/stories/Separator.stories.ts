import Separator from "@/components/Separator";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: { className: "w-100", orientation: "horizontal" },
};

export const Vertical: Story = {
  args: { className: "h-100", orientation: "vertical" },
};
