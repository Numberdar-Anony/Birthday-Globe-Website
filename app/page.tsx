'use client';

import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { Heart, PartyPopper, Hand } from "lucide-react";
import { motion } from "framer-motion";

// Disable SSR for all heavy components
const PhotoSphere = dynamic(() => import("@/components/PhotoSphere"), { ssr: false });
const MoonTimeline = dynamic(() => import("@/components/MoonTimeline"), { ssr: false });
const Countdown = dynamic(() => import("@/components/Countdown"), { ssr: false });
const Gallery = dynamic(() => import("@/components/Gallery"), { ssr: false });
const Background = dynamic(() => import("@/components/Background"), { ssr: false });
const LoveLetterGift = dynamic(() => import("@/components/LoveLetterGift"), { ssr: false });
const ReasonsWhyILoveYou = dynamic(() => import("@/components/ReasonsWhyILoveYou"), { ssr: false });
const HeartCollage = dynamic(() => import("@/components/HeartCollage"), { ssr: false });
const MakeAWishCake = dynamic(() => import("@/components/MakeAWishCake"), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log(`[page] useEffect setMounted. mounted: true`);
    setMounted(true);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }
  };

  // Prevent server-side rendering of the heavy UI
  if (!mounted) {
    console.log(`[page] SSR fallback rendered. mounted: ${mounted}`);
    return <div className="min-h-screen bg-[#050505]" />;
  }

  console.log(`[page] Main UI rendered. mounted: ${mounted}`);

  return (
    <div className="text-neutral-400 min-h-screen flex flex-col selection:bg-rose-500/30 selection:text-rose-200 relative">
      <Background />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="text-white font-medium tracking-tight text-sm">FOR NAMI</span>
          </div>
          <div className="hidden sm:flex items-center gap-5 text-xs font-medium text-neutral-400">
            <a href="#special-gift" className="hover:text-rose-300 transition-colors">Gift 💌</a>
            <a href="#reasons" className="hover:text-rose-300 transition-colors">Reasons ❤️</a>
            <a href="#heart-collage" className="hover:text-rose-300 transition-colors">Heart 💖</a>
            <a href="#make-a-wish" className="hover:text-rose-300 transition-colors">Make a Wish 🎂</a>
            <a href="#gallery" className="hover:text-rose-300 transition-colors">Memories 📸</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">4 October</span>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-24 pb-24 px-6 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <section className="min-h-[85vh] flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center mb-12 relative">
          <motion.div 
            className="z-20 order-2 lg:order-1 relative w-full"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              animate: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.div 
              variants={fadeIn}
              className="inline-flex items-center gap-2 mb-8 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/5 w-fit backdrop-blur-md"
            >
              <PartyPopper className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-xs font-medium text-rose-200/80">Celebrating You</span>
            </motion.div>

            <motion.h1 
              variants={fadeIn}
              className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-8 leading-[1.1] text-balance"
            >
              Happy Birthday,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-rose-500">My Favorite Person, My Nami</span>
            </motion.h1>

            <motion.p 
              variants={fadeIn}
              className="text-base sm:text-lg text-neutral-300/80 max-w-xl leading-relaxed font-light mb-12 mix-blend-plus-lighter"
            >
              Another year of beautiful memories, laughter, and love. Rotate the sphere to explore the moments that make life with you so special.
            </motion.p>

            <motion.div variants={fadeIn}>
              <Countdown />
            </motion.div>

            {/* Drag hint */}
            <motion.div 
              variants={fadeIn}
              className="mt-12 flex items-center gap-2 text-neutral-500 pointer-events-none"
            >
              <Hand className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-widest">Drag sphere to explore</span>
            </motion.div>
          </motion.div>

          <motion.div 
            className="h-[400px] sm:h-[500px] lg:h-[600px] w-full relative order-1 lg:order-2 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <PhotoSphere />
          </motion.div>
        </section>

        <LoveLetterGift />

        <ReasonsWhyILoveYou />

        <HeartCollage />

        <MakeAWishCake />

        <MoonTimeline />
        
        <Gallery />
      </main>

      <footer className="border-t border-white/5 py-12 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-rose-500/40">
            <Heart className="w-4 h-4" />
            <span className="text-xs font-medium tracking-wide text-neutral-500">MADE WITH LOVE</span>
          </div>
          <p className="text-xs text-neutral-700 font-mono">FOREVER & ALWAYS</p>
        </div>
      </footer>
    </div>
  );
}
