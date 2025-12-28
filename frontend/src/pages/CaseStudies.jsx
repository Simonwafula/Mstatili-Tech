import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import siteContent from "../content/siteContent";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import Card from "../components/Card";
import JsonLd from "../components/JsonLd";

export default function CaseStudies() {
  const { caseStudies } = siteContent;
  const [active, setActive] = useState("All");

  // Derive unique categories from items (no caseStudies.categories exists)
  const categories = useMemo(() => {
    const unique = [...new Set(caseStudies.items.map((x) => x.category))];
    return ["All", ...unique];
  }, [caseStudies.items]);

  const filtered = useMemo(() => {
    if (active === "All") return caseStudies.items;
    return caseStudies.items.filter((x) => x.category === active);
  }, [active, caseStudies.items]);

  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: filtered.map((cs, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${typeof window !== "undefined" ? window.location.origin : ""}/case-studies/${cs.slug}`,
      name: cs.title,
    })),
  };

  return (
    <>
      <Seo title={caseStudies.seo.title} description={caseStudies.seo.description} />
      <JsonLd data={listJsonLd} />

      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-surface-light via-white to-primary-50/40"></div>
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-3xl">
              <span className="badge-primary mb-4">
                Our Work
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 tracking-tight">
                {caseStudies.hero?.title}
              </h1>
              <p className="mt-5 text-lg md:text-xl text-neutral-600 leading-relaxed">
                {caseStudies.hero?.subtitle}
              </p>
            </div>
            {caseStudies.hero?.media && (
              <div className="relative hidden lg:block">
                <img 
                  src={caseStudies.hero.media.src}
                  alt={caseStudies.hero.media.alt}
                  className="w-full rounded-lg"
                  loading="eager"
                />
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-3" aria-label="Case study category filters">
            {categories.map((c) => {
              const selected = c === active;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200",
                    selected
                      ? "border-primary-500 bg-primary-500 text-white shadow-sm"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-primary-300 hover:text-primary-600",
                  ].join(" ")}
                  aria-pressed={selected}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading eyebrow="Portfolio" title="Projects" subtitle="Built around definitions, validation, and handover." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {filtered.map((cs) => (
              <Card
                key={cs.slug}
                eyebrow={cs.category}
                title={cs.title}
                description={cs.context}
                bullets={cs.outcomes}
                image={cs.cover}
                to={`/case-studies/${cs.slug}`}
                ctaLabel="Read case study"
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              <CalendarDaysIcon className="w-5 h-5" />
              Book a consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
