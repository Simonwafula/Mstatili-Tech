import React from "react";
import { Helmet } from "react-helmet-async";
import siteContent from "../content/siteContent";

export default function Seo({
  title,
  description,
  path,
  ogType = "website",
  noIndex = false,
}) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const pathname = typeof window !== "undefined" ? window.location.pathname : path || "/";
  const canonical = `${origin}${pathname}`;

  const siteName = siteContent.company.name;

  return (
    <Helmet>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}

      <link rel="canonical" href={canonical} />

      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : null}

      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      {title ? <meta property="og:title" content={title} /> : null}
      {description ? <meta property="og:description" content={description} /> : null}

      <meta name="twitter:card" content="summary" />
      {title ? <meta name="twitter:title" content={title} /> : null}
      {description ? <meta name="twitter:description" content={description} /> : null}
    </Helmet>
  );
}
