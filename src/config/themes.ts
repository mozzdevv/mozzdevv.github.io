// Theme color presets — each provides full light + dark CSS variable sets
// Based on Bearnie's oklch color system

export interface ThemeColors {
    light: Record<string, string>;
    dark: Record<string, string>;
}

export const colorPresets: Record<string, ThemeColors> = {
    zinc: {
        light: {
            "--primary": "oklch(0.205 0 0)",
            "--primary-foreground": "oklch(0.985 0 0)",
            "--ring": "oklch(0.708 0 0)",
        },
        dark: {
            "--primary": "oklch(0.985 0 0)",
            "--primary-foreground": "oklch(0.205 0 0)",
            "--ring": "oklch(0.439 0 0)",
        },
    },
    emerald: {
        light: {
            "--primary": "oklch(0.596 0.145 163.225)",
            "--primary-foreground": "oklch(0.985 0 0)",
            "--ring": "oklch(0.596 0.145 163.225)",
        },
        dark: {
            "--primary": "oklch(0.596 0.145 163.225)",
            "--primary-foreground": "oklch(0.985 0 0)",
            "--ring": "oklch(0.596 0.145 163.225)",
        },
    },
    blue: {
        light: {
            "--primary": "oklch(0.546 0.245 262.881)",
            "--primary-foreground": "oklch(0.985 0 0)",
            "--ring": "oklch(0.546 0.245 262.881)",
        },
        dark: {
            "--primary": "oklch(0.623 0.214 259.815)",
            "--primary-foreground": "oklch(0.985 0 0)",
            "--ring": "oklch(0.623 0.214 259.815)",
        },
    },
    violet: {
        light: {
            "--primary": "oklch(0.541 0.281 293.009)",
            "--primary-foreground": "oklch(0.985 0 0)",
            "--ring": "oklch(0.541 0.281 293.009)",
        },
        dark: {
            "--primary": "oklch(0.627 0.265 303.9)",
            "--primary-foreground": "oklch(0.985 0 0)",
            "--ring": "oklch(0.627 0.265 303.9)",
        },
    },
    rose: {
        light: {
            "--primary": "oklch(0.586 0.253 17.585)",
            "--primary-foreground": "oklch(0.985 0 0)",
            "--ring": "oklch(0.586 0.253 17.585)",
        },
        dark: {
            "--primary": "oklch(0.645 0.246 16.439)",
            "--primary-foreground": "oklch(0.985 0 0)",
            "--ring": "oklch(0.645 0.246 16.439)",
        },
    },
    amber: {
        light: {
            "--primary": "oklch(0.769 0.188 70.08)",
            "--primary-foreground": "oklch(0.205 0 0)",
            "--ring": "oklch(0.769 0.188 70.08)",
        },
        dark: {
            "--primary": "oklch(0.828 0.189 84.429)",
            "--primary-foreground": "oklch(0.205 0 0)",
            "--ring": "oklch(0.828 0.189 84.429)",
        },
    },
    cyan: {
        light: {
            "--primary": "oklch(0.6 0.118 184.704)",
            "--primary-foreground": "oklch(0.985 0 0)",
            "--ring": "oklch(0.6 0.118 184.704)",
        },
        dark: {
            "--primary": "oklch(0.696 0.17 162.48)",
            "--primary-foreground": "oklch(0.985 0 0)",
            "--ring": "oklch(0.696 0.17 162.48)",
        },
    },
    orange: {
        light: {
            "--primary": "oklch(0.646 0.222 41.116)",
            "--primary-foreground": "oklch(0.985 0 0)",
            "--ring": "oklch(0.646 0.222 41.116)",
        },
        dark: {
            "--primary": "oklch(0.696 0.222 41.116)",
            "--primary-foreground": "oklch(0.985 0 0)",
            "--ring": "oklch(0.696 0.222 41.116)",
        },
    },
};

export const fontPresets: Record<string, string> = {
    geist: '"Geist", sans-serif',
    inter: '"Inter", sans-serif',
    "dm-sans": '"DM Sans", sans-serif',
    "space-grotesk": '"Space Grotesk", sans-serif',
};

export const fontUrls: Record<string, string> = {
    geist: "", // Already loaded by Bearnie
    inter: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
    "dm-sans": "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap",
    "space-grotesk": "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
};

export const radiusPresets: Record<string, string> = {
    none: "0",
    small: "0.375rem",
    medium: "0.625rem",
    large: "0.75rem",
};
