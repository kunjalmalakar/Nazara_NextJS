export function SectionHeading({
  title,
  subtitle,
  className = "mb-5 text-center",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="font-display text-3xl font-semibold tracking-wide sm:text-4xl uppercase">
        {title}
      </h2>
      <div className="divider-fancy mt-2.5">
        <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
      </div>
      {subtitle && (
        <p className="mx-auto mt-2.5 max-w-xl text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
