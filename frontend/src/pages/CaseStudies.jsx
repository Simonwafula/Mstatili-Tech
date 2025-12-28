import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import siteContent from "../content/siteContent";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import Card from "../components/Card";
import JsonLd from "../components/JsonLd";

export default function CaseStudies() {
  const { caseStudies } = siteContent;
  const [active, setActive] = useState("All");

  const categories = useMemo(() => ["All", ...caseStudies.categories], [caseStudies.categories]);

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

      <section className="gradient-bg section-padding">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Case studies
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-700">
            Anonymized examples. Confidential client names removed. Outcomes shown as practical ranges.
          </p>

          <div className="mt-8 flex flex-wrap gap-3" aria-label="Case study category filters">
            {categories.map((c) => {
              const selected = c === active;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-vibrant-blue transition-all",
                    selected
                      ? "border-vibrant-blue bg-vibrant-blue text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-vibrant-blue",
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

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading title="Projects" subtitle="Built around definitions, validation, and handover." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {filtered.map((cs) => (
              <Card
                key={cs.slug}
                eyebrow={cs.category}
                title={cs.title}
                description={cs.context}
                bullets={cs.outcomes}
                to={`/case-studies/${cs.slug}`}
                ctaLabel="Read case study"
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="btn-primary"
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
