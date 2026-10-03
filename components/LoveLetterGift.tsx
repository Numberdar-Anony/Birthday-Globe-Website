'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, X, PartyPopper } from 'lucide-react';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
const COUPLE_PHOTO = `${BASE_PATH}/media/6055ffb4-7836-4caf-af10-5365af773424.JPG`;

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
}

export default function LoveLetterGift() {
  const [isOpen, setIsOpen] = useState(false);
  const [kisses, setKisses] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; left: number }[]>([]);

  const handleOpenGift = () => {
    // Generate celebration confetti particles
    const newParticles: Particle[] = Array.from({ length: 45 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.9) * 500,
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      color: ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24', '#f472b6', '#ffffff'][i % 6]
    }));
    setParticles(newParticles);
    setIsOpen(true);

    setTimeout(() => setParticles([]), 2500);
  };

  const handleSendKiss = () => {
    setKisses(prev => prev + 1);
    const id = Date.now();
    const left = Math.random() * 80 + 10;
    setFloatingHearts(prev => [...prev.slice(-15), { id, left }]);

    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== id));
    }, 2000);
  };

  return (
    <section id="special-gift" className="relative my-24 z-20 max-w-6xl mx-auto w-full px-2">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial-gradient from-rose-500/10 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Floating Kisses Particles */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {floatingHearts.map(h => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: '90vh', scale: 0.6, x: `${h.left}vw` }}
            animate={{ opacity: 0, y: '15vh', scale: 1.6 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="absolute text-2xl"
          >
            💋
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* GIFT BOX STATE (BEFORE OPENING) */
          <motion.div
            key="gift-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center py-16 px-6 rounded-3xl bg-gradient-to-b from-[#120a0e]/80 via-[#0d070a]/90 to-[#050505]/95 border border-rose-500/20 backdrop-blur-2xl shadow-[0_0_80px_rgba(244,63,94,0.12)] relative overflow-hidden group text-center"
          >
            {/* Soft decorative background orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/15 rounded-full blur-[100px] pointer-events-none" />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 backdrop-blur-md mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-xs font-medium tracking-wide text-rose-200">A Personal Surprise Just For You</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4 leading-tight">
              A Special Birthday Gift, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-rose-400 to-rose-500">
                Only for Nami
              </span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-400 max-w-md mx-auto mb-10 font-light leading-relaxed">
              I put my entire heart into this. Tap the box below to unwrap what I've been wanting to tell you.
            </p>

            {/* Interactive 3D Glowing Gift Box Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenGift}
              className="relative cursor-pointer"
            >
              {/* Outer pulsing ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/30 to-amber-500/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-700 animate-pulse" />

              <div className="relative flex flex-col items-center justify-center p-8 sm:p-10 rounded-3xl bg-neutral-900/90 border border-rose-500/40 shadow-2xl backdrop-blur-xl group-hover:border-rose-400 transition-all duration-300">
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, -2, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  className="relative mb-5"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center shadow-[0_10px_30px_rgba(244,63,94,0.4)] border border-rose-300/30">
                    <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow" />
                  </div>
                  {/* Glowing Bow Accent */}
                  <div className="absolute -top-2 -right-2 bg-amber-400 text-neutral-950 p-1.5 rounded-full shadow-lg">
                    <Heart className="w-4 h-4 fill-neutral-950" />
                  </div>
                </motion.div>

                <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-medium text-sm sm:text-base shadow-lg shadow-rose-500/25 group-hover:shadow-rose-500/40 transition">
                  <PartyPopper className="w-4 h-4" />
                  <span>Tap to Unwrap My Gift</span>
                </div>
              </div>
            </motion.div>

            <span className="text-[11px] text-neutral-500 tracking-widest uppercase mt-8 font-mono">
              Made with pure love • 4 October
            </span>
          </motion.div>
        ) : (
          /* UNWRAPPED LETTER & POLAROID STATE */
          <motion.div
            key="unwrapped-gift"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl bg-gradient-to-b from-[#140b10]/95 via-[#0c0609]/95 to-[#050505]/98 border border-rose-500/30 p-6 sm:p-10 lg:p-12 shadow-[0_0_120px_rgba(244,63,94,0.18)] backdrop-blur-2xl"
          >
            {/* Confetti Explosion Particles */}
            {particles.map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: 0,
                  x: p.x,
                  y: p.y,
                  scale: 1,
                  rotate: p.rotation
                }}
                transition={{ duration: 1.6, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '50%',
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  borderRadius: p.size > 8 ? '50%' : '2px',
                  pointerEvents: 'none',
                  zIndex: 60
                }}
              />
            ))}

            {/* Close / Fold Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white border border-white/10 transition z-30"
              title="Close Letter"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Layout: Polaroid on Left, Heartfelt Letter on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* LEFT: THE COUPLE'S POLAROID */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <motion.div
                  initial={{ rotate: -4, y: 20 }}
                  animate={{ rotate: -2, y: 0 }}
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-sm bg-neutral-100 p-4 pb-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-neutral-300/40 relative group select-none"
                >
                  {/* Vintage Tape Accent on Polaroid top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-white/40 backdrop-blur-sm border border-white/60 rounded-sm shadow-sm rotate-1" />

                  {/* Photo Frame */}
                  <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-neutral-900 shadow-inner">
                    <img
                      src={COUPLE_PHOTO}
                      alt="Us together"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Soft Romantic Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Polaroid Handwritten Caption */}
                  <div className="mt-4 px-2 text-center">
                    <p className="font-serif italic text-neutral-800 text-lg sm:text-xl font-medium tracking-tight">
                      Us, always together. ❤️
                    </p>
                    <p className="text-[11px] text-neutral-500 font-mono tracking-widest uppercase mt-0.5">
                      My Favorite Memory • Nami
                    </p>
                  </div>
                </motion.div>

                {/* Kiss Counter & Interaction */}
                <div className="mt-8 flex flex-col items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={handleSendKiss}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 text-sm font-medium backdrop-blur-md transition shadow-lg shadow-rose-500/10 cursor-pointer"
                  >
                    <span>Send a Kiss</span>
                    <span className="text-base">💋</span>
                  </motion.button>
                  {kisses > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xs text-rose-300/80 font-mono"
                    >
                      {kisses} {kisses === 1 ? 'kiss' : 'kisses'} sent to Nami ❤️
                    </motion.span>
                  )}
                </div>
              </div>

              {/* RIGHT: THE LOVE LETTER */}
              <div className="lg:col-span-7 flex flex-col text-left">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 border-b border-rose-500/20 pb-4">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-rose-300/80">
                    A Letter from the Heart
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-serif text-white font-medium mb-6 tracking-tight">
                  Nami,
                </h3>

                {/* The Letter Paragraphs */}
                <div className="space-y-6 text-neutral-200/90 leading-relaxed font-light text-base sm:text-lg">
                  <p>
                    Sometimes I look at you and genuinely wonder how one person can have this much effect on me.
                    Like, how the fuck did you manage to become such a huge part of my life without me even realizing it? 😭
                  </p>

                  <div className="relative pl-5 border-l-2 border-rose-500/40 py-1 my-4 bg-rose-500/[0.04] rounded-r-xl pr-4">
                    <p>
                      There’s something about you that I can’t properly explain. Maybe it’s your eyes. Those fucking big, beautiful eyes that make me forget whatever I was saying halfway through a sentence. 😭
                    </p>
                    <p className="mt-2 text-rose-200 font-normal">
                      I swear, every time I look at them, I feel like I could just sit there forever and still not get tired of them. You really are my{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-rose-400 to-rose-200 font-medium">
                        mrignayni 🧿❤️
                      </span>
                      , and at this point I’ve accepted that I’m never getting out of those eyes.
                    </p>
                  </div>

                  <p>
                    And then there’s your waist… <span className="text-rose-300 italic font-medium">bhyiiii</span>. 😭 How are you this slim and still somehow this dangerous? The way you look, the way you carry yourself, the way your whole presence just pulls my attention towards you without even trying… it’s actually unfair. You don’t even have to do anything and somehow I’m already staring at you like an idiot. 😭
                  </p>

                  <p className="text-white font-medium text-lg sm:text-xl">
                    But honestly, as much as I love looking at you, it’s not just your eyes or your body that has me this fucked up over you.
                  </p>

                  <p className="text-2xl sm:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-rose-500 font-medium my-2">
                    It’s you.
                  </p>

                  <p>
                    The way you talk. The little things you do without realizing them. The way you make ordinary moments feel special. The way somehow even after talking to you for hours, I still want five more minutes. And then five more after that. And somehow those five minutes always turn into another hour. 😭
                  </p>

                  <p>
                    I think what scares me a little is how naturally you became someone I care about this deeply. You’re not just someone I love anymore. You’re someone whose happiness genuinely matters to me. Someone I want to see smiling. Someone I want to hold when things get difficult. Someone I want beside me when life is beautiful too.
                  </p>

                  <p>
                    And if I’m being completely honest, I don’t know what the future is going to look like. I don’t know what life is going to throw at us or how many things will change along the way.
                  </p>

                  <div className="bg-gradient-to-r from-rose-500/15 via-rose-500/5 to-transparent p-5 rounded-2xl border border-rose-500/30 my-4">
                    <p className="text-sm uppercase tracking-widest text-rose-300/80 font-mono mb-1">
                      One Absolute Truth
                    </p>
                    <p className="text-xl sm:text-2xl font-serif text-white font-semibold">
                      Right now, I fucking love you.
                    </p>
                    <p className="text-sm sm:text-base text-neutral-300 mt-2">
                      I love your eyes. I love your smile. I love your tiny little habits. I love the way you make me nervous and comfortable at the same time. I love how you somehow managed to make this idiot fall so fucking hard. 😭❤️
                    </p>
                  </div>

                  <p className="pt-2">
                    And Nami… if I ever look at you a little too long, just know I’m probably thinking the same thing I always do:
                  </p>

                  <p className="text-xl sm:text-2xl font-serif text-rose-300 font-semibold italic border-l-4 border-rose-500 pl-4 py-1">
                    “Bhyiii, how the fuck did I get this lucky?” ❤️
                  </p>
                </div>

                {/* Footer Signoff */}
                <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-500 font-mono">Forever & Always</p>
                    <p className="text-lg font-serif text-white font-medium">Your Favorite Idiot ❤️</p>
                  </div>
                  <div className="flex items-center gap-2 text-rose-400/80 text-xs font-mono bg-rose-500/10 px-4 py-2 rounded-full border border-rose-500/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Happy Birthday, Nami • 4 October</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
