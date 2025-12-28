import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
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

      <section className="gradient-bg section-padding">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Insights
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-700">
            Practical notes on indicator definitions, data quality, dashboards for decisions, and repeatable reporting.
          </p>

          <div className="mt-8 max-w-xl">
            <label className="block text-sm font-semibold text-gray-900 mb-2" htmlFor="search">
              Search
            </label>
            <input
              id="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search posts by title or topic…"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
              type="text"
            />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading title="Posts" subtitle={`${filtered.length} result(s)`} />
          <div className="grid gap-6 md:grid-cols-2 mt-12">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                to={`/insights/${p.slug}`}
                className="card p-8 hover:shadow-2xl transition-shadow focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
              >
                <div className="flex items-center justify-between gap-3 text-sm text-gray-600 mb-3">
                  <span>{p.date}</span>
                  <span>{p.readingTime}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{p.title}</h2>
                <p className="mt-3 text-gray-700">{p.excerpt}</p>
                <p className="mt-4 text-sm font-semibold text-vibrant-blue">{p.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
