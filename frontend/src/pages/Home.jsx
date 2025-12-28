import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import siteContent from "../content/siteContent";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import Card from "../components/Card";
import CTASection from "../components/CTASection";

export default function Home() {
  const { home } = siteContent;

  return (
    <>
      <Seo title={home.seo.title} description={home.seo.description} />

      {/* Hero Section - Clean, professional */}
      <section className="min-h-[85vh] flex items-center pt-16 md:pt-20 bg-white">
        <div className="container-custom py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-xl">
              {/* Understated eyebrow */}
              <p className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-4">
                Tech & Data Consultancy
              </p>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-neutral-900 mb-5 leading-tight">
                {home.hero.headline}
              </h1>
              
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed max-w-lg">
                {home.hero.subheadline}
              </p>
              
              {/* Supporting Points */}
              <ul className="mb-8 space-y-2.5">
                {home.hero.supportingPoints?.map((point, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <CheckCircleIcon className="w-5 h-5 text-teal-600 flex-none mt-0.5" />
                    <span className="text-neutral-700 text-sm">{point.text}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link to={home.hero.ctas?.primary?.href || "/contact"} className="btn-primary">
                  {home.hero.ctas?.primary?.label || "Get in touch"}
                </Link>
                <Link to={home.hero.ctas?.secondary?.href || "/services"} className="btn-secondary">
                  {home.hero.ctas?.secondary?.label || "Explore services"}
                </Link>
              </div>
              
              {/* Trust Line */}
              {home.hero.trustLine && (
                <p className="text-sm text-neutral-500 border-l-2 border-neutral-300 pl-3">
                  {home.hero.trustLine}
                </p>
              )}
            </div>
            
            {/* Hero Visual - Single image, subtle treatment */}
            <div className="relative hidden lg:block">
              <img 
                src={home.hero.media?.src || "/images/hero/hybrid-hero-01.webp"}
                alt={home.hero.media?.alt || "Modern technology solutions"}
                className="w-full rounded-lg"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-neutral-900 mb-5">
              {home.intro?.title}
            </h2>
            <div className="space-y-4">
              {home.intro?.paragraphs?.map((p, idx) => (
                <p key={idx} className="text-neutral-600 leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading 
            title={home.servicesPreview?.title} 
            subtitle={home.servicesPreview?.description} 
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {home.servicesPreview?.items?.slice(0, 6).map((service) => (
              <Card
                key={service.title}
                title={service.title}
                description={service.desc}
                bullets={service.bullets}
                image={service.media}
                to={service.href}
                ctaLabel="Learn more"
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/services" className="btn-secondary">
              View all services
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process / How We Work */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionHeading 
            title={home.process?.title} 
            subtitle={home.process?.description} 
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
            {home.process?.steps?.map((step, idx) => (
              <div key={step.title} className="card p-6 text-center">
                <div className="w-10 h-10 mx-auto mb-4 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 font-semibold">
                  {idx + 1}
                </div>
                <h3 className="text-base font-semibold text-neutral-900 mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <CTASection
            title={home.finalCTA?.title}
            subtitle={home.finalCTA?.description}
            primary={{ 
              label: home.finalCTA?.cta?.label || "Get in touch", 
              to: home.finalCTA?.cta?.href || "/contact" 
            }}
            secondary={{ label: "Explore services", to: "/services" }}
          />
        </div>
      </section>
    </>
  );
}
