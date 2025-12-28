import React from "react";
import { Link } from "react-router-dom";

export default function CTASection({ title, subtitle, primary, secondary }) {
  return (
    <section className="card p-8 lg:p-10 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-2xl text-lg text-gray-700">{subtitle}</p> : null}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        {primary ? (
          <Link
            to={primary.to}
            className="btn-primary"
          >
            {primary.label}
          </Link>
        ) : null}
        {secondary ? (
          <Link
            to={secondary.to}
            className="btn-secondary"
          >
            {secondary.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
