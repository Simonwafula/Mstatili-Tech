import React from "react";
import { Link, useParams } from "react-router-dom";
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
          <h1 className="text-3xl font-bold text-gray-900">Case study not found</h1>
          <p className="mt-3 text-gray-700">The case study you're looking for does not exist.</p>
          <Link className="mt-6 inline-flex btn-primary" to="/case-studies">
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

      <section className="gradient-bg section-padding">
        <div className="container-custom">
          <p className="text-sm font-semibold text-vibrant-blue mb-3">Case study • {cs.category}</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {cs.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-700">
            {cs.context}
          </p>

          <div className="mt-8">
            <Link className="inline-flex items-center text-base font-semibold text-vibrant-blue hover:text-vibrant-cyan transition-colors" to="/case-studies">
              ← Back to case studies
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <SectionHeading title="Approach" />
          <ol className="space-y-4 mt-8">
            {cs.approach.map((a, idx) => (
              <li key={idx} className="card p-6">
                <p className="text-gray-700">{a}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="gradient-bg section-padding">
        <div className="container-custom max-w-4xl">
          <SectionHeading title="Solution delivered" />
          <ul className="space-y-3 text-gray-700 mt-6">
            {cs.deliverables.map((d, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-vibrant-cyan" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <SectionHeading title="Outcomes" subtitle="Measurable but anonymized. Exact client details removed." />
          <ul className="space-y-3 text-gray-700 mt-6">
            {cs.outcomes.map((o, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-vibrant-cyan" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gradient-bg section-padding">
        <div className="container-custom max-w-4xl">
          <SectionHeading title="Timeline and stack" />
          <div className="grid gap-6 md:grid-cols-2 mt-8">
            <div className="card p-6">
              <p className="text-sm font-semibold text-gray-900 mb-3">Timeline</p>
              <p className="text-gray-700">{cs.timeline}</p>
            </div>
            <div className="card p-6">
              <p className="text-sm font-semibold text-gray-900 mb-3">Tools / stack (secondary)</p>
              <ul className="space-y-2 text-sm text-gray-700">
                {cs.stack.map((s, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-vibrant-cyan" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
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
