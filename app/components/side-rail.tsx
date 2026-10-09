"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaTelegram, FaInstagram } from "react-icons/fa";

interface RailItem {
  id: string;
  number: string;
  label: string;
}

interface SideRailProps {
  items: RailItem[];
  activeId: string;
  lang: "en" | "ru";
  onLangChange: (lang: "en" | "ru") => void;
  contactLabel: string;
}

const socials = [
  { icon: FaGithub, href: "https://github.com/usmskolyadin" },
  { icon: FaTelegram, href: "https://t.me/wanflo1dceo" },
  { icon: FaInstagram, href: "https://instagram.com/wanflo1d" },
];

const SideRail = ({ items, activeId, lang, onLangChange, contactLabel }: SideRailProps) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed left-0 top-0 z-50 hidden h-screen w-20 flex-col items-center justify-between overflow-y-auto border-r border-black/10 bg-white/70 py-6 backdrop-blur-2xl lg:flex"
    >
      <a href="#hero" className="group flex flex-col items-center gap-3">
        <Image
          src="/1f.png"
          alt="wan flo1d"
          width={36}
          height={36}
          unoptimized
          className="h-9 w-9 transition-transform duration-300 group-hover:scale-110"
        />
      </a>

      <nav className="flex flex-col items-center gap-5">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group relative flex flex-col items-center"
            >
              <span
                className={`font-display text-sm font-extrabold tabular-nums transition-colors duration-300 ${
                  active ? "text-accent" : "text-black/25 group-hover:text-black/60"
                }`}
              >
                {item.number}
              </span>

              <span
                className={`mt-2 rounded-full transition-all duration-300 ${
                  active ? "h-[3px] w-5 bg-accent" : "h-1 w-1 bg-black/20 group-hover:w-2.5 group-hover:bg-black/40"
                }`}
              />

              <span className="pointer-events-none absolute left-full ml-4 -translate-x-1 whitespace-nowrap rounded-full bg-black px-3 py-1.5 text-xs text-white opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-5">
        <a
          href="#contact"
          className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white transition-transform duration-300 hover:scale-110 hover:bg-accent-dark"
        >
          <ArrowUpRight size={16} />
          <span className="pointer-events-none absolute left-full ml-4 -translate-x-1 whitespace-nowrap rounded-full bg-black px-3 py-1.5 text-xs text-white opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
            {contactLabel}
          </span>
        </a>

        <div className="flex flex-col items-center overflow-hidden rounded-full border border-black/10 bg-white/60">
          <button
            onClick={() => onLangChange("en")}
            className={`px-3 py-1.5 text-[11px] font-medium transition-all ${
              lang === "en" ? "bg-black text-white" : "text-black/50"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => onLangChange("ru")}
            className={`px-3 py-1.5 text-[11px] font-medium transition-all ${
              lang === "ru" ? "bg-black text-white" : "text-black/50"
            }`}
          >
            RU
          </button>
        </div>

        <div className="flex flex-col items-center gap-3">
          {socials.map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full text-black/40 transition-all hover:-translate-y-0.5 hover:text-black"
              >
                <Icon size={15} />
              </a>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
};

export default SideRail;
