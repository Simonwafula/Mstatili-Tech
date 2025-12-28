import React from "react";

export default function SectionHeading({ title, subtitle, align = "left" }) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  return (
    <div className={`${alignClass} mb-8`}>
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-3xl text-lg text-gray-700">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
