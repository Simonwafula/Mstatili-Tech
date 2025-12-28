import React from "react";
import { Link } from "react-router-dom";
import siteContent from "../content/siteContent";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import Card from "../components/Card";
import CTASection from "../components/CTASection";
import JsonLd from "../components/JsonLd";

export default function Services() {
  const { services } = siteContent;

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.items.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${typeof window !== "undefined" ? window.location.origin : ""}/services/${s.slug}`,
      name: s.title,
    })),
  };

  return (
    <>
      <Seo title={services.seo.title} description={services.seo.description} />
      <JsonLd data={servicesJsonLd} />

      <section className="gradient-bg section-padding">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {services.intro.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-700">
            {services.intro.subtitle}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            title="Service categories"
            subtitle="Four core areas. Each engagement includes definitions, validation, and handover."
          />

          <div className="grid gap-6 md:grid-cols-2 mt-12">
            {services.categories.map((c) => (
              <div key={c.key} className="card-vibrant p-8">
                <h2 className="text-2xl font-bold text-gray-900">{c.title}</h2>
                <p className="mt-3 text-gray-700">
                  <span className="font-semibold text-gray-900">Who it's for:</span> {c.whoItsFor}
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-3">Typical deliverables</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {c.typicalDeliverables.map((d, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-vibrant-cyan" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-3">Expected outcomes</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {c.expectedOutcomes.map((o, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-vibrant-cyan" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    className="inline-flex items-center text-sm font-semibold text-vibrant-blue hover:text-vibrant-cyan transition-colors"
                    to="/contact"
                  >
                    Discuss this category →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-bg section-padding">
        <div className="container-custom">
          <SectionHeading title="Service details" subtitle="Select a service to see deliverables, approach, and what success looks like." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {services.items.map((s) => (
              <Card
                key={s.slug}
                eyebrow={s.category}
                title={s.title}
                description={s.oneLiner}
                bullets={s.outcomes}
                to={`/services/${s.slug}`}
                ctaLabel="View details"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading title={services.engagementModels.title} />
          <div className="grid gap-6 md:grid-cols-3 mt-12">
            {services.engagementModels.items.map((m) => (
              <div key={m.title} className="card p-8">
                <p className="text-xl font-bold text-gray-900">{m.title}</p>
                <p className="mt-3 text-gray-700">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-bg section-padding">
        <div className="container-custom">
          <CTASection
            title={services.cta.title}
            subtitle={services.cta.subtitle}
            primary={services.cta.button}
          />
        </div>
      </section>
    </>
  );
}
