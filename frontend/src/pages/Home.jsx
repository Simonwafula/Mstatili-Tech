import React from "react";
import { Link } from "react-router-dom";
import siteContent from "../content/siteContent";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import Card from "../components/Card";
import CTASection from "../components/CTASection";
import FAQAccordion from "../components/FAQAccordion";

export default function Home() {
  const { home } = siteContent;

  return (
    <>
      <Seo title={home.seo.title} description={home.seo.description} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50/80 to-purple-50/60"></div>
        
        <div className="absolute top-20 left-10 w-20 h-20 bg-vibrant-blue/20 rounded-full blur-xl animate-bounce-slow"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-vibrant-purple/20 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-vibrant-pink/20 rounded-full blur-xl animate-float"></div>
        
        <div className="container-custom section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slideRight">
              <div className="mb-8">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-vibrant-blue/20 to-vibrant-cyan/20 text-vibrant-blue font-medium text-sm border border-vibrant-blue/30 animate-glow">
                  🚀 Transforming Kenya's Digital Landscape
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-8 leading-tight">
                {home.hero.headline}
              </h1>
              
              <p className="text-xl text-gray-700 mb-10 leading-relaxed">
                {home.hero.subheadline}
              </p>
              
              <ul className="mb-8 space-y-3 text-base text-gray-700">
                {home.hero.bullets.map((b, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-vibrant-cyan" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <Link to={home.hero.primaryCta.to} className="btn-primary group">
                  <span className="flex items-center">
                    {home.hero.primaryCta.label}
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link to={home.hero.secondaryCta.to} className="btn-secondary">
                  {home.hero.secondaryCta.label}
                </Link>
              </div>
              
              <div className="grid grid-cols-3 gap-8 p-8 rounded-3xl bg-white/70 backdrop-blur-lg border border-white/30 creative-shadow">
                <div className="text-center group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-vibrant-blue to-vibrant-cyan bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">50+</div>
                  <div className="text-sm text-gray-600 font-medium">Projects Completed</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-vibrant-purple to-vibrant-pink bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">95%</div>
                  <div className="text-sm text-gray-600 font-medium">Client Satisfaction</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-vibrant-orange to-vibrant-green bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">24/7</div>
                  <div className="text-sm text-gray-600 font-medium">Support Available</div>
                </div>
              </div>
            </div>
            
            <div className="animate-slideLeft relative">
              <div className="relative floating-element">
                <img 
                  src="https://images.unsplash.com/photo-1650901161049-5a508b78388d" 
                  alt="Modern Technology" 
                  className="w-full rounded-3xl shadow-2xl creative-shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-bg section-padding">
        <div className="container-custom">
          <SectionHeading
            title="How we reduce reporting friction"
            subtitle="Simple controls that improve trust and speed."
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
            {home.credibilityStrip.items.map((it) => (
              <div key={it.title} className="card-vibrant p-6 text-center">
                <p className="text-lg font-bold text-gray-900">{it.title}</p>
                <p className="mt-3 text-sm text-gray-700">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading title={home.servicesPreview.title} subtitle={home.servicesPreview.subtitle} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {home.servicesPreview.cards.map((c) => (
              <Card
                key={c.title}
                title={c.title}
                description={c.valueLine}
                bullets={c.bullets}
                to={c.to}
                ctaLabel="View details"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-bg section-padding">
        <div className="container-custom">
          <SectionHeading title={home.howWeWork.title} subtitle={home.howWeWork.subtitle} />
          <div className="grid gap-6 md:grid-cols-2 mt-12">
            {home.howWeWork.steps.map((s, idx) => (
              <div key={s.title} className="card-vibrant p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-vibrant-blue to-vibrant-cyan flex items-center justify-center text-white font-bold text-lg">
                    {idx + 1}
                  </div>
                  <p className="text-xl font-bold text-gray-900">{s.title}</p>
                </div>
                <p className="text-gray-700">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading title={home.caseStudyPreviews.title} subtitle={home.caseStudyPreviews.subtitle} />
          <div className="grid gap-6 md:grid-cols-3 mt-12">
            {home.caseStudyPreviews.slugs.map((slug) => {
              const cs = siteContent.caseStudies.items.find((x) => x.slug === slug);
              if (!cs) return null;
              return (
                <Card
                  key={cs.slug}
                  eyebrow={cs.category}
                  title={cs.title}
                  description={cs.context}
                  bullets={cs.outcomes}
                  to={`/case-studies/${cs.slug}`}
                  ctaLabel="Read case study"
                />
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link className="inline-flex items-center text-base font-semibold text-vibrant-blue hover:text-vibrant-cyan transition-colors" to={home.caseStudyPreviews.cta.to}>
              {home.caseStudyPreviews.cta.label} →
            </Link>
          </div>
        </div>
      </section>

      <section className="gradient-bg section-padding">
        <div className="container-custom">
          <SectionHeading title={home.faqs.title} />
          <div className="max-w-3xl mx-auto mt-12">
            <FAQAccordion items={home.faqs.items} />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <CTASection
            title={home.finalCta.title}
            subtitle={home.finalCta.subtitle}
            primary={home.finalCta.primary}
            secondary={home.finalCta.secondary}
          />
        </div>
      </section>
    </>
  );
}
