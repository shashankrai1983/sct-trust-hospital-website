'use client';

// SVG Sparkle Components for Celebration Effects
// Professional medical animations with forest green color scheme

import React, { useEffect, useRef } from 'react';
import { calculatorTheme } from '../utils/calculatorTheme';
import { presets } from './animations/ForestAnimations';

interface SparkleProps {
  size?: number;
  color?: string;
  className?: string;
  animated?: boolean;
  delay?: number;
}

export const SVGSparkle: React.FC<SparkleProps> = ({
  size = 12,
  color = calculatorTheme.animation.particleColor,
  className = '',
  animated = true,
  delay = 0
}) => {
  const sparkleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animated && sparkleRef.current) {
      setTimeout(() => {
        presets.fadeIn && presets.fadeIn.opacity && 
        sparkleRef.current?.style.setProperty('opacity', '1');
      }, delay);
    }
  }, [animated, delay]);

  return (
    <div 
      ref={sparkleRef}
      className={`inline-block ${className}`}
      style={{ opacity: animated ? 0 : 1 }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 12 12" 
        fill="none"
        className="drop-shadow-sm"
      >
        <path 
          d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" 
          fill={color} 
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

interface SparkleRingProps {
  count?: number;
  radius?: number;
  sparkleSize?: number;
  className?: string;
  animated?: boolean;
  staggerDelay?: number;
}

export const SparkleRing: React.FC<SparkleRingProps> = ({
  count = 8,
  radius = 50,
  sparkleSize = 8,
  className = '',
  animated = true,
  staggerDelay = 100
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animated && containerRef.current) {
      const sparkles = containerRef.current.querySelectorAll('.sparkle-item');
      sparkles.forEach((sparkle, index) => {
        setTimeout(() => {
          (sparkle as HTMLElement).style.opacity = '1';
          (sparkle as HTMLElement).style.transform = 'scale(1)';
        }, index * staggerDelay);
      });
    }
  }, [animated, staggerDelay]);

  const sparklePositions = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, angle };
  });

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{ width: radius * 2 + sparkleSize, height: radius * 2 + sparkleSize }}
    >
      {sparklePositions.map((pos, index) => (
        <div
          key={index}
          className="sparkle-item absolute transition-all duration-300"
          style={{
            left: pos.x + radius,
            top: pos.y + radius,
            transform: animated ? 'scale(0)' : 'scale(1)',
            opacity: animated ? 0 : 1,
            transformOrigin: 'center'
          }}
        >
          <SVGSparkle 
            size={sparkleSize} 
            animated={false}
            className="animate-pulse"
          />
        </div>
      ))}
    </div>
  );
};

interface ConfettiSparkleProps {
  count?: number;
  container?: HTMLElement | null;
  duration?: number;
  colors?: string[];
}

export const ConfettiSparkle: React.FC<ConfettiSparkleProps> = ({
  count = 15,
  container,
  duration = 2000,
  colors = [
    calculatorTheme.animation.particleColor,
    calculatorTheme.primary,
    calculatorTheme.highlight
  ]
}) => {
  const confettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!confettiRef.current) return;

    const targetContainer = container || confettiRef.current;
    const sparkles: HTMLElement[] = [];

    // Create sparkle elements
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      sparkle.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" 
                fill="${color}" opacity="0.8"/>
        </svg>
      `;
      
      sparkle.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 10;
      `;
      
      targetContainer.appendChild(sparkle);
      sparkles.push(sparkle);

      // Animate sparkle
      const tx = (Math.random() - 0.5) * 200;
      const ty = (Math.random() - 0.5) * 200;
      const rotation = Math.random() * 360;
      
      sparkle.animate([
        { 
          transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
          opacity: '0'
        },
        { 
          transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.2) rotate(${rotation}deg)`,
          opacity: '1',
          offset: 0.3
        },
        { 
          transform: `translate(calc(-50% + ${tx * 1.5}px), calc(-50% + ${ty * 1.5}px)) scale(0) rotate(${rotation * 2}deg)`,
          opacity: '0'
        }
      ], {
        duration: duration,
        delay: Math.random() * 300,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = () => {
        sparkle.remove();
      };
    }

    return () => {
      sparkles.forEach(sparkle => sparkle.remove());
    };
  }, [count, container, duration, colors]);

  return <div ref={confettiRef} className="absolute inset-0 pointer-events-none" />;
};

// Medical-themed sparkle animations
export const MedicalSparkles: React.FC<{ 
  active?: boolean; 
  className?: string; 
}> = ({ 
  active = false, 
  className = '' 
}) => {
  return (
    <div className={`relative ${className}`}>
      {active && (
        <>
          <SparkleRing 
            count={6} 
            radius={30} 
            sparkleSize={6}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
          <SparkleRing 
            count={8} 
            radius={50} 
            sparkleSize={8}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            staggerDelay={150}
          />
        </>
      )}
    </div>
  );
};

export default SVGSparkle;