import type { ReactNode } from "react";
import { PageBanner } from "./Breadcrumb";
import { Accordion } from "./Accordion";

export function SizeGuidePage({
  title,
  heroImage,
  intro,
  tableTitle,
  tableHead,
  tableRows,
  faqItems,
  children,
}: {
  title: string;
  heroImage: string;
  intro: string;
  tableTitle: string;
  tableHead: string[];
  tableRows: string[][];
  faqItems: { q: string; a: string }[];
  children?: ReactNode;
}) {
  return (
    <>
      <PageBanner title={title} crumbs={[{ label: title }]} />
      <div className="container-site max-w-4xl py-14">
        <img
          src={heroImage}
          alt={title}
          width={960}
          height={640}
          loading="lazy"
          className="h-64 w-full rounded-xl object-cover"
        />
        <p className="mt-8 text-base leading-relaxed text-muted-foreground">{intro}</p>
        {children}
        <h2 className="mt-12 font-display text-2xl font-semibold">{tableTitle}</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="bg-secondary text-left">
              <tr>
                {tableHead.map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tableRows.map((row, i) => (
                <tr key={i} className="odd:bg-card even:bg-secondary/40">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2.5 text-muted-foreground">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="mb-4 mt-12 font-display text-2xl font-semibold">
          Frequently Asked Questions
        </h2>
        <Accordion items={faqItems} />
      </div>
    </>
  );
}
