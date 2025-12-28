import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import siteContent from "../content/siteContent";
import Seo from "../components/Seo";
import { api } from "../lib/api";

export default function Contact() {
  const navigate = useNavigate();
  const { contact } = siteContent;
  const formConfig = contact.form;

  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    organizationType: formConfig.fields?.organizationType?.options?.[0] || "",
    interest: "",
    timeline: formConfig.fields?.timeline?.options?.[3] || "Flexible",
    message: "",
    website: "", // honeypot
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
        company: form.organization || null,
        service: form.interest || null,
        message: form.message,
        website: form.website,
      });

      navigate("/thank-you");
    } catch (err) {
      setStatus({
        state: "error",
        message: "Failed to send. Please try again, or email us directly.",
      });
    }
  };

  return (
    <>
      <Seo title={contact.seo.title} description={contact.seo.description} />

      {/* Hero */}
      <section className="section-padding pt-24 md:pt-28 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">
                Get in touch
              </p>
              <h1 className="text-3xl md:text-4xl font-display font-semibold text-neutral-900">
                {contact.hero?.title}
              </h1>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                {contact.hero?.subtitle}
              </p>
            </div>
            {contact.hero?.media && (
              <div className="relative hidden lg:block">
                <img 
                  src={contact.hero.media.src}
                  alt={contact.hero.media.alt}
                  className="w-full rounded-lg"
                  loading="eager"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Contact Cards */}
              {contact.details?.contactCards?.map((card, idx) => {
                const icons = [EnvelopeIcon, PhoneIcon, MapPinIcon];
                const Icon = icons[idx % icons.length];
                return (
                  <a
                    key={card.title}
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="card p-4 flex items-start gap-3 hover:border-neutral-300 transition-colors duration-150"
                  >
                    <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center flex-none">
                      <Icon className="w-4 h-4 text-neutral-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-900 text-sm">{card.title}</h3>
                      <p className="mt-0.5 text-sm text-neutral-600">{card.description}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card p-6 lg:p-8">
                <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                  {formConfig.title}
                </h2>
                <p className="text-neutral-600 mb-8">{formConfig.description}</p>

                <form onSubmit={onSubmit} aria-label="Contact form">
                  {/* Honeypot */}
                  <div className="hidden">
                    <label htmlFor="website">Website</label>
                    <input id="website" value={form.website} onChange={onChange("website")} type="text" />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Field label={formConfig.fields?.fullName?.label || "Name"} htmlFor="name" required>
                      <input
                        id="name"
                        required
                        value={form.name}
                        onChange={onChange("name")}
                        placeholder={formConfig.fields?.fullName?.placeholder}
                        className="input"
                        type="text"
                        autoComplete="name"
                      />
                    </Field>

                    <Field label={formConfig.fields?.email?.label || "Email"} htmlFor="email" required>
                      <input
                        id="email"
                        required
                        value={form.email}
                        onChange={onChange("email")}
                        placeholder={formConfig.fields?.email?.placeholder}
                        className="input"
                        type="email"
                        autoComplete="email"
                      />
                    </Field>

                    <Field label={formConfig.fields?.organization?.label || "Organization"} htmlFor="organization">
                      <input
                        id="organization"
                        value={form.organization}
                        onChange={onChange("organization")}
                        placeholder={formConfig.fields?.organization?.placeholder}
                        className="input"
                        type="text"
                        autoComplete="organization"
                      />
                    </Field>

                    <Field label={formConfig.fields?.organizationType?.label || "Organization type"} htmlFor="organizationType">
                      <select
                        id="organizationType"
                        value={form.organizationType}
                        onChange={onChange("organizationType")}
                        className="input"
                      >
                        {formConfig.fields?.organizationType?.options?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </Field>

                    <Field label={formConfig.fields?.interest?.label || "What do you need help with?"} htmlFor="interest">
                      <select
                        id="interest"
                        value={form.interest}
                        onChange={onChange("interest")}
                        className="input"
                      >
                        <option value="">Select...</option>
                        {formConfig.fields?.interest?.options?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </Field>

                    <Field label={formConfig.fields?.timeline?.label || "Timeline"} htmlFor="timeline">
                      <select
                        id="timeline"
                        value={form.timeline}
                        onChange={onChange("timeline")}
                        className="input"
                      >
                        {formConfig.fields?.timeline?.options?.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div className="mt-6">
                    <Field label={formConfig.fields?.message?.label || "Message"} htmlFor="message" required>
                      <textarea
                        id="message"
                        required
                        value={form.message}
                        onChange={onChange("message")}
                        placeholder={formConfig.fields?.message?.placeholder}
                        rows={5}
                        className="input"
                      />
                    </Field>
                  </div>

                  <p className="mt-4 text-xs text-neutral-500">{formConfig.consentNote}</p>

                  {status.state === "error" && (
                    <p className="mt-4 text-sm text-red-600 font-medium">{status.message}</p>
                  )}

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={status.state === "loading"}
                      className="btn-primary disabled:opacity-60"
                    >
                      {status.state === "loading" ? "Sending…" : formConfig.submit || "Send message"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, htmlFor, children, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-800 mb-1.5" htmlFor={htmlFor}>
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
