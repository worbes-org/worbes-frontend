import Button from "@/components/Button";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  component: Button,
  args: { size: "md", children: "Button" },
} satisfies Meta<typeof Button>;

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

export const Quaternary: Story = {
  args: { theme: "quaternary" },
};

export default meta;
