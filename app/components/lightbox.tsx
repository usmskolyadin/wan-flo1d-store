"use client";

import { type TouchEvent, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

// Компонент для полноэкранного просмотра
const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) => {
  // Обработка свайпов на мобильных
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      onNext();
    }
    if (touchStart - touchEnd < -50) {
      onPrev();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Обработка клавиш
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-lg"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 hover:scale-110"
        >
          <X size={24} />
        </button>

        <div className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 hover:scale-110 md:left-8"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 hover:scale-110 md:right-8"
        >
          <ChevronRight size={32} />
        </button>

        <div
          className="relative h-full w-full cursor-pointer"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative flex h-full w-full items-center justify-center p-4 md:p-8">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative h-full w-full"
            >
              <Image
                src={images[currentIndex]}
                alt={`Fullscreen ${currentIndex + 1}`}
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </motion.div>
          </div>

          <div className="absolute bottom-4 left-0 right-0 hidden justify-center gap-2 overflow-x-auto px-4 md:flex">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const diff = idx - currentIndex;
                  if (diff > 0) for (let i = 0; i < diff; i++) onNext();
                  else if (diff < 0) for (let i = 0; i < -diff; i++) onPrev();
                }}
                className={`relative h-16 w-24 overflow-hidden rounded-lg transition-all ${
                  idx === currentIndex
                    ? "ring-2 ring-white ring-offset-2"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;