import Heading from "@/components/Heading";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  component: Heading,
  args: { children: "Heading text" },
} satisfies Meta<typeof Heading>;

type Story = StoryObj<typeof meta>;

export const Level1: Story = {
  args: { level: 1 },
};

export const Level2: Story = {
  args: { level: 2 },
};

export const Level3: Story = {
  args: { level: 3 },
};

export const Level4: Story = {
  args: { level: 4 },
};

export const Level5: Story = {
  args: { level: 5 },
};

export const Level6: Story = {
  args: { level: 6 },
};

export default meta;
