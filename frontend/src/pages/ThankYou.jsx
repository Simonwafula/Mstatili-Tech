import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import siteContent from "../content/siteContent";
import CTASection from "../components/CTASection";

export default function ThankYou() {
  return (
    <>
      <Seo
        title={`Thank you | ${siteContent.company.name}`}
        description="Thanks for reaching out. We'll respond with practical next steps."
        noIndex
      />

      <section className="gradient-bg section-padding">
        <div className="container-custom max-w-3xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Thank you
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            We received your message. Next, we'll confirm your goals, your current workflow, and the first deliverables.
          </p>

          <div className="mt-10 card p-8">
            <p className="text-base font-bold text-gray-900 mb-4">What happens next</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-vibrant-cyan" />
                <span>We respond with clarifying questions and a recommended first step.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-vibrant-cyan" />
                <span>We propose scope, timeline, and the initial deliverables.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-vibrant-cyan" />
                <span>If needed, we schedule a short discovery call.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <Link className="inline-flex items-center text-base font-semibold text-vibrant-blue hover:text-vibrant-cyan transition-colors" to="/services">
              Explore services →
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <CTASection
            title="Want to prepare for the first call?"
            subtitle="Bring your latest report, your indicator list (if any), and your review cadence."
            primary={{ label: "View case studies", to: "/case-studies" }}
            secondary={{ label: "Read insights", to: "/insights" }}
          />
        </div>
      </section>
    </>
  );
}
