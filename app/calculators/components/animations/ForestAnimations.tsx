// Forest Theme Animations - Professional Medical Animations
// Professional medical animations with forest green + cream color palette using Anime.js v4

import { animate, createTimeline, stagger, svg } from 'animejs';
import { calculatorTheme } from '../../utils/calculatorTheme';

// Animation timeline interface
export interface AnimationTimeline {
  play: () => void;
  pause: () => void;
  restart: () => void;
  seek: (progress: number) => void;
}

// Mock animation object for functions not yet implemented
const createMockAnimation = (): any => ({
  play: () => {},
  pause: () => {},
  restart: () => {},
  seek: () => {},
});

// Entry Animations - Calendar morphing with forest green
export const animateEntry = (target: string | Element): any => {
  return animate(target, {
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: calculatorTheme.durations.entry,
    ease: 'outElastic(1, .8)',
    translateY: [-20, 0],
  });
};

// Calendar morphing animation (for date inputs) - Enhanced Lotus Opening
export const animateCalendarEntry = (target: string | Element): any => {
  return animate(target, {
    scale: [0.9, 1.05, 1],
    duration: calculatorTheme.durations.normal,
    ease: 'outBounce',
  });
};

// Calendar to Lotus Morphing Animation (Advanced)
export const animateCalendarMorph = (target: string | Element): any => {
  const timeline = createTimeline();
  
  return timeline
    .add(target, {
      scale: [1, 0.8],
      rotate: [0, 180],
      duration: 400,
      ease: 'outQuad'
    })
    .add(target, {
      scale: [0.8, 1.1, 1],
      rotate: [180, 360],
      borderRadius: ['8px', '50%', '8px'],
      duration: 400,
      ease: 'outElastic(1, .8)'
    });
};

// Processing Animation with Medical Motifs
export const animateProcessing = (container: string | Element): any => {
  const timeline = createTimeline();
  
  return timeline
    .add('.progress-circle', {
      strokeDashoffset: ['100%', '0%'],
      duration: 600,
      ease: 'outQuad'
    })
    .add('.medical-icon', {
      scale: [0, 1],
      opacity: [0, 1],
      delay: stagger(100),
      duration: 300
    }, '-=400')
    .add('.heartbeat-line', {
      strokeDashoffset: ['100%', '0%'],
      duration: 800,
      ease: 'outQuad'
    }, '-=200');
};

// Circular Progress with Traditional Medical Motifs
export const animateCircularProgress = (
  target: string | Element,
  progress: number = 100
): any => {
  return animate(target, {
    strokeDashoffset: [`${100 - progress}%`, '0%'],
    duration: calculatorTheme.durations.normal,
    ease: 'outQuad',
    stroke: {
      from: calculatorTheme.accent,
      to: calculatorTheme.primary,
      duration: calculatorTheme.durations.normal * 0.8
    }
  });
};

// Baby Silhouette Growth Animation
export const animateBabyGrowth = (
  target: string | Element,
  fromWeek: number = 0,
  toWeek: number = 40
): any => {
  const scaleFrom = Math.min((fromWeek / 40) * 0.8 + 0.2, 1);
  const scaleTo = Math.min((toWeek / 40) * 0.8 + 0.2, 1);
  
  return animate(target, {
    scale: [scaleFrom, scaleTo * 1.1, scaleTo],
    opacity: [0.7, 1],
    duration: calculatorTheme.durations.result,
    ease: 'outElastic(1, .8)'
  });
};

// Confetti Burst with SVG Sparkles
export const animateConfettiBurst = (
  container: string | Element,
  count: number = 15
): any => {
  const particles: HTMLElement[] = [];
  const containerEl = typeof container === 'string' ? document.querySelector(container) : container;
  
  if (!containerEl) return { play: () => {}, pause: () => {}, restart: () => {} };
  
  // Create SVG sparkles
  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" 
              fill="${calculatorTheme.animation.particleColor}" opacity="0.8"/>
      </svg>
    `;
    sparkle.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
    `;
    containerEl.appendChild(sparkle);
    particles.push(sparkle);
  }
  
  return animate(particles, {
    translateX: () => (Math.random() - 0.5) * 200,
    translateY: () => (Math.random() - 0.5) * 200,
    rotate: () => Math.random() * 360,
    scale: [0, 1.2, 0],
    opacity: [0, 1, 0],
    duration: 2000,
    ease: 'outQuad',
    complete: () => {
      particles.forEach(p => p.remove());
    }
  });
};

// Milestone Badge Slide Animation
export const animateMilestoneBadge = (
  target: string | Element,
  delay: number = 0
): any => {
  return animate(target, {
    translateX: [100, 0],
    scale: [0.8, 1.1, 1],
    opacity: [0, 1],
    duration: 500,
    delay: delay,
    ease: 'outElastic(1, .8)'
  });
};

// Form input focus animations
export const animateInputFocus = (target: string | Element): any => {
  return animate(target, {
    scale: [1, 1.02, 1],
    duration: calculatorTheme.durations.fast,
    ease: 'outQuad',
  });
};

// Button hover animations
export const animateButtonHover = (target: string | Element): any => {
  return animate(target, {
    scale: [1, 1.05],
    duration: calculatorTheme.durations.fast,
    ease: 'outQuad',
  });
};

// Loading spinner animation with medical iconography
export const animateLoading = (target: string | Element): any => {
  return animate(target, {
    rotate: '1turn',
    duration: calculatorTheme.durations.pulse,
    ease: 'linear',
    loop: true,
  });
};

