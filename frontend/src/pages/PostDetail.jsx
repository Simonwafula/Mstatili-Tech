import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
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
          <h1 className="text-3xl font-bold text-gray-900">Post not found</h1>
          <p className="mt-3 text-gray-700">The post you're looking for does not exist.</p>
          <Link className="mt-6 inline-flex btn-primary" to="/insights">
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

      <section className="gradient-bg section-padding">
        <div className="container-custom max-w-4xl">
          <Link className="inline-flex items-center text-base font-semibold text-vibrant-blue hover:text-vibrant-cyan transition-colors mb-6" to="/insights">
            ← Back to insights
          </Link>

          <div className="flex items-center justify-between gap-3 text-sm text-gray-600 mb-4">
            <span>{post.date}</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {post.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-700">{post.excerpt}</p>
          <p className="mt-4 text-sm font-semibold text-vibrant-blue">{post.category}</p>
        </div>
      </section>

      <article className="section-padding">
        <div className="container-custom max-w-4xl prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
          <ReactMarkdown>{post.markdownBody}</ReactMarkdown>
        </div>
      </article>

      <section className="gradient-bg section-padding">
        <div className="container-custom">
          <SectionHeading title="Related posts" />
          <div className="grid gap-6 md:grid-cols-3 mt-12">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/insights/${p.slug}`}
                className="card p-6 hover:shadow-2xl transition-shadow focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
              >
                <p className="text-sm text-gray-600">{p.date} • {p.readingTime}</p>
                <p className="mt-3 text-base font-bold text-gray-900">{p.title}</p>
                <p className="mt-2 text-sm text-gray-700">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
