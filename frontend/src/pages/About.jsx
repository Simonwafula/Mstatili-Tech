import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import siteContent from "../content/siteContent";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";

export default function About() {
  const { about, company } = siteContent;

  return (
    <>
      <Seo title={about.seo.title} description={about.seo.description} />

      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-surface-light via-white to-primary-50/40"></div>
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-3xl">
              <span className="badge-primary mb-4">
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 tracking-tight">
                {about.hero?.title}
              </h1>
              <p className="mt-5 text-lg md:text-xl text-neutral-600 leading-relaxed">
                {about.hero?.subtitle}
              </p>
            </div>
            {about.hero?.media && (
              <div className="relative hidden lg:block">
                <img 
                  src={about.hero.media.src}
                  alt={about.hero.media.alt}
                  className="w-full rounded-lg"
                  loading="eager"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <SectionHeading title={about.story?.title} />
          <div className="mt-8 space-y-5">
            {about.story?.paragraphs?.map((p, idx) => (
              <p key={idx} className="text-lg text-neutral-600 leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-padding bg-surface-light">
        <div className="container-custom">
          <SectionHeading eyebrow="What guides us" title={about.principles?.title} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
            {about.principles?.items?.map((item) => (
              <div key={item.title} className="card card-hover p-6">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <CheckCircleIcon className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <SectionHeading eyebrow="Clients" title="Who we serve" />
          <ul className="mt-8 space-y-4">
            {company.whoWeServe?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-neutral-700">
                <CheckCircleIcon className="w-5 h-5 text-primary-500 flex-none mt-0.5" />
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-surface-light">
        <div className="container-custom">
          <CTASection
            title="Ready to discuss your project?"
            subtitle="Share your context and we'll propose a practical approach."
            primary={{ label: "Book a consultation", to: "/contact" }}
            secondary={{ label: "View services", to: "/services" }}
          />
        </div>
      </section>
    </>
  );
}
