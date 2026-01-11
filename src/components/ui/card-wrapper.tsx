import type React from "react";

interface CardWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function CardWrapper({ children, className = "" }: CardWrapperProps) {
  return <div className={`p-6  rounded ${className}`}>{children}</div>;
}
