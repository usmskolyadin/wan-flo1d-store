"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  index: string;
  label: string;
  lines: string[];
  description?: string;
  className?: string;
}

const SectionHeading = ({
  index,
  label,
  lines,
  description,
  className = "",
}: SectionHeadingProps) => {
  return (
    <div className={`relative mb-10 max-w-3xl ${className}`}>
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -top-6 -left-1 select-none whitespace-nowrap text-[4.5rem] font-extrabold tracking-tight leading-none text-black/[0.05] sm:-top-8 sm:text-[6.5rem]"
      >
        {index}
      </span>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        <p className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-black/50">
          <span className="font-display text-accent">{index}</span>
          {label}
        </p>

        <h2 className="font-display text-4xl font-extrabold uppercase leading-[1] tracking-tight lg:text-5xl">
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>

        {description && (
          <p className="mt-4 text-base leading-7 text-black/65 sm:text-lg sm:leading-8">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default SectionHeading;
