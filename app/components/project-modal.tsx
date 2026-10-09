"use client";

import { type TouchEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  ExternalLink,
} from "lucide-react";

interface Work {
  title: string;
  description: string;
  stack: string[];
  price: string;
  hero: string;
  gallery: string[];
  previewType: "desktop" | "mobile";
  type: string;
  role: string;
  outcome: string;
}

interface ProjectModalLabels {
  premiumProject: string;
  customDevelopment: string;
  stack: string;
  startingPrice: string;
  orderSimilar: string;
  typeLabel: string;
  roleLabel: string;
  outcomeLabel: string;
}

interface ProjectModalProps {
  work: Work;
  workNumber: number;
  totalWorks: number;
  imageIndex: number;
  labels: ProjectModalLabels;
  onClose: () => void;
  onSelectImage: (index: number) => void;
  onPrevProject: () => void;
  onNextProject: () => void;
  onOpenLightbox: (index: number) => void;
}

const ProjectModal = ({
  work,
  workNumber,
  totalWorks,
  imageIndex,
  labels,
  onClose,
  onSelectImage,
  onPrevProject,
  onNextProject,
  onOpenLightbox,
}: ProjectModalProps) => {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const prevImage = () =>
    onSelectImage((imageIndex - 1 + work.gallery.length) % work.gallery.length);

  const nextImage = () =>
    onSelectImage((imageIndex + 1) % work.gallery.length);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) nextImage();
    if (touchStart - touchEnd < -50) prevImage();
    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [imageIndex, work]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-xl sm:px-6 lg:items-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl overflow-hidden rounded-[32px] bg-[#f7f7f5] shadow-[0_40px_140px_rgba(0,0,0,0.5)] sm:rounded-[40px]"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/80 text-white backdrop-blur-xl transition-all hover:scale-110 hover:bg-black sm:right-6 sm:top-6"
          >
            <X size={20} />
          </button>

          <button
            onClick={onPrevProject}
            className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/60 p-3 text-white backdrop-blur-xl transition-all hover:scale-110 hover:bg-black lg:flex"
            aria-label="Previous project"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={onNextProject}
            className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/60 p-3 text-white backdrop-blur-xl transition-all hover:scale-110 hover:bg-black lg:flex"
            aria-label="Next project"
          >
            <ChevronRight size={22} />
          </button>

          <div
            className={`grid grid-cols-1 ${
              work.previewType === "mobile"
                ? "lg:grid-cols-[320px_1fr]"
                : "lg:grid-cols-[1.3fr_1fr]"
            }`}
          >
            <div className="relative">
              <div
                role="button"
                onClick={() => onOpenLightbox(imageIndex)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`group relative cursor-zoom-in overflow-hidden bg-black ${
                  work.previewType === "mobile"
                    ? "mx-auto aspect-[9/19] w-full max-w-[320px] lg:mx-0"
                    : "aspect-[16/10] w-full"
                }`}
              >
                <motion.div
                  key={imageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={work.gallery[imageIndex]}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </motion.div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
                  <Maximize2 size={14} />
                  <span className="text-xs uppercase tracking-[0.2em]">Zoom</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2.5 text-white backdrop-blur-md transition-all hover:bg-white/25 sm:left-4 sm:p-3"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2.5 text-white backdrop-blur-md transition-all hover:bg-white/25 sm:right-4 sm:p-3"
                >
                  <ChevronRight size={18} />
                </button>

                <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                  {imageIndex + 1} / {work.gallery.length}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 p-4 sm:p-6">
                {work.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectImage(idx)}
                    className={`relative shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      work.previewType === "mobile" ? "h-20 w-12" : "h-16 w-24"
                    } ${
                      idx === imageIndex
                        ? "border-black opacity-100"
                        : "border-transparent opacity-50 hover:opacity-90"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 p-6 sm:p-8 lg:overflow-y-auto lg:p-10">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-black/40">
                  {String(workNumber).padStart(2, "0")} /{" "}
                  {String(totalWorks).padStart(2, "0")}
                </p>

                <h3 className="font-display text-2xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-3xl">
                  {work.title}
                </h3>
              </div>

              <div className="inline-flex w-fit border border-black/10 px-4 py-2 text-xs">
                {labels.customDevelopment}
              </div>

              <dl className="grid grid-cols-3 gap-4 border-y border-black/10 py-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.15em] text-black/40">
                    {labels.typeLabel}
                  </dt>
                  <dd className="mt-1 font-medium text-black/80">{work.type}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.15em] text-black/40">
                    {labels.roleLabel}
                  </dt>
                  <dd className="mt-1 font-medium text-black/80">{work.role}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.15em] text-black/40">
                    {labels.outcomeLabel}
                  </dt>
                  <dd className="mt-1 font-medium text-black/80">{work.outcome}</dd>
                </div>
              </dl>

              <p className="text-base leading-8 text-black/65">
                {work.description}
              </p>

              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.3em] text-black/40">
                  {labels.stack}
                </p>

                <div className="flex flex-wrap gap-2">
                  {work.stack.map((tech) => (
                    <div
                      key={tech}
                      className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-4">
                <div className="border border-black/10 bg-black p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    {labels.startingPrice}
                  </p>

                  <h4 className="font-display mt-2 text-2xl font-extrabold text-accent">
                    {work.price}
                  </h4>
                </div>

                <a
                  href="https://t.me/wanflo1dceo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 rounded-full bg-black px-6 py-4 text-sm font-medium text-white transition-all hover:scale-[1.02]"
                >
                  {labels.orderSimilar}
                  <ExternalLink
                    size={16}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
