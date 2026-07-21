import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Fragment } from "react";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground">
      <Link href="/" className="transition-colors hover:text-primary">
        Home
      </Link>
      {items.map((item, i) => (
        <Fragment key={i}>
          <ChevronRight size={12} className="shrink-0" />
          {item.to ? (
            <Link href={item.to} className="transition-colors hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

export function PageBanner({ title, crumbs }: { title: string; crumbs: Crumb[] }) {
  return (
    <div className="border-b border-border bg-secondary/60">
      <div className="container-site flex flex-col items-center gap-3 py-12 text-center">
        <h1 className="font-display text-4xl font-semibold">{title}</h1>
        <Breadcrumb items={crumbs} />
      </div>
    </div>
  );
}
