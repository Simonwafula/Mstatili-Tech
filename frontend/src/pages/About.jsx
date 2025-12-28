import React from "react";
import siteContent from "../content/siteContent";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";

export default function About() {
  const { about } = siteContent;

  return (
    <>
      <Seo title={about.seo.title} description={about.seo.description} />

      <section className="gradient-bg section-padding">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {about.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-700">
            {siteContent.company.intro}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <SectionHeading title="How we operate" subtitle="Short, practical principles." />
          <ul className="space-y-3 text-gray-700 mt-8">
            {about.bullets.map((b, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-vibrant-cyan" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gradient-bg section-padding">
        <div className="container-custom">
          <SectionHeading title={about.whatToExpect.title} />
          <div className="grid gap-6 md:grid-cols-3 mt-12">
            {about.whatToExpect.items.map((it) => (
              <div key={it.title} className="card p-8">
                <p className="text-xl font-bold text-gray-900">{it.title}</p>
                <p className="mt-3 text-gray-700">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
