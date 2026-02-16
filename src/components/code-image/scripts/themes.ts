// Code image syntax themes
export interface CodeTheme {
  id: string;
  name: string;
  bg: string;
  fg: string;
  type: 'dark' | 'light';
  accent?: string; // Optional accent color for background
}

export const darkThemes: CodeTheme[] = [
  // Custom themes by Michael Andreuzza
  { id: 'Serendipity Midnight', name: 'Serendipity Midnight', bg: '#151726', fg: '#DEE0EF', type: 'dark' },
  { id: 'Serendipity Midnight Electric', name: 'Serendipity Electric', bg: '#0a0e15', fg: '#acb9d9', type: 'dark' },
  { id: 'Serendipity Sunset', name: 'Serendipity Sunset', bg: '#202231', fg: '#DEE0EF', type: 'dark' },
  { id: 'Sequoia Moonlight', name: 'Sequoia Moonlight', bg: '#0F1014', fg: '#868690', type: 'dark' },
  { id: 'Sequoia Monochrome', name: 'Sequoia Monochrome', bg: '#0F1014', fg: '#868690', type: 'dark' },
  { id: 'Sequoia Retro', name: 'Sequoia Retro', bg: '#0F1014', fg: '#868690', type: 'dark' },
  { id: 'Astro Dark', name: 'Astro By Mike Dark', bg: '#0F1014', fg: '#9898A2', type: 'dark' },
  { id: 'Malibu Sunset', name: 'Malibu Sunset', bg: '#1F1D32', fg: '#F2E9E1', type: 'dark' },
  { id: 'Bushland', name: 'Bushland', bg: '#313531', fg: '#fafafa', type: 'dark' },
  { id: 'Burnt Chestnut', name: 'Cocoa Burnt Chestnut', bg: '#211d20', fg: '#bbb1a7', type: 'dark' },
  { id: 'Titillating Midnight', name: 'Relentless Midnight', bg: '#00001A', fg: '#BEC4D4', type: 'dark' },
  { id: 'Titillating Sunset', name: 'Relentless Sunset', bg: '#191B39', fg: '#BEC4D4', type: 'dark' },
];

export const lightThemes: CodeTheme[] = [
  // Custom themes by Michael Andreuzza
  { id: 'Serendipity Morning', name: 'Serendipity Morning', bg: '#FDFDFE', fg: '#4E5377', type: 'light' },
  { id: 'Astro Light', name: 'Astro By Mike Light', bg: '#FDFDFE', fg: '#4E5377', type: 'light' },
  { id: 'Malibun Sunrise', name: 'Malibu Sunrise', bg: '#faf4ed', fg: '#526479', type: 'light' },
  { id: 'Almond Cream', name: 'Cocoa Almond Cream', bg: '#faf4ed', fg: '#526479', type: 'light' },
];

// Combined list (dark first, then light)
export const codeThemes: CodeTheme[] = [...darkThemes, ...lightThemes];

// Background presets
export interface BackgroundPreset {
  id: string;
  label: string;
  value: string;
  dot: string;
  type: 'gradient' | 'solid' | 'none';
}

export const backgrounds: BackgroundPreset[] = [
  { id: 'ocean', label: 'Ocean', value: 'linear-gradient(145deg, #0ea5e9, #6366f1)', dot: '#6366f1', type: 'gradient' },
  { id: 'sunset', label: 'Sunset', value: 'linear-gradient(145deg, #f97316, #ec4899)', dot: '#ec4899', type: 'gradient' },
  { id: 'forest', label: 'Forest', value: 'linear-gradient(145deg, #22c55e, #06b6d4)', dot: '#22c55e', type: 'gradient' },
  { id: 'lavender', label: 'Lavender', value: 'linear-gradient(145deg, #8b5cf6, #ec4899)', dot: '#8b5cf6', type: 'gradient' },
  { id: 'midnight', label: 'Midnight', value: 'linear-gradient(145deg, #1e1b4b, #312e81)', dot: '#312e81', type: 'gradient' },
  { id: 'ember', label: 'Ember', value: 'linear-gradient(145deg, #dc2626, #f97316)', dot: '#dc2626', type: 'gradient' },
  { id: 'arctic', label: 'Arctic', value: 'linear-gradient(145deg, #e0f2fe, #bae6fd)', dot: '#bae6fd', type: 'gradient' },
  { id: 'noir', label: 'Noir', value: '#1a1a1a', dot: '#1a1a1a', type: 'solid' },
  { id: 'slate', label: 'Slate', value: '#334155', dot: '#334155', type: 'solid' },
  { id: 'charcoal', label: 'Charcoal', value: '#27272a', dot: '#27272a', type: 'solid' },
  { id: 'white', label: 'White', value: '#ffffff', dot: '#ffffff', type: 'solid' },
  { id: 'cream', label: 'Cream', value: '#fef3c7', dot: '#fef3c7', type: 'solid' },
  { id: 'sky', label: 'Sky', value: '#e0f2fe', dot: '#e0f2fe', type: 'solid' },
  { id: 'transparent', label: 'None', value: 'transparent', dot: 'transparent', type: 'none' },
];

export const defaultTheme = darkThemes[0];
export const defaultBackground = backgrounds[0];
