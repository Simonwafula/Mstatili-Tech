import React from "react";
import { Link } from "react-router-dom";
import siteContent from "../content/siteContent";

export default function Footer() {
  const { footer, company, contact } = siteContent;

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container-custom py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img 
              src="/images/brand/mstatili-logo.png" 
              alt={`${company.name} Logo`}
              className="h-12 w-auto object-contain mb-4 brightness-0 invert opacity-90"
            />
            <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
              {footer.shortStatement}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    className="text-neutral-400 hover:text-primary-400 transition-colors duration-200" 
                    to={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Preview */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3 text-sm">
              {siteContent.services?.items?.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link 
                    className="text-neutral-400 hover:text-primary-400 transition-colors duration-200" 
                    to={`/services/${s.slug}`}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <a 
                  className="hover:text-primary-400 transition-colors duration-200" 
                  href={`mailto:${contact.details.emails[0]}`}
                >
                  {contact.details.emails[0]}
                </a>
              </li>
              <li>
                <a 
                  className="hover:text-primary-400 transition-colors duration-200" 
                  href={`tel:${contact.details.phoneWhatsApp.replace(/\s/g, '')}`}
                >
                  {contact.details.phoneWhatsApp}
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
              >
                Get in touch
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <p>{footer.legal.copyright}</p>
            <p className="text-center md:text-right">{footer.legal.note}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
