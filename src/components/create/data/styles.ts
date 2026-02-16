// Style preset options for the dropdown
export const styleOptions = [
  {
    name: "Bearnie",
    value: "bearnie",
    description: "Balanced and clean. Subtle borders, neutral surfaces, Inter font.",
  },
  {
    name: "Rere",
    value: "rere",
    description:
      "Swiss editorial. Hard corners, uppercase accents, Geist font.",
  },
  {
    name: "Valentina",
    value: "valentina",
    description:
      "Playful and soft. Pill buttons, larger spacing, lifted cards, Outfit font.",
  },
];

// Style preset values
// radius: border-radius in rem
// spacing: base spacing multiplier (standard is 0.25rem = 4px)
// font: font family key
// buttonRadius: 'full' for pill-shaped buttons, otherwise uses --radius
// cardBorder: false to remove card borders
// cardPadding: false to remove card padding
// cardShadow: true to add shadow to cards
// borderWidth: '1px' or '2px' for border thickness
// uppercase: true for uppercase headings
// textScale: 'normal' or 'large' for text sizing
export type StylePreset = {
  radius: string;
  spacing: string;
  font: string;
  buttonRadius?: string;
  cardBorder?: boolean;
  cardPadding?: boolean;
  cardShadow?: boolean;
  borderWidth?: string;
  uppercase?: boolean;
  textScale?: string;
};

export const stylePresets: Record<string, StylePreset> = {
  // Bearnie: Default balanced style
  bearnie: {
    radius: "0.625",
    spacing: "0.25",
    font: "inter",
    borderWidth: "1px",
    textScale: "normal",
  },
  // Rere: Swiss minimalist - sharp corners, uppercase
  rere: {
    radius: "0",
    spacing: "0.25",
    font: "geist",
    uppercase: true,
    textScale: "normal",
    borderWidth: "1px",
    cardShadow: false,
  },
  // Valentina: Playful & bold with shadows and larger text
  valentina: {
    radius: "1",
    spacing: "0.375",
    font: "outfit",
    buttonRadius: "full",
    cardShadow: true,
    borderWidth: "1px",
    textScale: "large",
  },
};