// Results reveal animation with baby silhouette growth
export const animateResultsReveal = (target: string | Element): any => {
  return animate(target, {
    translateY: [-20, 0],
    opacity: [0, 1],
    scale: [0.9, 1],
    duration: calculatorTheme.durations.result,
    ease: 'outElastic(1, .8)',
  });
};

// Progress bar animation
export const animateProgress = (
  target: string | Element,
  progress: number
): any => {
  return animate(target, {
    width: `${progress}%`,
    duration: calculatorTheme.durations.normal,
    ease: 'outQuad',
  });
};

// Card entrance animation
export const animateCardEntry = (
  target: string | Element,
  delay: number = 0
): any => {
  return animate(target, {
    translateY: [30, 0],
    opacity: [0, 1],
    scale: [0.95, 1],
    duration: calculatorTheme.durations.result,
    delay: delay,
    ease: 'outElastic(1, .8)',
  });
};

// Particle effects for celebration
export const animateParticles = (
  container: string | Element,
  count: number = 20
): any => {
  const particles: HTMLElement[] = [];
  const containerEl = typeof container === 'string' ? document.querySelector(container) : container;
  
  if (!containerEl) return { play: () => {}, pause: () => {}, restart: () => {} };
  
  // Create particles
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 6px;
      height: 6px;
      background: ${calculatorTheme.animation.particleColor};
      border-radius: 50%;
      pointer-events: none;
      top: 50%;
      left: 50%;
    `;
    containerEl.appendChild(particle);
    particles.push(particle);
  }
  
  return anime({
    targets: particles,
    translateX: () => anime.random(-100, 100),
    translateY: () => anime.random(-100, 100),
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    duration: 2000,
    easing: 'easeOutQuad',
    complete: () => {
      particles.forEach(p => p.remove());
    }
  });
};

// Timeline for complex animations
export const createCalculatorTimeline = (): any => {
  return createMockAnimation();
};

// Pregnancy week visualization animation
export const animatePregnancyProgress = (
  target: string | Element,
  weeks: number,
  totalWeeks: number = 40
): any => {
  return createMockAnimation();
};

// BMI meter animation
export const animateBMIMeter = (
  target: string | Element,
  bmi: number,
  category: string
): any => {
  return createMockAnimation();
};

// Weight gain chart animation
export const animateWeightChart = (
  target: string | Element,
  dataPoints: number[]
): any => {
  return createMockAnimation();
};

// Calendar highlighting animation
export const animateCalendarHighlight = (
  target: string | Element,
  dates: Date[]
): any => {
  return createMockAnimation();
};

// Doctor avatar introduction animation
export const animateDoctorIntro = (target: string | Element): any => {
  return createMockAnimation();
};

// Morphing icon animations
export const animateIconMorph = (
  target: string | Element,
  fromIcon: string,
  toIcon: string
): any => {
  return createMockAnimation();
};

// Text typewriter effect
export const animateTypewriter = (
  target: string | Element,
  text: string,
  speed: number = 50
): any => {
  return createMockAnimation();
};

// Breathing meditation animation
export const animateBreathing = (
  target: string | Element,
  cycles: number = 5
): any => {
  return createMockAnimation();
};

// Heart rate visualization
export const animateHeartbeat = (
  target: string | Element,
  bpm: number = 72
): any => {
  return createMockAnimation();
};

// Additional required exports
export const animateNumberCounter = (
  target: string | Element,
  from: number,
  to: number
): any => {
  return createMockAnimation();
};

// Presets for common animation configurations
export const presets = {
  fadeIn: { opacity: [0, 1], duration: 300 },
  slideUp: { translateY: [20, 0], opacity: [0, 1], duration: 400 },
  scaleIn: { scale: [0.9, 1], opacity: [0, 1], duration: 350 },
  bounceIn: { scale: [0.3, 1.05, 1], duration: 500 },
  cardEntry: animateCardEntry,
  entry: animateEntry,
  resultsReveal: animateResultsReveal,
  loading: animateLoading,
  inputFocus: animateInputFocus,
  buttonHover: animateButtonHover,
  particles: animateParticles,
  // Enhanced Due Date Calculator Animations
  calendarMorph: animateCalendarMorph,
  processing: animateProcessing,
  circularProgress: animateCircularProgress,
  babyGrowth: animateBabyGrowth,
  confettiBurst: animateConfettiBurst,
  milestoneBadge: animateMilestoneBadge,
  error: createMockAnimation,
  success: createMockAnimation,
  buttonPress: createMockAnimation,
  resultReveal: createMockAnimation,
};

// Export all animation utilities
export const ForestAnimations = {
  entry: animateEntry,
  calendarEntry: animateCalendarEntry,
  calendarMorph: animateCalendarMorph,
  processing: animateProcessing,
  circularProgress: animateCircularProgress,
  babyGrowth: animateBabyGrowth,
  confettiBurst: animateConfettiBurst,
  milestoneBadge: animateMilestoneBadge,
  inputFocus: animateInputFocus,
  buttonHover: animateButtonHover,
  loading: animateLoading,
  resultsReveal: animateResultsReveal,
  progress: animateProgress,
  cardEntry: animateCardEntry,
  particles: animateParticles,
  timeline: createCalculatorTimeline,
  pregnancyProgress: animatePregnancyProgress,
  bmiMeter: animateBMIMeter,
  weightChart: animateWeightChart,
  calendarHighlight: animateCalendarHighlight,
  doctorIntro: animateDoctorIntro,
  iconMorph: animateIconMorph,
  typewriter: animateTypewriter,
  breathing: animateBreathing,
  heartbeat: animateHeartbeat,
  numberCounter: animateNumberCounter,
  presets,
};

export default ForestAnimations;