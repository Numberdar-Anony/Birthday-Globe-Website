'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, MessageSquare, Star } from 'lucide-react';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

interface HeartPhoto {
  id: number;
  src: string;
  caption: string;
  sub: string;
  rotate: number;
  aspect?: string;
}

const HEART_PHOTOS: HeartPhoto[] = [
  // Row 1: Lobes
  {
    id: 1,
    src: `${BASE_PATH}/media/IMG_7387.JPG`,
    caption: 'Those Big Eyes',
    sub: 'My mrignayni 🧿❤️',
    rotate: -3
  },
  {
    id: 2,
    src: `${BASE_PATH}/media/IMG_7395.JPG`,
    caption: 'Pure Joy',
    sub: 'That effortless laugh ✨',
    rotate: 3
  },

  // Row 2: Full Heart Width
  {
    id: 3,
    src: `${BASE_PATH}/media/IMG_7411.JPG`,
    caption: 'Bhyiiii 😭',
    sub: 'Actually unfair how fine you are',
    rotate: -2
  },
  {
    id: 4,
    src: `${BASE_PATH}/media/IMG_7400.JPG`,
    caption: '5 More Minutes',
    sub: 'Never enough time with you ⏳',
    rotate: 2
  },
  {
    id: 5,
    src: `${BASE_PATH}/media/6055ffb4-7836-4caf-af10-5365af773424.JPG`,
    caption: 'You & Me',
    sub: 'How did I get this lucky? ❤️',
    rotate: -1
  },
  {
    id: 6,
    src: `${BASE_PATH}/media/IMG_7431.JPG`,
    caption: 'That Presence',
    sub: 'Pulls all my attention without trying 🔥',
    rotate: 3
  },
  {
    id: 7,
    src: `${BASE_PATH}/media/IMG_7430.JPG`,
    caption: 'Your Smile',
    sub: 'My favorite thing in the world 🛡️',
    rotate: -3
  },

  // Row 3: Tapering
  {
    id: 8,
    src: `${BASE_PATH}/media/IMG_7432.JPG`,
    caption: 'One in 8 Billion',
    sub: 'Nervous & comfortable all at once ✨',
    rotate: 2
  },
  {
    id: 9,
    src: `${BASE_PATH}/media/IMG_7412.JPG`,
    caption: 'Unfiltered You',
    sub: 'Always precious 💖',
    rotate: -1
  },
  {
    id: 10,
    src: `${BASE_PATH}/media/IMG_7429.JPG`,
    caption: 'Late Night Talks',
    sub: 'Turning minutes into hours 🌙',
    rotate: 3
  },

  // Row 4: Bottom Tip
  {
    id: 11,
    src: `${BASE_PATH}/media/cd1bf1f7-6039-45a4-b323-346ef329033b.JPG`,
    caption: 'Forever & Always',
    sub: 'Home is wherever you are 🏡❤️',
    rotate: 0
  }
];

