'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ALL_MEDIA, MediaItem } from '@/lib/constants';
import { Play, X } from 'lucide-react';
import { motion, useMotionValue, useAnimationFrame, useTransform, AnimatePresence } from 'framer-motion';

export default function PhotoSphere() {
  const [mounted, setMounted] = useState(false);
  const [radius, setRadius] = useState(280);
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  const rotationX = useMotionValue(0);
  const rotationY = useMotionValue(0);
  const invX = useTransform(rotationX, v => -v);
  const invY = useTransform(rotationY, v => -v);

  const BASE_ROTATION_SPEED = 0.22;
  const velocityX = useRef(BASE_ROTATION_SPEED);
  const isDragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const dragDistance = useRef(0);

  const sphereItems = ALL_MEDIA.slice(0, 24);
  const phi = Math.PI * (3 - Math.sqrt(5));

  useEffect(() => {
    setMounted(true);
    const resize = () =>
      setRadius(window.innerWidth < 640 ? 160 : window.innerWidth < 1024 ? 220 : 280);
    resize();
    window.addEventListener('resize', resize);

    const handleGlobalUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('pointerup', handleGlobalUp);
    window.addEventListener('touchend', handleGlobalUp);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerup', handleGlobalUp);
      window.removeEventListener('touchend', handleGlobalUp);
    };
  }, []);

  useAnimationFrame(() => {
    if (!mounted || activeMedia) return;

    if (isDragging.current) {
      return;
    }

    // Gimbal self-leveling: smoothly return vertical tilt (rotationX) back to 0 (level upright)
    const currentX = rotationX.get();
    if (Math.abs(currentX) > 0.01) {
      rotationX.set(currentX * 0.93);
    } else if (currentX !== 0) {
      rotationX.set(0);
    }

    // Smoothly blend any throw momentum back into the baseline continuous rotation
    velocityX.current = velocityX.current * 0.95 + BASE_ROTATION_SPEED * 0.05;

    // Perpetually rotate like a self-leveling gimbal ball
    rotationY.set(rotationY.get() + velocityX.current);
  });

  const handlePointerDown = (clientX: number, clientY: number) => {
    isDragging.current = true;
    last.current = { x: clientX, y: clientY };
    dragDistance.current = 0;
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;
    const dx = clientX - last.current.x;
    const dy = clientY - last.current.y;
    dragDistance.current += Math.hypot(dx, dy);

    rotationY.set(rotationY.get() + dx * 0.35);

    // Limit vertical pitch tilt so it stays stabilized like a gimbal ball
    const currentX = rotationX.get();
    const nextX = Math.max(-30, Math.min(30, currentX - dy * 0.25));
    rotationX.set(nextX);

    // Track horizontal fling velocity
    velocityX.current = dx * 0.08;

    last.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleItemClick = (item: MediaItem) => {
    // Only open lightbox if it was a genuine click, not a drag
    if (dragDistance.current < 8) {
      setActiveMedia(item);
    }
  };

  if (!mounted) return <div className="h-[500px]" />;

  return (
    <>
      <div
        className="scene select-none cursor-grab active:cursor-grabbing"
        onMouseDown={e => handlePointerDown(e.clientX, e.clientY)}
        onMouseMove={e => handlePointerMove(e.clientX, e.clientY)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={e => {
          if (e.touches[0]) handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchMove={e => {
          if (e.touches[0]) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={handlePointerUp}
      >
        <motion.div className="sphere" style={{ rotateX: rotationX, rotateY: rotationY }}>
          {sphereItems.map((item, i) => {
            const y = 1 - (i / (sphereItems.length - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const theta = phi * i;

            return (
              <div
                key={item.src}
                className="sphere-item"
                style={{
                  transform: `translate3d(${Math.cos(theta) * r * radius}px, ${
                    y * radius
                  }px, ${Math.sin(theta) * r * radius}px)`
                }}
              >
                <motion.div
                  className="sphere-card group relative"
                  style={{ rotateX: invX, rotateY: invY }}
                  onClick={() => handleItemClick(item)}
                >
                  {item.type === 'photo' ? (
                    <img
                      src={item.src}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition">
                        <Play className="text-white w-5 h-5 drop-shadow" />
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Sphere Item Lightbox */}
      <AnimatePresence>
        {activeMedia && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMedia(null)}
          >
            <button
              className="absolute top-6 right-6 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              onClick={() => setActiveMedia(null)}
            >
              <X className="w-6 h-6" />
            </button>

            {activeMedia.type === 'photo' ? (
              <img
                src={activeMedia.src}
                alt=""
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
              />
            ) : (
              <video
                src={activeMedia.src}
                controls
                autoPlay
                playsInline
                className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

