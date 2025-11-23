import Input from "@/components/Input";
import { cn } from "@/utils/styles";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";

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
    leftIcon: <MagnifyingGlassIcon />,
  },
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <Input
        className="w-96"
        {...args}
        value={value}
        rightIcon={
          <button
            className={cn(!value.length && "hidden")}
            onClick={() => setValue("")}
          >
            <XMarkIcon />
          </button>
        }
        onChange={(e) => setValue(e.target.value)}
      />
    );
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
