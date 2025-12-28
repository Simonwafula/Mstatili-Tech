import React from "react";
import { Link } from "react-router-dom";
import { CheckCircleIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
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

      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-surface-light via-white to-primary-50/40"></div>
        <div className="container-custom max-w-3xl relative">
          <span className="badge-primary mb-4">Message received</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 tracking-tight">
            Thank you
          </h1>
          <p className="mt-5 text-lg md:text-xl text-neutral-600 leading-relaxed">
            We received your message. Next, we'll confirm your goals, your current workflow, and the first deliverables.
          </p>

          <div className="mt-10 card p-6 lg:p-8">
            <p className="text-lg font-semibold text-neutral-900 mb-5">What happens next</p>
            <ul className="space-y-4 text-neutral-700">
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary-500 flex-none mt-0.5" />
                <span className="text-lg">We respond with clarifying questions and a recommended first step.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary-500 flex-none mt-0.5" />
                <span className="text-lg">We propose scope, timeline, and the initial deliverables.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary-500 flex-none mt-0.5" />
                <span className="text-lg">If needed, we schedule a short discovery call.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <Link className="inline-flex items-center gap-2 text-base font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200" to="/services">
              Explore services
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
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
