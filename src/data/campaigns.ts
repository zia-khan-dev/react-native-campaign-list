import { SAMPLE_MP4 } from './sampleVideoUrls';

export type ExampleVideo = {
  id: string;
  title: string;
  /** Public sample MP4 — replace with real brief assets in production */
  uri: string;
};

export type Campaign = {
  id: string;
  brand: string;
  tagline: string;
  payoutUsd: number;
  deadlineLabel: string;
  brief: string;
  dos: string[];
  donts: string[];
  exampleVideos: ExampleVideo[];
};

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'luma-glow-serum',
    brand: 'Luma Glow',
    tagline: 'Glass-skin serum launch',
    payoutUsd: 450,
    deadlineLabel: 'Apr 30, 2026',
    brief:
      'Film a 30–45s GRWM-style clip in natural daylight. Open with a hook (“3 days in and my skin is…”), show the Luma Glow serum texture on the back of your hand, then pat-in on clean skin. End with a close-up smile + soft voice line about confidence, not filters. Sound: trending calm instrumental or original voiceover only.',
    dos: [
      'Show the bottle label clearly for ≥2 seconds',
      'Film vertical 9:16, face well-lit, minimal filters',
      'Include on-screen captions for the hook',
    ],
    donts: [
      'No competitor brands or medical claims',
      'No text-to-speech robot voice',
    ],
    exampleVideos: [
      {
        id: 'ex-luma-1',
        title: 'Reference: texture + pat-in pacing',
        uri: SAMPLE_MP4.w3schoolsBbb,
      },
      {
        id: 'ex-luma-2',
        title: 'Reference: hook + payoff structure',
        uri: SAMPLE_MP4.mdnFlower,
      },
    ],
  },
  {
    id: 'peaktrail-boots',
    brand: 'PeakTrail Co.',
    tagline: 'Mud season boots UGC',
    payoutUsd: 280,
    deadlineLabel: 'May 12, 2026',
    brief:
      'We want gritty, authentic trail energy. Start mid-hike (selfie cam), splash through a shallow puddle or mud patch in PeakTrail boots, then cut to a static beauty shot of the tread. 20–35s. Voiceover or trending outdoor audio. Mention durability once, casually.',
    dos: [
      'Wear visible PeakTrail logo on footwear',
      'Include at least one wide + one detail shot',
    ],
    donts: [
      'No dangerous stunts or private property without permission',
      'No drone footage unless you own rights',
    ],
    exampleVideos: [
      {
        id: 'ex-peak-1',
        title: 'Example: motion + product hero frame',
        uri: SAMPLE_MP4.filesamples640,
      },
      {
        id: 'ex-peak-2',
        title: 'Example: pacing for short outdoor UGC',
        uri: SAMPLE_MP4.w3schoolsBbb,
      },
    ],
  },
  {
    id: 'sonicbuds-pro',
    brand: 'SonicBuds',
    tagline: 'Pro ANC unboxing wave',
    payoutUsd: 320,
    deadlineLabel: 'Apr 22, 2026',
    brief:
      'Desk POV unboxing SonicBuds Pro: satisfying peel of outer wrap, hinge case “click”, first pairing moment, then a 5-second noise-canceling demo (traffic or café SFX under voice). 25–40s. Keep energy upbeat but not shouty.',
    dos: [
      'Show case LEDs + ear tip sizes if included',
      'Use clean desk or minimal background',
    ],
    donts: [
      'No fake “surprise” reactions',
      'No copyrighted chart music',
    ],
    exampleVideos: [
      {
        id: 'ex-sonic-1',
        title: 'Example: unboxing rhythm',
        uri: SAMPLE_MP4.mdnFlower,
      },
      {
        id: 'ex-sonic-2',
        title: 'Example: feature demo cut',
        uri: SAMPLE_MP4.filesamples640,
      },
    ],
  },
];

export function getCampaignById(id: string): Campaign | undefined {
  return CAMPAIGNS.find((c) => c.id === id);
}
