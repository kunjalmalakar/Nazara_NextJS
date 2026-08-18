import type { PolicySection } from "@/lib/content";
import { PageBanner } from "./Breadcrumb";

export function PolicyPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: PolicySection[];
}) {
  return (
    <>
      <PageBanner title={title} crumbs={[{ label: title }]} />
      <div className="container-site grid gap-12 py-14 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-lg border border-border bg-card p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              On this page
            </p>
            <ul className="space-y-2 text-sm">
              {sections.map((s, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i}`}
                    className="text-muted-foreground transition-colors hover:text-gold"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <article className="max-w-3xl">
          <p className="text-base leading-relaxed text-muted-foreground">{intro}</p>
          {sections.map((s, i) => (
            <section key={i} id={`section-${i}`} className="mt-10">
              <h2 className="font-display text-2xl font-semibold">{s.heading}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{s.body}</p>
            </section>
          ))}
          <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
            Last updated: July 2026 · Questions? Write to care@nazaradiamonds.com
          </p>
        </article>
      </div>
    </>
  );
}
