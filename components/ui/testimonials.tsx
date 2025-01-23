import { cn } from "@/lib/utils";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TestimonialCarousel({
  className,
  children,
  ...props
}: TestimonialCarouselProps) {
  return (
    <div className={cn("py-12", className)} {...props}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {children}
        </CarouselContent>
        <div className="flex justify-center gap-2 mt-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}
