
import React from 'react';

interface TechCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const TechCard: React.FC<TechCardProps> = ({
  children,
  className = "",
  hoverEffect = true
}) => {
  return (
    <div
      className={`
        group relative rounded-2xl p-[1px] 
        bg-gradient-to-b from-[#FC2C54]/30 to-transparent 
        hover:from-[#FC2C54] hover:to-[#FC2C54]/10
        transition-all duration-300 ease-out
        ${hoverEffect ? 'md:hover:-translate-y-[5px] md:hover:shadow-[0_0_30px_rgba(252,44,84,0.15)]' : ''}
        ${className}
      `}
    >
      {/* Background & Content Container */}
      {/* 
          MOBILE OPTIMIZATION:
          - Replaced 'backdrop-blur-md' with 'md:backdrop-blur-md'.
          - Added solid background on mobile (faster).
          - Changed to dark blue background (#05121d)
      */}
      <div className="relative h-full w-full rounded-[15px] bg-[#05121d] md:bg-[#05121d]/90 md:backdrop-blur-md overflow-hidden">

        {/* Subtle Top Inner Highlight - Pink tint */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FC2C54]/30 to-transparent opacity-50" />

        {/* Content */}
        <div className="relative z-10 h-full">
          {children}
        </div>

        {/* Optional: subtle noise or texture could be added here if needed in the future */}
      </div>
    </div>
  );
};
