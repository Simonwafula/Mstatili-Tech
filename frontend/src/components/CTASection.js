import React from "react";
import { Link } from "react-router-dom";

export default function CTASection({ title, subtitle, primary, secondary }) {
  return (
    <section className="rounded-xl bg-neutral-50 border border-neutral-200 p-8 lg:p-10">
      <div className="max-w-2xl">
        <h2 className="text-xl lg:text-2xl font-display font-semibold text-neutral-900">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-neutral-600 leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {primary && (
            <Link to={primary.to} className="btn-primary">
              {primary.label}
            </Link>
          )}
          {secondary && (
            <Link to={secondary.to} className="btn-secondary">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
