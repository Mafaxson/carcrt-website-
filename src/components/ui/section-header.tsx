import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  variant?: "default" | "light";
}

export function SectionHeader({ title, subtitle, centered = true, className, variant = "default" }: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", "mb-12", className)}>
      <h2 className={cn(
        "font-heading text-3xl md:text-4xl font-bold mb-4",
        variant === "light" ? "text-background" : "text-foreground"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-lg max-w-2xl",
          centered && "mx-auto",
          variant === "light" ? "text-background/80" : "text-muted-foreground"
        )}>
          {subtitle}
        </p>
      )}
      <div className={cn(
        "mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary via-accent to-secondary",
        centered && "mx-auto"
      )} />
    </div>
  );
}
