import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SkipToContent from "../components/SkipToContent";
import JsonLd from "../components/JsonLd";
import siteContent from "../content/siteContent";

export default function SiteLayout() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteContent.company.name,
    description: siteContent.company.shortIntro,
    email: siteContent.contact?.details?.emails?.[0],
    telephone: siteContent.contact?.details?.phoneWhatsApp,
    address: {
      "@type": "PostalAddress",
      addressCountry: "KE",
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <SkipToContent />
      <JsonLd data={orgJsonLd} />
      <Header />
      <main id="main" className="pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
