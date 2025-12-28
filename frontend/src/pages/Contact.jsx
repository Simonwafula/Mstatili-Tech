import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import siteContent from "../content/siteContent";
import Seo from "../components/Seo";
import { api } from "../lib/api";

function findServiceOption(slug) {
  return siteContent.contact.form.serviceInterestOptions.find((o) => o.value === slug);
}

export default function Contact() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const preselectService = params.get("service") || "";
  const initialService = useMemo(() => (findServiceOption(preselectService) ? preselectService : ""), [preselectService]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    organizationType: siteContent.contact.form.organizationTypes[0] || "Other",
    timeline: siteContent.contact.form.timelines[3] || "Not sure yet",
    budgetRange: "",
    preferredContactMethod: siteContent.contact.form.contactMethods[0] || "Email",
    serviceInterest: initialService,
    message: "",
    website: "",
  });

  const [status, setStatus] = useState({ state: "idle", message: "" });

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });

    try {
      await api.post("/api/contact", {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        company: form.organization || null,
        service: form.serviceInterest || null,
        message: form.message,
        website: form.website,
      });

      navigate("/thank-you");
    } catch (err) {
      setStatus({
        state: "error",
        message:
          "Failed to send. Please try again, or email us directly.",
      });
    }
  };

  const { contact } = siteContent;

  return (
    <>
      <Seo title={contact.seo.title} description={contact.seo.description} />

      <section className="gradient-bg section-padding">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {contact.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-700">{contact.subtitle}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="card p-8">
                <p className="text-base font-bold text-gray-900 mb-4">Contact details</p>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li>
                    <span className="font-semibold text-gray-900">Email:</span>{" "}
                    <a className="hover:text-vibrant-blue transition-colors" href={`mailto:${siteContent.company.contacts.email}`}>
                      {siteContent.company.contacts.email}
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold text-gray-900">Phone:</span>{" "}
                    <a className="hover:text-vibrant-blue transition-colors" href={`tel:${siteContent.company.contacts.phone}`}>
                      {siteContent.company.contacts.phone}
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold text-gray-900">Location:</span> {siteContent.company.contacts.location}
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2">
              <form onSubmit={onSubmit} className="card p-8" aria-label="Contact form">
                <div className="hidden">
                  <label htmlFor="website">Website</label>
                  <input id="website" value={form.website} onChange={onChange("website")} type="text" />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Field label={contact.form.labels.name} htmlFor="name">
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={onChange("name")}
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
                      type="text"
                      autoComplete="name"
                    />
                  </Field>

                  <Field label={contact.form.labels.email} htmlFor="email">
                    <input
                      id="email"
                      required
                      value={form.email}
                      onChange={onChange("email")}
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
                      type="email"
                      autoComplete="email"
                    />
                  </Field>

                  <Field label={contact.form.labels.phone} htmlFor="phone">
                    <input
                      id="phone"
                      value={form.phone}
                      onChange={onChange("phone")}
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
                      type="tel"
                      autoComplete="tel"
                    />
                  </Field>

                  <Field label={contact.form.labels.organization} htmlFor="organization">
                    <input
                      id="organization"
                      value={form.organization}
                      onChange={onChange("organization")}
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
                      type="text"
                      autoComplete="organization"
                    />
                  </Field>

                  <Field label={contact.form.labels.organizationType} htmlFor="organizationType">
                    <select
                      id="organizationType"
                      value={form.organizationType}
                      onChange={onChange("organizationType")}
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
                    >
                      {contact.form.organizationTypes.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label={contact.form.labels.timeline} htmlFor="timeline">
                    <select
                      id="timeline"
                      value={form.timeline}
                      onChange={onChange("timeline")}
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
                    >
                      {contact.form.timelines.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label={contact.form.labels.budgetRange} htmlFor="budgetRange">
                    <select
                      id="budgetRange"
                      value={form.budgetRange}
                      onChange={onChange("budgetRange")}
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
                    >
                      <option value="">—</option>
                      {contact.form.budgetRanges.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label={contact.form.labels.preferredContactMethod} htmlFor="preferredContactMethod">
                    <select
                      id="preferredContactMethod"
                      value={form.preferredContactMethod}
                      onChange={onChange("preferredContactMethod")}
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
                    >
                      {contact.form.contactMethods.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label={contact.form.labels.serviceInterest} htmlFor="serviceInterest">
                    <select
                      id="serviceInterest"
                      value={form.serviceInterest}
                      onChange={onChange("serviceInterest")}
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
                    >
                      {contact.form.serviceInterestOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="mt-6">
                  <Field label={contact.form.labels.message} htmlFor="message">
                    <textarea
                      id="message"
                      required
                      value={form.message}
                      onChange={onChange("message")}
                      rows={6}
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-vibrant-blue"
                    />
                  </Field>
                </div>

                <p className="mt-4 text-xs text-gray-600">{contact.form.privacyNote}</p>

                {status.state === "error" ? (
                  <p className="mt-4 text-sm text-red-600">{status.message}</p>
                ) : null}

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={status.state === "loading"}
                    className="btn-primary disabled:opacity-60"
                  >
                    {status.state === "loading" ? "Sending…" : contact.form.submitLabel}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}
