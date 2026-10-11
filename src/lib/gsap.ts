'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
gsap.defaults({ ease: 'expo.out', duration: 1 });

/** Every timeline lives under this query, so reduced motion gets the final state. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const DESKTOP = '(min-width: 768px)';

export { gsap, ScrollTrigger, SplitText, useGSAP };
