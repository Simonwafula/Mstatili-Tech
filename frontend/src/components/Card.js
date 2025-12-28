import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Card({ title, eyebrow, description, bullets = [], to, ctaLabel = "View details", image }) {
  const Body = (
    <div className="card p-5 lg:p-6 h-full flex flex-col">
      {image && (
        <div className="mb-4 -mt-1 -mx-1">
          <img 
            src={image.src} 
            alt={image.alt || title} 
            className="w-full h-32 object-cover rounded-lg"
            loading="lazy"
          />
        </div>
      )}
      {eyebrow && (
        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">{eyebrow}</p>
      )}
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-neutral-600 mb-4 leading-relaxed">{description}</p>
      )}
      {bullets?.length > 0 && (
        <ul className="mt-auto space-y-1.5 text-sm text-neutral-600">
          {bullets.slice(0, 3).map((b, idx) => (
            <li key={idx} className="flex gap-2 items-start">
              <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-neutral-400" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {to && (
        <div className="mt-5 pt-4 border-t border-neutral-100">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 group-hover:text-teal-800 transition-colors duration-150">
            {ctaLabel}
            <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </span>
        </div>
      )}
    </div>
  );

  return to ? (
    <Link 
      to={to} 
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 rounded-xl"
    >
      {Body}
    </Link>
  ) : Body;
}
