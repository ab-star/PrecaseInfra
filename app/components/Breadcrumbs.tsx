"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function titleize(segment: string) {
  return decodeURIComponent(segment)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

type BreadcrumbsProps = {
  variant?: "default" | "header";
};

export default function Breadcrumbs({ variant = "default" }: BreadcrumbsProps) {
  const pathname = usePathname();
  if (!pathname) return null;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const parts = pathname.split("/").filter(Boolean);
  const isHome = parts.length === 0;

  const crumbs = parts.map((part, idx) => {
    const href = "/" + parts.slice(0, idx + 1).join("/");
    return {
      name: titleize(part),
      href,
    };
  });

  // JSON-LD for BreadcrumbList
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl + "/" },
      ...crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
        item: baseUrl + c.href,
      })),
    ],
  } as const;

  const wrapperClass =
    variant === "header"
      ? ""
      : "mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-2";

  const listClass =
    variant === "header"
      ? "flex items-center gap-2 text-[10px] sm:text-[11px] text-white/80 min-w-0 truncate"
      : "flex items-center gap-2 text-[11px] sm:text-xs text-slate-500/80 pl-6 md:pl-10 lg:pl-14 xl:pl-16";

  const linkClass =
    variant === "header"
      ? "truncate hover:text-white"
      : "truncate hover:text-slate-700";

  const currentClass = variant === "header" ? "truncate text-white/90" : "truncate text-slate-600";
  const sepClass = variant === "header" ? "text-white/60" : "text-slate-400";

  return (
    <div className="w-full">
      <nav aria-label="Breadcrumb" className={wrapperClass}>
        <ol className={listClass}>
          <li className="truncate">
            {isHome ? (
              <span className={currentClass} aria-current="page">Home</span>
            ) : (
              <Link href="/" className={linkClass}>Home</Link>
            )}
          </li>
          {crumbs.map((c, i) => (
            <li key={c.href} className="flex items-center gap-2 min-w-0">
              <span className={sepClass}>›</span>
              {i < crumbs.length - 1 ? (
                <Link href={c.href} className={linkClass}>{c.name}</Link>
              ) : (
                <span className={currentClass} aria-current="page">{c.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </div>
  );
}
