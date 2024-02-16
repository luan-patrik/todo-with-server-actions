"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isPending?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isPending, children, ...props }, ref) => {
    const { pending } = useFormStatus();

    return (
      <button ref={ref} {...props} disabled={pending}>
        {pending ? isPending : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
