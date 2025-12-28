import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeftIcon, ClockIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import siteContent from "../content/siteContent";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import JsonLd from "../components/JsonLd";

export default function PostDetail() {
  const { slug } = useParams();
  const post = siteContent.insights.posts.find((p) => p.slug === slug);

  const related = useMemo(() => {
    if (!post) return [];
    return siteContent.insights.posts
      .filter((p) => p.slug !== post.slug)
      .sort((a, b) => {
        const aSame = a.category === post.category ? 1 : 0;
        const bSame = b.category === post.category ? 1 : 0;
        return bSame - aSame;
      })
      .slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-neutral-900">Post not found</h1>
          <p className="mt-3 text-neutral-600">The post you're looking for does not exist.</p>
          <Link className="mt-6 inline-flex items-center gap-2 btn-primary" to="/insights">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to insights
          </Link>
        </div>
      </div>
    );
  }

  const title = `${post.title} | Insights | ${siteContent.company.name}`;
  const description = post.excerpt;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: siteContent.company.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteContent.company.name,
    },
    mainEntityOfPage: `${typeof window !== "undefined" ? window.location.href : ""}`,
  };

  return (
    <>
      <Seo title={title} description={description} ogType="article" />
      <JsonLd data={articleJsonLd} />

      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-surface-light via-white to-primary-50/40"></div>
        <div className="container-custom max-w-4xl relative">
          <Link className="inline-flex items-center gap-2 text-base font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200 mb-6" to="/insights">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to insights
          </Link>

          <div className="flex items-center justify-between gap-3 text-sm text-neutral-500 mb-4">
            <span>{post.date}</span>
            <span className="inline-flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {post.readingTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 tracking-tight">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg md:text-xl text-neutral-600 leading-relaxed">{post.excerpt}</p>
          <span className="inline-block mt-5 text-xs font-semibold text-primary-600 uppercase tracking-wide">{post.category}</span>
        </div>
      </section>

      <article className="section-padding bg-white">
        <div className="container-custom max-w-4xl prose prose-lg max-w-none prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-li:text-neutral-700 prose-strong:text-neutral-900 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline">
          <ReactMarkdown>{post.markdownBody}</ReactMarkdown>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-padding bg-surface-light">
          <div className="container-custom">
            <SectionHeading eyebrow="Continue reading" title="Related posts" />
            <div className="grid gap-6 md:grid-cols-3 mt-12">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/insights/${p.slug}`}
                  className="card card-hover group p-6 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <p className="text-sm text-neutral-500">{p.date} • {p.readingTime}</p>
                  <p className="mt-3 text-base font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-200">{p.title}</p>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{p.excerpt}</p>
                  <ArrowRightIcon className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200 mt-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
