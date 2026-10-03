'use client';

import React, { useState } from 'react';
import { ALL_MEDIA, MediaItem } from '@/lib/constants';
import { Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Gallery() {
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const filteredMedia = ALL_MEDIA.filter(item =>
    filter === 'all' ? true : item.type === filter
  );

  const photoCount = ALL_MEDIA.filter(m => m.type === 'photo').length;
  const videoCount = ALL_MEDIA.filter(m => m.type === 'video').length;

  return (
    <section id="gallery" className="mt-20 sm:mt-32 relative z-10">
      {/* Filter Tabs Header */}
      <div className="sticky top-20 z-30 py-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#050505]/80 backdrop-blur-xl border border-white/5 rounded-2xl px-6">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-white tracking-tight">Our Memories</h3>
          <span className="text-xs text-rose-400/80 font-mono">({filteredMedia.length})</span>
        </div>

        <div className="flex gap-1.5 p-1 bg-neutral-900/60 rounded-full border border-white/10 backdrop-blur-md">
          {[
            { key: 'all', label: `All (${ALL_MEDIA.length})` },
            { key: 'photo', label: `Photos (${photoCount})` },
            { key: 'video', label: `Videos (${videoCount})` }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={cn(
                'px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200',
                filter === tab.key
                  ? 'text-rose-100 bg-rose-500/20 ring-1 ring-rose-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredMedia.map(item => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <div
                onClick={() => setSelectedMedia(item)}
                className="relative cursor-pointer overflow-hidden rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-rose-500/40 transition-all duration-300 aspect-[4/5] group shadow-lg"
              >
                {item.type === 'photo' ? (
                  <img
                    src={item.src}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <video
                      src={item.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={e => e.currentTarget.play()}
                      onMouseLeave={e => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                      <Play className="w-3 h-3 fill-rose-400 text-rose-400" />
                      <span className="text-[10px] font-medium text-white tracking-wide">Video</span>
                    </div>
                  </>
                )}
                {/* Subtle Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition z-10"
              onClick={() => setSelectedMedia(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <div
              className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              {selectedMedia.type === 'photo' ? (
                <img
                  src={selectedMedia.src}
                  alt=""
                  className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl border border-white/10"
                />
              ) : (
                <video
                  src={selectedMedia.src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl border border-white/10"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

