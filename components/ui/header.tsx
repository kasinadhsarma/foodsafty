import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

interface HeaderNavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function Header({ className, children, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
      {...props}
    >
      <div className="container flex h-16 items-center justify-between">
        {children}
      </div>
    </header>
  );
}

export function HeaderLogo({ className, href = "/", children, ...props }: HeaderNavItemProps) {
  return (
    <Link
      href={href}
      className={cn("flex items-center space-x-2 font-bold", className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export function HeaderNav({ className, children, ...props }: HeaderProps) {
  return (
    <nav className={cn("hidden md:flex items-center space-x-6", className)} {...props}>
      {children}
    </nav>
  );
}

export function HeaderNavItem({ className, href, children, ...props }: HeaderNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
