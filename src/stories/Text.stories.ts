import Text from "@/components/Text";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  component: Text,
  args: { theme: "primary", size: "md", children: "Sample copy" },
} satisfies Meta<typeof Text>;

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

export const Quaternary: Story = {
  args: { theme: "quaternary" },
};
