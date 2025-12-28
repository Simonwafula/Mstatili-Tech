import React, { useId, useState } from "react";

export default function FAQAccordion({ items = [] }) {
  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <FAQItem key={idx} item={item} />
      ))}
    </div>
  );
}

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  const buttonId = useId();
  const panelId = useId();

  return (
    <div className="card p-6">
      <button
        id={buttonId}
        type="button"
        className="flex w-full items-start justify-between gap-4 text-left focus:outline-none focus:ring-2 focus:ring-vibrant-blue rounded-lg"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-base font-semibold text-gray-900">{item.q}</span>
        <span className="text-vibrant-blue font-bold text-xl">{open ? "−" : "+"}</span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`${open ? "block" : "hidden"} mt-4`}
      >
        <p className="text-gray-700">{item.a}</p>
      </div>
    </div>
  );
}
