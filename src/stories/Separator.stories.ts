import Separator from "@/components/Separator";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  component: Separator,
  args: { className: "w-100" },
} satisfies Meta<typeof Separator>;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
};

export default meta;
