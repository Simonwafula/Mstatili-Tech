import React from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircleIcon, ArrowLeftIcon, ClockIcon } from "@heroicons/react/24/outline";
import siteContent from "../content/siteContent";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const cs = siteContent.caseStudies.items.find((x) => x.slug === slug);

  if (!cs) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-neutral-900">Case study not found</h1>
          <p className="mt-3 text-neutral-600">The case study you're looking for does not exist.</p>
          <Link className="mt-6 inline-flex items-center gap-2 btn-primary" to="/case-studies">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to case studies
          </Link>
        </div>
      </div>
    );
  }

  const title = `${cs.title} | Case Studies | ${siteContent.company.name}`;
  const description = cs.context;

  return (
    <>
      <Seo title={title} description={description} />

      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-surface-light via-white to-primary-50/40"></div>
        <div className="container-custom relative">
          <span className="badge-primary mb-4">{cs.category}</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 tracking-tight">
            {cs.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg md:text-xl text-neutral-600 leading-relaxed">
            {cs.context}
          </p>

          <div className="mt-8">
            <Link className="inline-flex items-center gap-2 text-base font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200" to="/case-studies">
              <ArrowLeftIcon className="w-4 h-4" />
              Back to case studies
            </Link>
          </div>
        </div>
      </section>

      {cs.problem?.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl">
            <SectionHeading eyebrow="Background" title="The challenge" />
            <ul className="space-y-4 text-neutral-700 mt-8">
              {cs.problem.map((p, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-primary-500 flex-none mt-0.5" />
                  <span className="text-lg">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section-padding bg-surface-light">
        <div className="container-custom max-w-4xl">
          <SectionHeading eyebrow="Process" title="Approach" />
          <ol className="space-y-4 mt-8">
            {cs.approach?.map((a, idx) => (
              <li key={idx} className="card card-hover p-6">
                <p className="text-sm font-semibold text-primary-600 mb-2">Step {idx + 1}</p>
                <p className="text-neutral-700 leading-relaxed">{a}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <SectionHeading eyebrow="Outputs" title="Solution delivered" />
          <ul className="space-y-4 text-neutral-700 mt-8">
            {cs.deliverables?.map((d, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary-500 flex-none mt-0.5" />
                <span className="text-lg">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-surface-light">
        <div className="container-custom max-w-4xl">
          <SectionHeading eyebrow="Results" title="Outcomes" subtitle="Measurable but anonymized. Exact client details removed." />
          <ul className="space-y-4 text-neutral-700 mt-8">
            {cs.outcomes?.map((o, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary-500 flex-none mt-0.5" />
                <span className="text-lg">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {cs.timeline && (
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl">
            <SectionHeading eyebrow="Duration" title="Timeline" />
            <div className="card p-6 mt-8 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-none">
                <ClockIcon className="w-5 h-5 text-primary-600" />
              </div>
              <p className="text-neutral-700 text-lg">{cs.timeline}</p>
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-surface-light">
        <div className="container-custom">
          <CTASection
            title="Want a similar outcome for your team?"
            subtitle="Share the decision workflow and reporting constraints. We'll propose deliverables and a timeline."
            primary={{ label: "Book a consultation", to: "/contact" }}
            secondary={{ label: "Explore services", to: "/services" }}
          />
        </div>
      </section>
    </>
  );
}
