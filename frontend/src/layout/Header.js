import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import siteContent from "../content/siteContent";

function navLinkClass({ isActive }) {
  return [
    "nav-link py-2",
    isActive ? "nav-link-active" : "",
  ].join(" ");
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ${
      scrolled 
        ? "bg-white border-b border-neutral-200 shadow-sm" 
        : "bg-white/95"
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link to="/" className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded">
            <img 
              src="/images/brand/mstatili-logo.png" 
              alt={`${siteContent.company.name} Logo`}
              className="h-10 md:h-12 w-auto object-contain object-left"
              style={{ objectPosition: 'left center' }}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {siteContent.nav.map((item) => (
              <NavLink key={item.href} to={item.href} className={navLinkClass} end={item.href === "/"}>
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="btn-primary text-sm"
            >
              Get in touch
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors duration-150"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XMarkIcon className="h-5 w-5 text-neutral-700" /> : <Bars3Icon className="h-5 w-5 text-neutral-700" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-150 ease-out ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <nav className="py-4 border-t border-neutral-200">
            <div className="flex flex-col gap-1">
              {siteContent.nav.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className="text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 transition-colors duration-150 py-2.5 px-3 rounded-lg font-medium text-sm"
                  end={item.href === "/"}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-3 text-center text-sm"
              >
                Get in touch
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
