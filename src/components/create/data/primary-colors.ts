// Primary color options for the dropdown
export const primaryColorOptions = [
  { name: "Neutral", value: "neutral", subtitle: "Match base color" },
  { name: "Amber", value: "amber" },
  { name: "Blue", value: "blue" },
  { name: "Cyan", value: "cyan" },
  { name: "Emerald", value: "emerald" },
  { name: "Fuchsia", value: "fuchsia" },
  { name: "Green", value: "green" },
  { name: "Indigo", value: "indigo" },
  { name: "Lime", value: "lime" },
  { name: "Orange", value: "orange" },
  { name: "Pink", value: "pink" },
];

// OKLCH color values for each primary color (used for theme application)
export const primaryColorValues: Record<string, { light: string, dark: string, lightFg: string, darkFg: string }> = {
  neutral: { light: 'oklch(0.205 0 0)', dark: 'oklch(0.985 0 0)', lightFg: 'oklch(0.985 0 0)', darkFg: 'oklch(0.205 0 0)' },
  red: { light: 'oklch(0.577 0.245 27.325)', dark: 'oklch(0.577 0.245 27.325)', lightFg: 'oklch(0.985 0 0)', darkFg: 'oklch(0.985 0 0)' },
  orange: { light: 'oklch(0.646 0.222 41.116)', dark: 'oklch(0.646 0.222 41.116)', lightFg: 'oklch(0.985 0 0)', darkFg: 'oklch(0.985 0 0)' },
  amber: { light: 'oklch(0.769 0.188 70.08)', dark: 'oklch(0.769 0.188 70.08)', lightFg: 'oklch(0.205 0 0)', darkFg: 'oklch(0.205 0 0)' },
  yellow: { light: 'oklch(0.795 0.184 86.047)', dark: 'oklch(0.795 0.184 86.047)', lightFg: 'oklch(0.205 0 0)', darkFg: 'oklch(0.205 0 0)' },
  lime: { light: 'oklch(0.768 0.189 130.85)', dark: 'oklch(0.768 0.189 130.85)', lightFg: 'oklch(0.205 0 0)', darkFg: 'oklch(0.205 0 0)' },
  green: { light: 'oklch(0.596 0.145 163.225)', dark: 'oklch(0.596 0.145 163.225)', lightFg: 'oklch(0.985 0 0)', darkFg: 'oklch(0.985 0 0)' },
  emerald: { light: 'oklch(0.596 0.145 163.225)', dark: 'oklch(0.596 0.145 163.225)', lightFg: 'oklch(0.985 0 0)', darkFg: 'oklch(0.985 0 0)' },
  teal: { light: 'oklch(0.577 0.118 182.503)', dark: 'oklch(0.577 0.118 182.503)', lightFg: 'oklch(0.985 0 0)', darkFg: 'oklch(0.985 0 0)' },
  cyan: { light: 'oklch(0.609 0.126 199.769)', dark: 'oklch(0.609 0.126 199.769)', lightFg: 'oklch(0.985 0 0)', darkFg: 'oklch(0.985 0 0)' },
  sky: { light: 'oklch(0.609 0.145 222.492)', dark: 'oklch(0.609 0.145 222.492)', lightFg: 'oklch(0.985 0 0)', darkFg: 'oklch(0.985 0 0)' },
  blue: { light: 'oklch(0.546 0.245 262.881)', dark: 'oklch(0.546 0.245 262.881)', lightFg: 'oklch(0.985 0 0)', darkFg: 'oklch(0.985 0 0)' },
  indigo: { light: 'oklch(0.511 0.262 276.966)', dark: 'oklch(0.511 0.262 276.966)', lightFg: 'oklch(0.985 0 0)', darkFg: 'oklch(0.985 0 0)' },
  violet: { light: 'oklch(0.541 0.281 293.009)', dark: 'oklch(0.541 0.281 293.009)', lightFg: 'oklch(0.985 0 0)', darkFg: 'oklch(0.985 0 0)' },
  purple: { light: 'oklch(0.558 0.288 302.321)', dark: 'oklch(0.558 0.288 302.321)', lightFg: 'oklch(0.985 0 0)', darkFg: 'oklch(0.985 0 0)' },
  fuchsia: { light: 'oklch(0.591 0.293 322.896)', dark: 'oklch(0.591 0.293 322.896)', lightFg: 'oklch(0.985 0 0)', darkFg: 'oklch(0.985 0 0)' },
  pink: { light: 'oklch(0.656 0.241 354.308)', dark: 'oklch(0.656 0.241 354.308)', lightFg: 'oklch(0.985 0 0)', darkFg: 'oklch(0.985 0 0)' },
  rose: { light: 'oklch(0.645 0.246 16.439)', dark: 'oklch(0.645 0.246 16.439)', lightFg: 'oklch(0.985 0 0)', darkFg: 'oklch(0.985 0 0)' },
};
