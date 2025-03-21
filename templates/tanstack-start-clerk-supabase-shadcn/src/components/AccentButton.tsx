import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { cn } from "../utils/cn";

export interface AccentButtonProps extends ButtonProps {
  to?: string;
  isHighlighted?: boolean;
}

/**
 * Accent button that matches the header color theme
 * Can be used as a regular button or as a link by providing the "to" prop
 */
export const AccentButton = React.forwardRef<
  HTMLButtonElement,
  AccentButtonProps
>(({ className, to, isHighlighted, children, ...props }, ref) => {
  // Define the button style based on whether it's highlighted
  const buttonStyle = cn(
    className,
    isHighlighted
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
  );

  // If "to" prop is provided, render a Link
  if (to) {
    return (
      <Link to={to} className="w-fit">
        <Button ref={ref} className={buttonStyle} {...props}>
          {children}
        </Button>
      </Link>
    );
  }

  // Otherwise, render a regular button
  return (
    <Button ref={ref} className={buttonStyle} {...props}>
      {children}
    </Button>
  );
});

AccentButton.displayName = "AccentButton";
