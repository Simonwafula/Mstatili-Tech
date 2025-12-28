import React from "react";
import { Link, useParams } from "react-router-dom";
import siteContent from "../content/siteContent";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import FAQAccordion from "../components/FAQAccordion";
import JsonLd from "../components/JsonLd";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = siteContent.services.items.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-gray-900">Service not found</h1>
          <p className="mt-3 text-gray-700">
            The service you're looking for does not exist.
          </p>
          <Link className="mt-6 inline-flex btn-primary" to="/services">
            Back to services
          </Link>
        </div>
      </div>
    );
  }

  const title = `${service.title} | Services | ${siteContent.company.name}`;
  const description = service.oneLiner;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.oneLiner,
    provider: {
      "@type": "Organization",
      name: siteContent.company.name,
    },
    areaServed: "KE",
    serviceType: "Consulting",
    url: `${typeof window !== "undefined" ? window.location.origin : ""}/services/${service.slug}`,
  };

  const contactLink = `/contact?service=${encodeURIComponent(service.slug)}`;

  return (
    <>
      <Seo title={title} description={description} ogType="website" />
      <JsonLd data={serviceJsonLd} />

      <section className="gradient-bg section-padding">
        <div className="container-custom">
          <p className="text-sm font-semibold text-vibrant-blue mb-3">Service</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {service.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-700">
            {service.oneLiner}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link to={contactLink} className="btn-primary">
              Discuss this service
            </Link>
            <Link to="/services" className="btn-secondary">
              Back to services
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <SectionHeading title="Who it's for" />
          <ul className="space-y-3 text-gray-700 mt-6">
            {service.whoItsFor.map((x, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-vibrant-cyan" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gradient-bg section-padding">
        <div className="container-custom max-w-4xl">
          <SectionHeading title="Problems we solve" />
          <ul className="space-y-3 text-gray-700 mt-6">
            {service.problemsSolved.map((x, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-vibrant-cyan" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <SectionHeading title="Typical deliverables" />
          <ul className="space-y-3 text-gray-700 mt-6">
            {service.deliverables.map((x, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-vibrant-cyan" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gradient-bg section-padding">
        <div className="container-custom max-w-4xl">
          <SectionHeading title="How we work" subtitle="Clear steps with validation and handover." />
          <ol className="space-y-4 mt-8">
            {service.approach.map((step, idx) => (
              <li key={idx} className="card p-6">
                <p className="text-base font-bold text-gray-900 mb-2">
                  Step {idx + 1}
                </p>
                <p className="text-gray-700">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <SectionHeading title="What success looks like" />
          <ul className="space-y-3 text-gray-700 mt-6">
            {service.outcomes.map((x, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-vibrant-cyan" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gradient-bg section-padding">
        <div className="container-custom max-w-4xl">
          <SectionHeading title="FAQs" />
          <div className="mt-8">
            <FAQAccordion items={service.faqs} />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <CTASection
            title="Want a scoped plan and first deliverables?"
            subtitle="Send your current workflow and the decisions you need to support. We'll propose the first practical step."
            primary={{ label: "Contact us", to: contactLink }}
            secondary={{ label: "View case studies", to: "/case-studies" }}
          />
        </div>
      </section>
    </>
  );
}
