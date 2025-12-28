import React from "react";
import { Link } from "react-router-dom";

export default function Card({ title, eyebrow, description, bullets = [], to, ctaLabel = "View details" }) {
  const Body = (
    <div className="card p-8 h-full">
      {eyebrow ? <p className="text-sm font-semibold text-vibrant-blue mb-2">{eyebrow}</p> : null}
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      {description ? <p className="mt-3 text-gray-700">{description}</p> : null}
      {bullets?.length ? (
        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          {bullets.slice(0, 3).map((b, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-vibrant-cyan" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {to ? (
        <div className="mt-6">
          <span className="inline-flex items-center text-sm font-semibold text-vibrant-blue">
            {ctaLabel} <span className="ml-2">→</span>
          </span>
        </div>
      ) : null}
    </div>
  );

  return to ? <Link to={to} className="block focus:outline-none focus:ring-2 focus:ring-vibrant-blue rounded-3xl">{Body}</Link> : Body;
}
