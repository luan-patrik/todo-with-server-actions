import { ComponentProps } from "react";

interface CheckCheckProps extends ComponentProps<"svg"> {}

export const CheckCheck = ({ ...props }: CheckCheckProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6L7 17l-5-5M22 10l-7.5 7.5L13 16" />
    </svg>
  );
};
