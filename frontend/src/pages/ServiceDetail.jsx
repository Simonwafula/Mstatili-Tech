import React from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircleIcon, ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
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
          <h1 className="text-3xl font-bold text-neutral-900">Service not found</h1>
          <p className="mt-3 text-neutral-600">
            The service you're looking for does not exist.
          </p>
          <Link className="mt-6 inline-flex items-center gap-2 btn-primary" to="/services">
            <ArrowLeftIcon className="w-4 h-4" />
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

      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-surface-light via-white to-primary-50/40"></div>
        <div className="container-custom relative">
          <span className="badge-primary mb-4">Service</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 tracking-tight">
            {service.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg md:text-xl text-neutral-600 leading-relaxed">
            {service.oneLiner}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link to={contactLink} className="btn-primary inline-flex items-center gap-2">
              Discuss this service
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link to="/services" className="btn-secondary inline-flex items-center gap-2">
              <ArrowLeftIcon className="w-4 h-4" />
              Back to services
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <SectionHeading eyebrow="Ideal clients" title="Who it's for" />
          <ul className="space-y-4 text-neutral-700 mt-8">
            {service.whoItsFor?.map((x, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary-500 flex-none mt-0.5" />
                <span className="text-lg">{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-surface-light">
        <div className="container-custom max-w-4xl">
          <SectionHeading eyebrow="Challenges" title="Problems we solve" />
          <ul className="space-y-4 text-neutral-700 mt-8">
            {service.problemsWeSolve?.map((x, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary-500 flex-none mt-0.5" />
                <span className="text-lg">{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <SectionHeading eyebrow="Outputs" title="Typical deliverables" />
          <ul className="space-y-4 text-neutral-700 mt-8">
            {service.typicalDeliverables?.map((x, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary-500 flex-none mt-0.5" />
                <span className="text-lg">{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-surface-light">
        <div className="container-custom max-w-4xl">
          <SectionHeading eyebrow="Process" title="How we work" subtitle="Clear steps with validation and handover." />
          <ol className="space-y-4 mt-8">
            {service.approach?.map((step, idx) => (
              <li key={idx} className="card card-hover p-6">
                <p className="text-sm font-semibold text-primary-600 mb-2">
                  Step {idx + 1}
                </p>
                <p className="text-neutral-700 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <SectionHeading eyebrow="Results" title="What success looks like" />
          <ul className="space-y-4 text-neutral-700 mt-8">
            {service.successLooksLike?.map((x, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary-500 flex-none mt-0.5" />
                <span className="text-lg">{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {service.faqs?.length > 0 && (
        <section className="section-padding bg-surface-light">
          <div className="container-custom max-w-4xl">
            <SectionHeading eyebrow="Questions" title="FAQs" />
            <div className="mt-8">
              <FAQAccordion items={service.faqs} />
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-white">
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
