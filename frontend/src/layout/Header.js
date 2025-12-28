import React, { useState } from "react";
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/60 shadow-soft">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg">
            <img 
              src="/images/brand/mstatili-logo.png" 
              alt={`${siteContent.company.name} Logo`}
              className="h-14 w-auto object-contain hover:opacity-90 transition-opacity duration-200"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8" aria-label="Primary">
            {siteContent.nav.map((item) => (
              <NavLink key={item.href} to={item.href} className={navLinkClass} end={item.href === "/"}>
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="btn-primary text-sm"
            >
              Book a consultation
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden p-2.5 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XMarkIcon className="h-6 w-6 text-primary-600" /> : <Bars3Icon className="h-6 w-6 text-primary-600" />}
          </button>
        </div>

        {open ? (
          <div className="md:hidden py-4 border-t border-neutral-200/60 bg-white">
            <nav className="flex flex-col space-y-1">
              {siteContent.nav.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className="text-left text-neutral-600 hover:text-primary-600 transition-colors py-3 px-4 rounded-lg hover:bg-primary-50 font-medium"
                  end={item.href === "/"}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-4 text-center mx-4"
              >
                Book a consultation
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
