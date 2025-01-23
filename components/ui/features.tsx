import { cn } from "@/lib/utils";
import React from "react";
import { LucideIcon } from "lucide-react";

interface FeaturesGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface FeatureProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function FeaturesGrid({ className, children, ...props }: FeaturesGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 py-12",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Feature({
  title,
  description,
  icon: Icon,
  className,
  ...props
}: FeatureProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center p-6 bg-background rounded-lg border",
        className
      )}
      {...props}
    >
      <div className="p-3 rounded-full bg-primary/10 mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
