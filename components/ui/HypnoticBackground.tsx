
import React from 'react';
import { ASSETS } from '../../constants';

export const HypnoticBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-[#050505]">
      {/* 
        MOBILE OPTIMIZATION: 
        - Removed mix-blend-mode on mobile (very expensive GPU operation)
        - Removed animate-blob on mobile
        - Blobs are hidden on mobile, replaced with static gradient
      */}

      {/* MOBILE: Static Simple Gradient (No Animation, No Blend) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#001419] via-[#050505] to-[#020617] md:hidden"></div>

      {/* DESKTOP ONLY: Liquid Aurora Blobs */}
      {/* Blob 1: Deep Cyan - Top Left/Center */}
      <div className="hidden md:block absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-[#004d52] rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-blob" />

      {/* Blob 2: Midnight Blue - Center/Right */}
      <div className="hidden md:block absolute top-[20%] right-[-20%] w-[60vw] h-[60vw] bg-[#020617] rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-blob animation-delay-2000" />

      {/* Blob 3: Deep Cyan Accent - Bottom Left */}
      <div className="hidden md:block absolute bottom-[-20%] left-[10%] w-[50vw] h-[50vw] bg-[#004d52] rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob animation-delay-4000" />

      {/* 
        NOISE OVERLAY 
        Desktop only - expensive mix-blend-overlay removed on mobile
      */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 hidden md:block md:mix-blend-overlay"
        style={{ backgroundImage: `url(${ASSETS.NOISE_TEXTURE})` }}
      />

      {/* Vignette to focus center content */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)] z-1 pointer-events-none" />
    </div>
  );
};
