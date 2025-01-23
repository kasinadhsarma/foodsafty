import { cn } from "@/lib/utils";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface TeamMemberProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  role: string;
  imageUrl?: string;
  bio?: string;
}

export function TeamSection({ className, children, ...props }: TeamSectionProps) {
  return (
    <div className={cn("py-12", className)} {...props}>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tighter">Our Team</h2>
        <p className="text-muted-foreground mt-2">
          Meet the experts behind our success
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {children}
      </div>
    </div>
  );
}

export function TeamMember({
  name,
  role,
  imageUrl,
  bio,
  className,
  ...props
}: TeamMemberProps) {
  return (
    <div
      className={cn("flex flex-col items-center text-center", className)}
      {...props}
    >
      <Avatar className="h-24 w-24 mb-4">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-muted-foreground">{role}</p>
      {bio && <p className="text-sm mt-2">{bio}</p>}
    </div>
  );
}
