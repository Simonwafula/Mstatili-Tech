import React from "react";

export default function SectionHeading({ title, subtitle, eyebrow, align = "left" }) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  
  return (
    <div className={`${alignClass} max-w-2xl mb-8 md:mb-10`}>
      {eyebrow && (
        <p className="text-neutral-500 font-medium text-xs uppercase tracking-wider mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-semibold text-neutral-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-neutral-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