export default function HeartCollage() {
  const [selectedPhoto, setSelectedPhoto] = useState<HeartPhoto | null>(null);

  return (
    <section id="heart-collage" className="relative my-28 z-10 max-w-6xl mx-auto w-full px-4 sm:px-6">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 backdrop-blur-md mb-4">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span className="text-xs font-medium text-rose-200 uppercase tracking-widest">
            Made of Our Moments
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-3">
          You Have My Whole Heart ❤️
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 max-w-lg mx-auto font-light">
          Every piece, every photo, every second with you builds the shape of everything I feel.
        </p>
      </div>

      {/* The Heart Shaped Photo Grid Container */}
      <div className="relative mx-auto max-w-4xl p-4 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-[#140e16]/80 via-[#0d0910]/90 to-[#050505] shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* 5-Column Heart Grid */}
        <div className="grid grid-cols-5 gap-2 sm:gap-4 md:gap-5 items-center justify-items-center relative z-10">

          {/* ================= ROW 1 ================= */}
          {/* Col 1: Decorative Star Sticker */}
          <div className="w-full flex items-center justify-center p-2">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="text-rose-300/60 select-none hidden sm:block"
            >
              <span className="text-2xl sm:text-4xl filter drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]">⭐</span>
            </motion.div>
          </div>

          {/* Col 2: Top-Left Lobe Photo (Photo 1) */}
          <div className="w-full">
            <PhotoCard photo={HEART_PHOTOS[0]} onSelect={() => setSelectedPhoto(HEART_PHOTOS[0])} />
          </div>

          {/* Col 3: Center Dip (Empty / Decorative Heart Icon) */}
          <div className="w-full flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="text-rose-500/40 select-none"
            >
              <Heart className="w-5 h-5 sm:w-8 sm:h-8 fill-rose-500/20" />
            </motion.div>
          </div>

          {/* Col 4: Top-Right Lobe Photo (Photo 2) */}
          <div className="w-full">
            <PhotoCard photo={HEART_PHOTOS[1]} onSelect={() => setSelectedPhoto(HEART_PHOTOS[1])} />
          </div>

          {/* Col 5: Decorative Pink Sparkle */}
          <div className="w-full flex items-center justify-center p-2">
            <motion.div
              animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="text-rose-300/60 select-none hidden sm:block"
            >
              <span className="text-2xl sm:text-4xl filter drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]">✨</span>
            </motion.div>
          </div>


          {/* ================= ROW 2 ================= */}
          {/* Full width of the heart: 5 photos across */}
          <div className="w-full">
            <PhotoCard photo={HEART_PHOTOS[2]} onSelect={() => setSelectedPhoto(HEART_PHOTOS[2])} />
          </div>
          <div className="w-full">
            <PhotoCard photo={HEART_PHOTOS[3]} onSelect={() => setSelectedPhoto(HEART_PHOTOS[3])} />
          </div>
          <div className="w-full relative">
            <PhotoCard photo={HEART_PHOTOS[4]} onSelect={() => setSelectedPhoto(HEART_PHOTOS[4])} isSpecial />
            {/* Cute Speech Bubble sticker attached to center photo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap bg-rose-500 text-white font-semibold text-[9px] sm:text-[11px] px-2.5 py-0.5 rounded-full shadow-lg border border-white/30 flex items-center gap-1 select-none pointer-events-none"
            >
              <span>how cute! 🧿</span>
            </motion.div>
          </div>
          <div className="w-full">
            <PhotoCard photo={HEART_PHOTOS[5]} onSelect={() => setSelectedPhoto(HEART_PHOTOS[5])} />
          </div>
          <div className="w-full">
            <PhotoCard photo={HEART_PHOTOS[6]} onSelect={() => setSelectedPhoto(HEART_PHOTOS[6])} />
          </div>


          {/* ================= ROW 3 ================= */}
          {/* Col 1: Candy Heart Sticker */}
          <div className="w-full flex items-center justify-center p-1">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600 text-white text-center shadow-lg border border-white/30 select-none hidden sm:block rotate-[-8deg]"
            >
              <p className="text-[8px] sm:text-[10px] font-bold tracking-tight uppercase leading-tight font-sans">
                HOME IS<br />WHEREVER<br />YOU ARE
              </p>
            </motion.div>
          </div>

          {/* Col 2: Photo 8 */}
          <div className="w-full">
            <PhotoCard photo={HEART_PHOTOS[7]} onSelect={() => setSelectedPhoto(HEART_PHOTOS[7])} />
          </div>

          {/* Col 3: Photo 9 (Middle center) */}
          <div className="w-full">
            <PhotoCard photo={HEART_PHOTOS[8]} onSelect={() => setSelectedPhoto(HEART_PHOTOS[8])} />
          </div>

          {/* Col 4: Photo 10 */}
          <div className="w-full">
            <PhotoCard photo={HEART_PHOTOS[9]} onSelect={() => setSelectedPhoto(HEART_PHOTOS[9])} />
          </div>

          {/* Col 5: Decorative Arrow / Cute Sticker */}
          <div className="w-full flex items-center justify-center p-1">
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="text-rose-400 select-none hidden sm:flex flex-col items-center"
            >
              <span className="text-xl sm:text-2xl">❤️</span>
              <span className="text-[9px] font-mono text-rose-300/80">forever</span>
            </motion.div>
          </div>


          {/* ================= ROW 4 ================= */}
          {/* Col 1 & 2: Empty spacer */}
          <div className="hidden sm:block" />
          <div className="hidden sm:block" />

          {/* Col 3: Bottom Tip Photo (Photo 11) */}
          <div className="col-span-5 sm:col-span-1 w-full max-w-[140px] sm:max-w-none mx-auto">
            <PhotoCard photo={HEART_PHOTOS[10]} onSelect={() => setSelectedPhoto(HEART_PHOTOS[10])} isTip />
          </div>

          {/* Col 4 & 5: Empty spacer */}
          <div className="hidden sm:block" />
          <div className="hidden sm:block" />

        </div>

        {/* Bottom cute tag */}
        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-neutral-500 text-xs">
          <span className="flex items-center gap-1.5 font-mono text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            TAP ANY PHOTO TO EXPAND
          </span>
          <span className="text-rose-300/80 font-serif italic text-xs">
            &ldquo;My heart in photos&rdquo;
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-neutral-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Photo */}
              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] bg-black relative mb-4 shadow-lg">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caption */}
              <div className="text-center px-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Heart className="w-3 h-3 fill-rose-400" />
                  {selectedPhoto.caption}
                </div>
                <p className="text-base sm:text-lg font-serif italic text-white/95">
                  &ldquo;{selectedPhoto.sub}&rdquo;
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Individual Photo Card Component with Polaroid / White-border styling matching Canva inspiration
function PhotoCard({
  photo,
  onSelect,
  isSpecial,
  isTip
}: {
  photo: HeartPhoto;
  onSelect: () => void;
  isSpecial?: boolean;
  isTip?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, zIndex: 30, rotate: 0 }}
      whileTap={{ scale: 0.95 }}
      style={{ rotate: `${photo.rotate}deg` }}
      onClick={onSelect}
      className={`group relative cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
        isSpecial
          ? 'ring-2 ring-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.4)]'
          : 'shadow-lg hover:shadow-2xl'
      } ${
        isTip
          ? 'ring-1 ring-rose-500/40'
          : ''
      } bg-white p-1 sm:p-1.5 pb-2 sm:pb-3`}
    >
      {/* Image container */}
      <div className="w-full aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden bg-neutral-900 relative">
        <img
          src={photo.src}
          alt={photo.caption}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-1.5">
          <span className="text-[9px] sm:text-[11px] text-white font-medium tracking-tight text-center line-clamp-1">
            {photo.caption}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
