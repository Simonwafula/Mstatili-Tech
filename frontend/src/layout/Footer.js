import React from "react";
import { Link } from "react-router-dom";
import { EnvelopeIcon, PhoneIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import siteContent from "../content/siteContent";

export default function Footer() {
  const { footer, company, contact } = siteContent;

  return (
    <footer className="bg-neutral-900 text-neutral-400">
      {/* Main Footer */}
      <div className="container-custom py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img 
              src="/images/brand/mstatili-logo.png" 
              alt={`${company.name} Logo`}
              className="h-8 w-auto object-contain object-left mb-4 brightness-0 invert opacity-80"
            />
            <p className="text-sm leading-relaxed max-w-xs">
              {footer.shortStatement}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-neutral-200 font-semibold mb-4 text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    className="text-sm hover:text-neutral-200 transition-colors duration-150" 
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
            <h4 className="text-neutral-200 font-semibold mb-4 text-sm">
              Services
            </h4>
            <ul className="space-y-2.5">
              {siteContent.services?.items?.slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <Link 
                    className="text-sm hover:text-neutral-200 transition-colors duration-150" 
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
            <h4 className="text-neutral-200 font-semibold mb-4 text-sm">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  className="flex items-center gap-2.5 text-sm hover:text-neutral-200 transition-colors duration-150" 
                  href={`mailto:${contact.details.emails[0]}`}
                >
                  <EnvelopeIcon className="w-4 h-4 flex-none" />
                  {contact.details.emails[0]}
                </a>
              </li>
              <li>
                <a 
                  className="flex items-center gap-2.5 text-sm hover:text-neutral-200 transition-colors duration-150" 
                  href={`tel:${contact.details.phoneWhatsApp.replace(/\s/g, '')}`}
                >
                  <PhoneIcon className="w-4 h-4 flex-none" />
                  {contact.details.phoneWhatsApp}
                </a>
              </li>
            </ul>
            <div className="mt-5">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors duration-150"
              >
                Get in touch
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <p>{footer.legal.copyright}</p>
            <p className="text-center md:text-right">{footer.legal.note}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
