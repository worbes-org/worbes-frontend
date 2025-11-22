import Badge from "@/components/Badge";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  component: Badge,
  args: { size: "md", theme: "default", children: "Badge" },
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { theme: "default" },
};

export const Accent: Story = {
  args: { theme: "accent" },
};

export const Success: Story = {
  args: { theme: "success" },
};

export const Warning: Story = {
  args: { theme: "warning" },
};

export const Error: Story = {
  args: { theme: "error" },
};

export const Info: Story = {
  args: { theme: "info" },
};

export default meta;
