// Base color options for the dropdown
export const baseColorOptions = [
  { name: "Neutral", value: "neutral" },
  { name: "Slate", value: "slate" },
  { name: "Gray", value: "gray" },
  { name: "Zinc", value: "zinc" },
  { name: "Stone", value: "stone" },
];

// OKLCH color values for each base color (used for theme application)
export const baseColorValues: Record<string, { light: Record<string, string>, dark: Record<string, string> }> = {
  neutral: {
    light: {
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.145 0 0)',
      card: 'oklch(1 0 0)',
      muted: 'oklch(0.97 0 0)',
      mutedForeground: 'oklch(0.556 0 0)',
      border: 'oklch(0.922 0 0)',
      input: 'oklch(0.922 0 0)',
    },
    dark: {
      background: 'oklch(0.145 0 0)',
      foreground: 'oklch(0.985 0 0)',
      card: 'oklch(0.145 0 0)',
      muted: 'oklch(0.269 0 0)',
      mutedForeground: 'oklch(0.708 0 0)',
      border: 'oklch(0.269 0 0)',
      input: 'oklch(0.269 0 0)',
    }
  },
  slate: {
    light: {
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.129 0.042 264.695)',
      card: 'oklch(1 0 0)',
      muted: 'oklch(0.968 0.007 264.536)',
      mutedForeground: 'oklch(0.554 0.022 264.364)',
      border: 'oklch(0.929 0.013 255.508)',
      input: 'oklch(0.929 0.013 255.508)',
    },
    dark: {
      background: 'oklch(0.129 0.042 264.695)',
      foreground: 'oklch(0.968 0.007 264.536)',
      card: 'oklch(0.129 0.042 264.695)',
      muted: 'oklch(0.279 0.041 260.031)',
      mutedForeground: 'oklch(0.704 0.022 261.325)',
      border: 'oklch(0.279 0.041 260.031)',
      input: 'oklch(0.279 0.041 260.031)',
    }
  },
  gray: {
    light: {
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.13 0.028 261.692)',
      card: 'oklch(1 0 0)',
      muted: 'oklch(0.967 0.003 264.542)',
      mutedForeground: 'oklch(0.551 0.018 264.436)',
      border: 'oklch(0.928 0.006 264.531)',
      input: 'oklch(0.928 0.006 264.531)',
    },
    dark: {
      background: 'oklch(0.13 0.028 261.692)',
      foreground: 'oklch(0.967 0.003 264.542)',
      card: 'oklch(0.13 0.028 261.692)',
      muted: 'oklch(0.278 0.033 256.848)',
      mutedForeground: 'oklch(0.707 0.015 261.235)',
      border: 'oklch(0.278 0.033 256.848)',
      input: 'oklch(0.278 0.033 256.848)',
    }
  },
  zinc: {
    light: {
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.141 0.005 285.823)',
      card: 'oklch(1 0 0)',
      muted: 'oklch(0.967 0.001 286.375)',
      mutedForeground: 'oklch(0.552 0.016 285.938)',
      border: 'oklch(0.92 0.004 286.32)',
      input: 'oklch(0.92 0.004 286.32)',
    },
    dark: {
      background: 'oklch(0.141 0.005 285.823)',
      foreground: 'oklch(0.985 0 0)',
      card: 'oklch(0.141 0.005 285.823)',
      muted: 'oklch(0.274 0.006 286.033)',
      mutedForeground: 'oklch(0.705 0.015 286.067)',
      border: 'oklch(0.274 0.006 286.033)',
      input: 'oklch(0.274 0.006 286.033)',
    }
  },
  stone: {
    light: {
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.147 0.004 49.25)',
      card: 'oklch(1 0 0)',
      muted: 'oklch(0.97 0.001 106.424)',
      mutedForeground: 'oklch(0.553 0.013 58.071)',
      border: 'oklch(0.923 0.003 48.717)',
      input: 'oklch(0.923 0.003 48.717)',
    },
    dark: {
      background: 'oklch(0.147 0.004 49.25)',
      foreground: 'oklch(0.97 0.001 106.424)',
      card: 'oklch(0.147 0.004 49.25)',
      muted: 'oklch(0.268 0.007 34.298)',
      mutedForeground: 'oklch(0.709 0.01 56.259)',
      border: 'oklch(0.268 0.007 34.298)',
      input: 'oklch(0.268 0.007 34.298)',
    }
  }
};
