import Card from "@/components/Card";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  component: Card,
  args: {
    padding: "md",
    children: "Card content",
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { theme: "primary" },
};

export const Secondary: Story = {
  args: { theme: "secondary" },
};

export const Tertiary: Story = {
  args: { theme: "tertiary" },
};
