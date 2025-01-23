import { cn } from "@/lib/utils";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CaseStudiesSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CaseStudiesSection({
  className,
  children,
  ...props
}: CaseStudiesSectionProps) {
  return (
    <div className={cn("py-12", className)} {...props}>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tighter">Case Studies</h2>
        <p className="text-muted-foreground mt-2">
          See how businesses are succeeding with our platform
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
}
