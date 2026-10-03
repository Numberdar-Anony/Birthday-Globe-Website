'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Eye, Clock, Flame, Smile, Star, ShieldCheck } from 'lucide-react';

interface Reason {
  id: number;
  icon: React.ReactNode;
  tag: string;
  frontTitle: string;
  frontSubtitle: string;
  backText: string;
  highlight: string;
}

const REASONS: Reason[] = [
  {
    id: 1,
    icon: <Eye className="w-5 h-5 text-rose-400" />,
    tag: 'MRIGNAYNI 🧿',
    frontTitle: 'Those Big Eyes',
    frontSubtitle: 'The ones that make me forget English mid-sentence',
    backText:
      'Those fucking big, beautiful eyes that make me forget whatever I was saying halfway through a sentence. 😭 I swear I could sit and stare into them forever and still never get tired. I’ve accepted I’m never escaping them.',
    highlight: 'My forever mrignayni 🧿❤️'
  },
  {
    id: 2,
    icon: <Clock className="w-5 h-5 text-rose-400" />,
    tag: '5 MORE MINUTES',
    frontTitle: 'Late Night Talks',
    frontSubtitle: 'How 5 minutes always magically becomes hours',
    backText:
      'The way somehow even after talking to you for hours, I still want five more minutes. And then five more after that. And somehow those five minutes always turn into another hour. 😭',
    highlight: 'Never enough time with you ❤️'
  },
  {
    id: 3,
    icon: <Flame className="w-5 h-5 text-amber-400" />,
    tag: 'BHYIIII 😭',
    frontTitle: 'That Presence',
    frontSubtitle: 'How are you this slim and still this dangerous?',
    backText:
      'The way you look, the way you carry yourself, the way your whole presence pulls my attention towards you without even trying… it’s actually unfair. You don’t even have to do anything and I’m already staring like an idiot. 😭',
    highlight: 'Actually unfair how fine you are 🔥'
  },
  {
    id: 4,
    icon: <Sparkles className="w-5 h-5 text-rose-400" />,
    tag: 'THE VIBE',
    frontTitle: 'Nervous & Comfortable',
    frontSubtitle: 'At the exact same time',
    backText:
      'You have this crazy power to make me feel nervous like I’m on a first date, but comfortable like I’ve known you for a hundred lifetimes. How did you make this idiot fall so fucking hard? 😭❤️',
    highlight: 'One in eight billion ✨'
  },
  {
    id: 5,
    icon: <Smile className="w-5 h-5 text-rose-400" />,
    tag: 'PRIORITY',
    frontTitle: 'Your Smile',
    frontSubtitle: 'The thing that genuinely matters most to me',
    backText:
      'You’re someone whose happiness genuinely matters to me. Someone I want to see smiling every single day. Someone I want to hold when things get difficult, and celebrate with when life is beautiful.',
    highlight: 'Always here to protect your smile 🛡️'
  },
  {
    id: 6,
    icon: <Star className="w-5 h-5 text-rose-400" />,
    tag: 'THE REAL REASON',
    frontTitle: 'Just Being You',
    frontSubtitle: 'Bhyiii, how the fuck did I get this lucky?',
    backText:
      'If I ever look at you a little too long, just know I’m probably thinking the exact same thing I always do: “Bhyiii, how the fuck did I get this lucky?” Right now, tomorrow, and forever, I love you, Nami. ❤️',
    highlight: 'How did I get this lucky? 🍀'
  }
];

export default function ReasonsWhyILoveYou() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (id: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="reasons" className="relative my-24 z-10 max-w-7xl mx-auto w-full px-2">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/5 backdrop-blur-md mb-4">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span className="text-xs font-medium text-rose-200/90 tracking-wide uppercase">
            A Few Reminders
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
          Reasons Why I'm Head Over Heels
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 max-w-lg mx-auto font-light">
          Tap each card to flip and discover the little things that make you so unforgettable.
        </p>
      </div>

      {/* Grid of 3D Flip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {REASONS.map(reason => {
          const isFlipped = !!flippedCards[reason.id];

          return (
            <div
              key={reason.id}
              onClick={() => toggleCard(reason.id)}
              className="h-72 cursor-pointer perspective group select-none"
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="relative w-full h-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d]"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {/* FRONT FACE */}
                <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b from-[#160c12]/90 via-[#0f070c]/90 to-[#080407]/95 border border-white/10 p-6 flex flex-col justify-between [backface-visibility:hidden] shadow-xl group-hover:border-rose-500/40 transition-colors duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                        {reason.icon}
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-rose-300/80 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                        {reason.tag}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif text-white font-medium mb-2 tracking-tight group-hover:text-rose-200 transition-colors">
                      {reason.frontTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                      {reason.frontSubtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-[11px] text-rose-400/80 font-medium">Tap to reveal</span>
                    <span className="text-xs text-neutral-500 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>

                {/* BACK FACE (REVEALED) */}
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b from-[#200e19] via-[#14080f] to-[#0a0407] border border-rose-500/40 p-6 flex flex-col justify-between [backface-visibility:hidden] shadow-2xl [transform:rotateY(180deg)]"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-rose-300">
                        {reason.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light">
                      {reason.backText}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-rose-500/20 flex items-center justify-between">
                    <span className="text-xs font-serif italic text-rose-300 font-medium">
                      {reason.highlight}
                    </span>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">
                      Tap to flip
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
