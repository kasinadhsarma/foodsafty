import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";

interface PricingCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tier: string;
  price: number | string;
  frequency?: string;
  features: string[];
}

export function PricingCards({ className, children, ...props }: PricingCardsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 py-12",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function PricingCard({
  tier,
  price,
  frequency,
  features,
  className,
  ...props
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col p-6 bg-background rounded-lg border",
        className
      )}
      {...props}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{tier}</h3>
        <div className="mt-2">
          <span className="text-3xl font-bold">
            {typeof price === "number" ? `$${price}` : price}
          </span>
          {frequency && <span className="text-muted-foreground">/{frequency}</span>}
        </div>
      </div>
      <ul className="space-y-2 flex-grow mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center text-sm text-muted-foreground">
            <svg
              className="mr-2 h-4 w-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Button className="w-full">Get Started</Button>
    </div>
  );
}
