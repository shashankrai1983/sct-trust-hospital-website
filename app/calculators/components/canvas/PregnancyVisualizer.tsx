'use client';

// Pregnancy Visualizer using HTML5 Canvas
// Professional baby silhouette animation with forest green gradients

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { calculatorTheme } from '../../utils/calculatorTheme';

interface PregnancyVisualizerProps {
  week: number;
  className?: string;
  showWeekLabel?: boolean;
  animated?: boolean;
  width?: number;
  height?: number;
  showCelebration?: boolean;
  celebrationDelay?: number;
}

interface Point {
  x: number;
  y: number;
}

export const PregnancyVisualizer: React.FC<PregnancyVisualizerProps> = ({
  week,
  className = '',
  showWeekLabel = true,
  animated = true,
  width = 400,
  height = 300,
  showCelebration = false,
  celebrationDelay = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [currentScale, setCurrentScale] = useState(0);
  const [celebrationActive, setCelebrationActive] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{x: number, y: number, size: number, angle: number, opacity: number}>>([]);
  const targetScale = Math.min((week / 40) * 0.8 + 0.2, 1); // Scale from 20% to 100%

  // Baby silhouette path points (simplified for performance)
  const getBabyPath = useCallback((scale: number, centerX: number, centerY: number): Point[] => {
    const basePoints: Point[] = [
      // Head (circle approximation)
      { x: 0, y: -50 },
      { x: 15, y: -48 },
      { x: 25, y: -40 },
      { x: 30, y: -25 },
      { x: 25, y: -10 },
      
      // Body
      { x: 20, y: 0 },
      { x: 18, y: 20 },
      { x: 15, y: 35 },
      { x: 10, y: 45 },
      
      // Legs
      { x: 8, y: 50 },
      { x: 5, y: 60 },
      { x: 0, y: 65 },
      { x: -5, y: 60 },
      { x: -8, y: 50 },
      
      // Left side (mirror)
      { x: -10, y: 45 },
      { x: -15, y: 35 },
      { x: -18, y: 20 },
      { x: -20, y: 0 },
      { x: -25, y: -10 },
      { x: -30, y: -25 },
      { x: -25, y: -40 },
      { x: -15, y: -48 },
    ];

    return basePoints.map(point => ({
      x: centerX + (point.x * scale),
      y: centerY + (point.y * scale),
    }));
  }, []);

  // Create gradient for baby silhouette
  const createBabyGradient = useCallback((ctx: CanvasRenderingContext2D, centerX: number, centerY: number, scale: number) => {
    const gradient = ctx.createRadialGradient(
      centerX, centerY - 20 * scale, 0,
      centerX, centerY, 80 * scale
    );
    
    gradient.addColorStop(0, calculatorTheme.primary + '80'); // 50% opacity
    gradient.addColorStop(0.7, calculatorTheme.secondary + '60'); // 40% opacity
    gradient.addColorStop(1, calculatorTheme.primary + '40'); // 25% opacity
    
    return gradient;
  }, []);

  // Draw beating heart - Linus: "Define functions before using them, not after"
  const drawHeart = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    const heartbeatScale = 1 + Math.sin(Date.now() * 0.008) * 0.1; // Gentle heartbeat animation
    
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size * heartbeatScale, size * heartbeatScale);
    
    ctx.beginPath();
    ctx.fillStyle = '#ff6b6b'; // Heart red color
    
    // Heart shape using bezier curves
    ctx.moveTo(0, 3);
    ctx.bezierCurveTo(-5, -2, -10, -2, -5, 5);
    ctx.bezierCurveTo(0, 8, 0, 8, 0, 3);
    ctx.bezierCurveTo(0, 8, 0, 8, 5, 5);
    ctx.bezierCurveTo(10, -2, 5, -2, 0, 3);
    
    ctx.fill();
    ctx.restore();
  }, []);

  // Draw baby silhouette
  const drawBaby = useCallback((ctx: CanvasRenderingContext2D, scale: number) => {
    const centerX = width / 2;
    const centerY = height / 2 + 20; // Slightly below center
    
    const points = getBabyPath(scale, centerX, centerY);
    
    // Create and apply gradient
    const gradient = createBabyGradient(ctx, centerX, centerY, scale);
    ctx.fillStyle = gradient;
    
    // Draw baby silhouette
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.closePath();
    ctx.fill();
    
    // Add subtle stroke
    ctx.strokeStyle = calculatorTheme.primary + '80';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Add heart if baby is developed enough (after week 6)
    if (week >= 6 && scale > 0.3) {
      drawHeart(ctx, centerX, centerY - 10 * scale, scale * 0.3);
    }
  }, [week, width, height, getBabyPath, createBabyGradient, drawHeart]);

  // Draw decorative elements (stars, sparkles) - Linus: "Define before use"
  const drawDecorative = useCallback((ctx: CanvasRenderingContext2D) => {
    const starCount = Math.min(Math.floor(week / 4), 8);
    
    for (let i = 0; i < starCount; i++) {
      const x = (width / starCount) * i + Math.sin(Date.now() * 0.002 + i) * 20;
      const y = 30 + Math.cos(Date.now() * 0.003 + i) * 15;
      const size = 2 + Math.sin(Date.now() * 0.005 + i) * 1;
      
      ctx.fillStyle = calculatorTheme.highlight + '60';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [week, width, height]);

  // Draw background elements
  const drawBackground = useCallback((ctx: CanvasRenderingContext2D) => {
    // Create background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, calculatorTheme.accent);
    bgGradient.addColorStop(1, calculatorTheme.primary + '10');
    
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add subtle decorative elements
    if (week >= 12) {
      drawDecorative(ctx);
    }
  }, [week, width, height, drawDecorative]);

  // Draw celebration sparkles
  const drawCelebrationSparkles = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!celebrationActive) return;
    
    sparkles.forEach(sparkle => {
      ctx.save();
      ctx.translate(sparkle.x, sparkle.y);
      ctx.rotate(sparkle.angle);
      ctx.globalAlpha = sparkle.opacity;
      
      // Draw SVG-style sparkle
      ctx.fillStyle = calculatorTheme.animation.particleColor;
      ctx.beginPath();
      ctx.moveTo(0, -sparkle.size);
      ctx.lineTo(sparkle.size * 0.3, -sparkle.size * 0.3);
      ctx.lineTo(sparkle.size, 0);
      ctx.lineTo(sparkle.size * 0.3, sparkle.size * 0.3);
      ctx.lineTo(0, sparkle.size);
      ctx.lineTo(-sparkle.size * 0.3, sparkle.size * 0.3);
      ctx.lineTo(-sparkle.size, 0);
      ctx.lineTo(-sparkle.size * 0.3, -sparkle.size * 0.3);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    });
  }, [celebrationActive, sparkles]);

  // Initialize celebration sparkles
  const initCelebration = useCallback(() => {
    const newSparkles = [];
    const centerX = width / 2;
    const centerY = height / 2;
    
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const distance = 60 + Math.random() * 40;
      newSparkles.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size: 4 + Math.random() * 4,
        angle: Math.random() * Math.PI * 2,
        opacity: 0.8 + Math.random() * 0.2
      });
    }
    
    setSparkles(newSparkles);
    setCelebrationActive(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setCelebrationActive(false);
      setSparkles([]);
    }, 3000);
  }, [width, height]);

  // Trigger celebration
  useEffect(() => {
    if (showCelebration && week > 0) {
      setTimeout(() => {
        initCelebration();
      }, celebrationDelay);
    }
  }, [showCelebration, week, celebrationDelay, initCelebration]);

  // Draw week label
  const drawWeekLabel = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!showWeekLabel) return;
    
    ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = calculatorTheme.text;
    ctx.textAlign = 'center';
    
    const text = `Week ${Math.floor(week)}`;
    ctx.fillText(text, width / 2, height - 20);
    
    // Add subtle text shadow
    ctx.fillStyle = calculatorTheme.accent;
    ctx.fillText(text, width / 2 + 1, height - 19);
    ctx.fillStyle = calculatorTheme.text;
    ctx.fillText(text, width / 2, height - 20);
  }, [week, width, height, showWeekLabel]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    drawBackground(ctx);
    
    // Animate scale towards target
    if (animated) {
      const diff = targetScale - currentScale;
      setCurrentScale(prev => prev + diff * 0.1);
    } else {
      setCurrentScale(targetScale);
    }
    
    // Draw baby at current scale
    drawBaby(ctx, currentScale);
    
    // Draw celebration sparkles
    drawCelebrationSparkles(ctx);
    
    // Draw week label
    drawWeekLabel(ctx);
    
    // Continue animation if needed
    if ((animated && Math.abs(targetScale - currentScale) > 0.001) || celebrationActive) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [currentScale, targetScale, animated, celebrationActive, drawBackground, drawBaby, drawCelebrationSparkles, drawWeekLabel, width, height]);

  // Initialize and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas size
    canvas.width = width;
    canvas.height = height;
    
    // Start animation
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, width, height]);

  // Update animation when week changes
  useEffect(() => {
    if (animated) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      animate();
    }
  }, [week, animated, animate]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-xl shadow-warm"
        style={{
          maxWidth: width,
          maxHeight: height,
          background: `linear-gradient(135deg, ${calculatorTheme.accent}, ${calculatorTheme.primary}10)`,
        }}
      />
      
      {/* Development indicators */}
      {week >= 12 && (
        <div className="absolute top-2 right-2 text-xs text-primary-green bg-accent-cream px-2 py-1 rounded-full">
          2nd Trimester
        </div>
      )}
      
      {week >= 28 && (
        <div className="absolute top-2 left-2 text-xs text-forest-green bg-accent-cream px-2 py-1 rounded-full">
          3rd Trimester
        </div>
      )}
      
      {/* Viability indicator */}
      {week >= 24 && (
        <div className="absolute bottom-2 left-2 text-xs text-forest-green bg-white/80 px-2 py-1 rounded-full">
          Viable ✨
        </div>
      )}
    </div>
  );
};

// Smaller version for use in cards
export const PregnancyVisualizerMini: React.FC<Omit<PregnancyVisualizerProps, 'width' | 'height'>> = (props) => (
  <PregnancyVisualizer {...props} width={200} height={150} showWeekLabel={false} />
);

export default PregnancyVisualizer;