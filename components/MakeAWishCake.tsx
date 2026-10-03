'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Send, Check, RotateCcw, MessageCircle, Lock, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MakeAWishCake() {
  const [wish, setWish] = useState('');
  const [isBlown, setIsBlown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [secretWishModal, setSecretWishModal] = useState(false);
  const [savedWish, setSavedWish] = useState<string | null>(null);
  const [wishTime, setWishTime] = useState<string | null>(null);

  // Check if a wish was already saved in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nami_birthday_wish');
      const time = localStorage.getItem('nami_wish_time');
      if (stored) {
        setSavedWish(stored);
        if (time) setWishTime(time);
      }
    } catch {
      // ignore
    }
  }, [isBlown]);

  const fireCelebration = () => {
    // Multi-stage confetti celebration
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#fbbf24', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleBlowCandle = () => {
    const finalWish = wish.trim() || 'For a year filled with endless laughter, late night talks, and boundless happiness together ❤️';
    setIsBlown(true);

    try {
      localStorage.setItem('nami_birthday_wish', finalWish);
      localStorage.setItem('nami_wish_time', new Date().toLocaleString());
      setSavedWish(finalWish);
      setWishTime(new Date().toLocaleString());
    } catch {
      // ignore
    }

    fireCelebration();
  };

  const handleReset = () => {
    setIsBlown(false);
  };

  const whatsappMessage = encodeURIComponent(
    `Hey ❤️ I just made my birthday wish on the cake:\n\n"${wish.trim() || savedWish || 'For us, always ❤️'}"\n\nNow you know what to do 😉✨`
  );

  const handleCopyWish = () => {
    const textToCopy = wish.trim() || savedWish || '';
    if (textToCopy && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="make-a-wish" className="relative my-24 z-10 max-w-4xl mx-auto w-full px-4">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10 rounded-3xl blur-3xl -z-10 pointer-events-none" />

      <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#120e14]/90 via-[#0a070c]/95 to-[#050505] p-6 sm:p-12 shadow-2xl backdrop-blur-2xl overflow-hidden text-center">
        {/* Glow halo for candle */}
        {!isBlown && (
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.35, 0.55, 0.35]
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut'
            }}
            className="absolute top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-br from-amber-400/30 to-rose-500/20 rounded-full blur-3xl pointer-events-none"
          />
        )}

        {/* Section Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span className="text-xs font-medium text-rose-200 uppercase tracking-widest">
            A Birthday Ritual
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-3">
          Make A Wish, Nami 🎂
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 max-w-lg mx-auto mb-10 font-light">
          Close your eyes, hold your heart, and ask the universe for whatever your soul desires most.
        </p>

        {/* The Illustrated Birthday Cake */}
        <div className="relative mx-auto w-64 h-56 sm:w-72 sm:h-64 flex flex-col items-center justify-end mb-10 select-none">
          {/* Flame & Candle */}
          <div className="relative flex flex-col items-center mb-1">
            {/* Candle Flame or Smoke */}
            <div className="h-14 relative flex items-center justify-center">
              <AnimatePresence mode="wait">
                {!isBlown ? (
                  <motion.div
                    key="flame"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [1, 1.12, 0.95, 1.08, 1],
                      rotate: [-2, 2, -1, 3, 0]
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.2,
                      y: -15,
                      transition: { duration: 0.4 }
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.6,
                      ease: 'easeInOut'
                    }}
                    onClick={handleBlowCandle}
                    title="Click to blow the candle!"
                    className="cursor-pointer relative flex items-center justify-center"
                  >
                    {/* Flame Outer Halo */}
                    <div className="absolute w-8 h-12 bg-amber-400/40 rounded-full blur-md" />
                    {/* Flame Body */}
                    <div className="w-5 h-9 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-full rounded-t-full shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
                    {/* Flame Inner Core */}
                    <div className="absolute bottom-1 w-2 h-4 bg-white/90 rounded-full" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="smoke"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                      opacity: [0, 0.7, 0],
                      y: [-5, -30],
                      x: [-2, 4, -4, 2],
                      scale: [0.8, 1.8]
                    }}
                    transition={{ duration: 2.2, ease: 'easeOut' }}
                    className="w-3 h-8 bg-neutral-400/40 rounded-full blur-sm"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Candle Wick */}
            <div className="w-1 h-3 bg-neutral-700 rounded-t-sm" />

            {/* Candle Stick */}
            <div className="w-4 h-12 rounded-t-sm bg-gradient-to-b from-rose-200 via-rose-300 to-rose-400 relative overflow-hidden shadow-md border-x border-white/20">
              {/* Spiral Stripe on candle */}
              <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,#fb7185,#fb7185_4px,transparent_4px,transparent_8px)]" />
            </div>
          </div>

          {/* Tier 1 (Top Tier) */}
          <div className="w-36 h-14 bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600 rounded-2xl relative shadow-lg border border-white/20 overflow-hidden flex items-start justify-center">
            {/* Frosting drips */}
            <div className="w-full flex justify-between px-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-5 bg-white/95 rounded-b-full shadow-sm -mt-0.5"
                  style={{ height: `${14 + (i % 3) * 4}px` }}
                />
              ))}
            </div>
            {/* Sprinkles */}
            <div className="absolute inset-0 pointer-events-none">
              <span className="absolute top-6 left-4 w-1.5 h-1.5 rounded-full bg-amber-300 shadow-sm" />
              <span className="absolute top-8 left-12 w-2 h-1 rounded-sm bg-white rotate-45" />
              <span className="absolute top-6 right-8 w-1.5 h-1.5 rounded-full bg-rose-200" />
              <span className="absolute top-9 right-4 w-2 h-1 rounded-sm bg-amber-200 -rotate-12" />
            </div>
          </div>

          {/* Tier 2 (Bottom Tier) */}
          <div className="w-56 h-18 bg-gradient-to-b from-neutral-800 via-rose-950 to-neutral-900 rounded-2xl relative shadow-2xl border border-rose-500/30 overflow-hidden -mt-2 z-10 flex items-start justify-center">
            {/* Cream frosting layer */}
            <div className="w-full h-3 bg-gradient-to-r from-rose-300 via-white to-rose-300 shadow-inner" />
            {/* Sprinkles & pearls */}
            <div className="absolute inset-0 top-3 pointer-events-none flex items-center justify-around px-4">
              <span className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
              <span className="w-2.5 h-1.5 rounded-sm bg-amber-300 rotate-12" />
              <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
              <span className="w-2.5 h-1.5 rounded-sm bg-rose-300 -rotate-45" />
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
            </div>
          </div>

          {/* Cake Stand / Plate */}
          <div className="w-64 sm:w-72 h-4 bg-gradient-to-r from-neutral-700 via-neutral-300 to-neutral-700 rounded-full shadow-2xl -mt-1.5 z-20 border-b border-white/20" />
        </div>

        {/* State 1: Before blowing the candle */}
        <AnimatePresence mode="wait">
          {!isBlown ? (
            <motion.div
              key="wish-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-md mx-auto"
            >
              <div className="relative mb-4">
                <input
                  type="text"
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  placeholder="Type your secret birthday wish here... ✨"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-rose-400/60 focus:ring-2 focus:ring-rose-500/20 text-sm sm:text-base transition-all"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleBlowCandle();
                  }}
                />
              </div>

              {/* Cute quick tags */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                {[
                  'Late night talks ⏳',
                  'Infinite hugs 🤗',
                  'Long drives & songs 🚗',
                  'Forever like this ❤️'
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setWish(tag)}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 hover:bg-rose-500/20 border border-white/5 hover:border-rose-500/30 text-neutral-400 hover:text-rose-200 transition-all cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleBlowCandle}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 text-white font-medium text-sm sm:text-base shadow-[0_0_25px_rgba(244,63,94,0.4)] hover:shadow-[0_0_35px_rgba(244,63,94,0.6)] transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
              >
                <span>Blow The Candle</span>
                <span className="text-lg">🕯️💨</span>
              </motion.button>
              <p className="text-[11px] text-neutral-500 mt-3 font-mono">
                Tap the button (or click the flame!) to make your wish come true.
              </p>
            </motion.div>
          ) : (
            /* State 2: After candle is blown */
            <motion.div
              key="wish-result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-lg mx-auto"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-950/40 via-neutral-900/60 to-black/80 border border-rose-500/30 mb-6 text-left shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                    <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider">
                      Your Birthday Wish
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <p className="text-base sm:text-lg font-serif italic text-white/95 leading-relaxed pl-2 border-l-2 border-rose-500 my-2">
                  &ldquo;{wish.trim() || 'For a year filled with endless laughter, late night talks, and boundless happiness together ❤️'}&rdquo;
                </p>

                <p className="text-xs text-neutral-400 mt-3">
                  ✨ The candle has been blown out and your wish is recorded in the stars!
                </p>
              </div>

              {/* Action Buttons to share with HIM */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://api.whatsapp.com/send?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold text-sm shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Send Wish to Him on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyWish}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-rose-400" />
                      <span>Copy Wish</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-neutral-400 hover:text-white text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Light Again</span>
                </button>
              </div>

              <p className="text-xs text-rose-300/70 mt-4 italic">
                &ldquo;Some wishes only come true when shared with the right person 😉&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Secret Easter Egg: Click to view saved wish (for him to check anytime!) */}
        <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setSecretWishModal(true)}
            className="group inline-flex items-center gap-1.5 text-[11px] text-neutral-600 hover:text-neutral-400 transition-colors cursor-pointer"
          >
            <Lock className="w-3 h-3 group-hover:text-rose-400 transition-colors" />
            <span>Vault (View Saved Wish)</span>
          </button>
        </div>
      </div>

      {/* Secret Vault Modal */}
      <AnimatePresence>
        {secretWishModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSecretWishModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-neutral-900 border border-white/15 rounded-2xl p-6 shadow-2xl relative text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-rose-400" />
                  <h3 className="text-sm font-semibold text-white">Secret Wish Vault</h3>
                </div>
                <button
                  onClick={() => setSecretWishModal(false)}
                  className="text-neutral-400 hover:text-white text-xs px-2 py-1 rounded-md bg-white/5"
                >
                  Close
                </button>
              </div>

              {savedWish ? (
                <div className="space-y-3">
                  <p className="text-xs text-neutral-400">
                    Recorded on this browser{wishTime ? ` at ${wishTime}` : ''}:
                  </p>
                  <div className="p-4 rounded-xl bg-black/50 border border-rose-500/20">
                    <p className="text-sm font-serif italic text-rose-200">
                      &ldquo;{savedWish}&rdquo;
                    </p>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Stored safely in local storage so you never lose track of her wish!
                  </p>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-xs text-neutral-400">
                    No wish has been made yet on this device.
                  </p>
                  <p className="text-[11px] text-neutral-600 mt-1">
                    Once she types her wish and blows the candle, it will be kept here!
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
