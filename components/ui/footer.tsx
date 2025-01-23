import { cn } from "@/lib/utils";
import React from "react";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Footer({ className, children, ...props }: FooterProps) {
  return (
    <footer
      className={cn("border-t bg-background/95", className)}
      {...props}
    >
      <div className="container py-12">
        {children}
      </div>
    </footer>
  );
}

export function FooterContent({ className, children, ...props }: FooterProps) {
  return (
    <div
      className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function FooterCopyright({ className, children, ...props }: FooterProps) {
  return (
    <div
      className={cn("text-center text-sm text-muted-foreground mt-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function FooterSocial({ className, children, ...props }: FooterProps) {
  return (
    <div
      className={cn("flex justify-center space-x-4 mt-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
