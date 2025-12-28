import React from "react";
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
    itemListElement: services.items?.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${typeof window !== "undefined" ? window.location.origin : ""}/services/${s.slug}`,
      name: s.title,
    })) || [],
  };

  return (
    <>
      <Seo title={services.seo.title} description={services.seo.description} />
      <JsonLd data={servicesJsonLd} />

      {/* Hero Section */}
      <section className="section-padding pt-24 md:pt-28 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">
                What we do
              </p>
              <h1 className="text-3xl md:text-4xl font-display font-semibold text-neutral-900">
                {services.hero?.title}
              </h1>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                {services.hero?.subtitle}
              </p>
            </div>
            {services.hero?.media && (
              <div className="relative hidden lg:block">
                <img 
                  src={services.hero.media.src}
                  alt={services.hero.media.alt}
                  className="w-full rounded-lg"
                  loading="eager"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding-sm bg-white">
        <div className="container-custom">
          <div className="max-w-3xl space-y-4">
            {services.intro?.paragraphs?.map((p, idx) => (
              <p key={idx} className="text-neutral-600 leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Service Items */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionHeading 
            title="Our services" 
            subtitle="Select a service to see deliverables, approach, and what success looks like." 
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.items?.map((s) => (
              <Card
                key={s.slug}
                title={s.title}
                description={s.oneLiner}
                bullets={s.typicalDeliverables?.slice(0, 3)}
                image={s.media}
                to={`/services/${s.slug}`}
                ctaLabel="View details"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading title={services.engagementModels?.title} />
          <div className="grid gap-6 md:grid-cols-3">
            {services.engagementModels?.items?.map((m) => (
              <div key={m.title} className="card p-5 lg:p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{m.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <CTASection
            title="Ready to discuss your project?"
            subtitle="Tell us about your goals and we'll propose a practical approach."
            primary={{ label: "Get in touch", to: "/contact" }}
            secondary={{ label: "View case studies", to: "/case-studies" }}
          />
        </div>
      </section>
    </>
  );
}
