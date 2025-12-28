import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import Seo from "../components/Seo";
import siteContent from "../content/siteContent";

export default function NotFound() {
  return (
    <>
      <Seo title={`Page not found | ${siteContent.company.name}`} description="The requested page was not found." noIndex />

      <section className="section-padding min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-surface-light via-white to-primary-50/40"></div>
        <div className="container-custom text-center relative">
          <span className="badge-primary mb-4">404</span>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 tracking-tight">
            Page not found
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-lg md:text-xl text-neutral-600 leading-relaxed">
            The page you requested does not exist. Use the links below to continue.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <HomeIcon className="w-5 h-5" />
              Go home
            </Link>
            <Link
              to="/services"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              <Squares2X2Icon className="w-5 h-5" />
              View services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
