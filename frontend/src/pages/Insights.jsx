import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon, ArrowRightIcon, ClockIcon } from "@heroicons/react/24/outline";
import siteContent from "../content/siteContent";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";

export default function Insights() {
  const { insights } = siteContent;
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return insights.posts;
    return insights.posts.filter((p) => {
      return (
        p.title.toLowerCase().includes(needle) ||
        p.excerpt.toLowerCase().includes(needle) ||
        (p.category || "").toLowerCase().includes(needle)
      );
    });
  }, [q, insights.posts]);

  return (
    <>
      <Seo title={insights.seo.title} description={insights.seo.description} />

      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-surface-light via-white to-primary-50/40"></div>
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-3xl">
              <span className="badge-primary mb-4">
                Knowledge Hub
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 tracking-tight">
                {insights.hero?.title || "Insights"}
              </h1>
              <p className="mt-5 text-lg md:text-xl text-neutral-600 leading-relaxed">
                {insights.hero?.subtitle || "Practical notes on indicator definitions, data quality, dashboards for decisions, and repeatable reporting."}
              </p>
            </div>
            {insights.hero?.media && (
              <div className="relative hidden lg:block">
                <img 
                  src={insights.hero.media.src}
                  alt={insights.hero.media.alt}
                  className="w-full rounded-lg"
                  loading="eager"
                />
              </div>
            )}
          </div>

          <div className="mt-10 max-w-xl">
            <label className="block text-sm font-medium text-neutral-700 mb-1.5" htmlFor="search">
              Search articles
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
              <input
                id="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search posts by title or topic…"
                className="input pl-11"
                type="text"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading title="Posts" subtitle={`${filtered.length} result(s)`} />
          <div className="grid gap-6 md:grid-cols-2 mt-12">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                to={`/insights/${p.slug}`}
                className="card card-hover group p-6 lg:p-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <div className="flex items-center justify-between gap-3 text-sm text-neutral-500 mb-4">
                  <span>{p.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {p.readingTime}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-200">{p.title}</h2>
                <p className="mt-3 text-neutral-600 leading-relaxed">{p.excerpt}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">{p.category}</span>
                  <ArrowRightIcon className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
