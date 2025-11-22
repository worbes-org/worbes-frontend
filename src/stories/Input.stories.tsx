import Input from "@/components/Input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  component: Input,
  args: {
    size: "md",
    placeholder: "Placeholder",
  },
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Email",
    helperText: "We'll never share your email.",
    placeholder: "you@example.com",
  },
};

export const WithIcons: Story = {
  args: {
    leftIcon: <MagnifyingGlassIcon className="size-4" />,
  },
};

export const ErrorState: Story = {
  args: {
    label: "Password",
    type: "password",
    error: "Password must be at least 8 characters",
  },
};

export const Loading: Story = {
  args: {
    label: "Processing",
    isLoading: true,
  },
};

export default meta;
