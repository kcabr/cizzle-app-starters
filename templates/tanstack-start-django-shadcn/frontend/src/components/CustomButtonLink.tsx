import { ReactNode } from "react";
import { Link, LinkProps } from "@tanstack/react-router";

interface CustomButtonLinkProps extends Omit<LinkProps, "className"> {
  children: ReactNode;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "default";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
  sx?: Record<string, any>; // For compatibility with the Material UI version
}

export function CustomButtonLink({
  children,
  variant = "contained",
  color = "primary",
  startIcon,
  endIcon,
  size = "medium",
  className = "",
  sx,
  ...props
}: CustomButtonLinkProps) {
  // Map variant and color to Tailwind classes
  const variantClasses = {
    contained: {
      primary:
        "bg-indigo-600 hover:bg-indigo-700 text-white border-transparent",
      secondary: "bg-pink-600 hover:bg-pink-700 text-white border-transparent",
      default: "bg-gray-200 hover:bg-gray-300 text-gray-800 border-transparent",
    },
    outlined: {
      primary:
        "bg-transparent hover:bg-indigo-50 text-indigo-600 border-indigo-600",
      secondary:
        "bg-transparent hover:bg-pink-50 text-pink-600 border-pink-600",
      default: "bg-transparent hover:bg-gray-50 text-gray-800 border-gray-300",
    },
    text: {
      primary:
        "bg-transparent hover:bg-indigo-50 text-indigo-600 border-transparent",
      secondary:
        "bg-transparent hover:bg-pink-50 text-pink-600 border-transparent",
      default:
        "bg-transparent hover:bg-gray-50 text-gray-800 border-transparent",
    },
  };

  const sizeClasses = {
    small: "px-2.5 py-1.5 text-xs",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  const baseClasses =
    "inline-flex items-center justify-center border font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150";

  const focusRingColor = {
    primary: "focus:ring-indigo-500",
    secondary: "focus:ring-pink-500",
    default: "focus:ring-gray-500",
  };

  const buttonClasses = [
    baseClasses,
    variantClasses[variant][color],
    sizeClasses[size],
    focusRingColor[color],
    className,
  ].join(" ");

  return (
    <Link {...props} className={buttonClasses} style={sx}>
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </Link>
  );
}
