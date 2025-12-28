import React, { useId, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function FAQAccordion({ items = [] }) {
  return (
    <div className="space-y-3">
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
    <div className="card overflow-hidden">
      <button
        id={buttonId}
        type="button"
        className="flex w-full items-center justify-between gap-4 text-left p-5 hover:bg-neutral-50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-base font-medium text-neutral-900">{item.q}</span>
        <ChevronDownIcon 
          className={`w-5 h-5 text-neutral-500 transition-transform duration-200 flex-none ${
            open ? "rotate-180" : ""
          }`} 
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`transition-all duration-200 ease-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-5 pb-5 pt-0">
          <p className="text-neutral-600 leading-relaxed">{item.a}</p>
        </div>
      </div>
    </div>
  );
}
