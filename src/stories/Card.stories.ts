import Card from "@/components/Card";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  component: Card,
  args: {
    theme: "default",
    size: "md",
    children: "Card content",
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { theme: "default" },
};

export const Elevated: Story = {
  args: { theme: "elevated" },
};

export const Outlined: Story = {
  args: { theme: "outlined" },
};
