import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import siteContent from "../content/siteContent";

export default function NotFound() {
  return (
    <>
      <Seo title={`Page not found | ${siteContent.company.name}`} description="The requested page was not found." noIndex />

      <section className="section-padding min-h-screen flex items-center">
        <div className="container-custom text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
            Page not found
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-700">
            The page you requested does not exist. Use the links below to continue.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn-primary"
            >
              Go home
            </Link>
            <Link
              to="/services"
              className="btn-secondary"
            >
              View services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
