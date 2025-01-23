import { cn } from "@/lib/utils"
import type React from "react"

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  containerClassName?: string
}

export function Hero({ className, children, containerClassName, ...props }: HeroProps) {
  return (
    <div className={cn("py-12 md:py-24", className)} {...props}>
      <div className={cn("container mx-auto px-4", containerClassName)}>{children}</div>
    </div>
  )
}

export function HeroTitle({ className, children, ...props }: HeroProps) {
  return (
    <h1 className={cn("text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl", className)} {...props}>
      {children}
    </h1>
  )
}

export function HeroSubtitle({ className, children, ...props }: HeroProps) {
  return (
    <p className={cn("mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl", className)} {...props}>
      {children}
    </p>
  )
}

export function HeroActions({ className, children, ...props }: HeroProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row justify-center items-center gap-4", className)} {...props}>
      {children}
    </div>
  )
}

