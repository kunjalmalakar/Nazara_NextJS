import { products } from "@/lib/products";

const BASE_URL = "https://nazaradiamonds.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export async function GET() {
  const entries: SitemapEntry[] = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/products", changefreq: "weekly", priority: "0.9" },
    ...["rings", "necklace", "pendant", "earrings", "bracelets-bangles"].map(
      (s) => ({ path: `/category/${s}`, changefreq: "weekly" as const, priority: "0.8" }),
    ),
    ...products.map((p) => ({
      path: `/product/${p.slug}`,
      changefreq: "monthly" as const,
      priority: "0.7",
    })),
    { path: "/customize", changefreq: "monthly", priority: "0.6" },
    { path: "/about-us", changefreq: "yearly", priority: "0.5" },
    { path: "/contact-us", changefreq: "yearly", priority: "0.5" },
    { path: "/faqs", changefreq: "monthly", priority: "0.5" },
    { path: "/privacy-policy", changefreq: "yearly" },
    { path: "/exchange-policy", changefreq: "yearly" },
    { path: "/return-refund-policy", changefreq: "yearly" },
    { path: "/terms-and-conditions", changefreq: "yearly" },
    { path: "/shipping-policy", changefreq: "yearly" },
    { path: "/ring-size-guide", changefreq: "yearly" },
    { path: "/bangle-size-guide", changefreq: "yearly" },
  ];

  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
