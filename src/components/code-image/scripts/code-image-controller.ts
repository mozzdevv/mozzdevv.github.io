// Code Image Controller
// Handles Shiki initialization, code highlighting, and all interactivity

import { codeThemes, type CodeTheme } from "./themes";
import { languages, detectLanguage } from "./languages";

// State
const state = {
  code: `class PolarBear {
  constructor(name) {
    this.name = name;
    this.hunger = 0;
    this.mood = "chill";
  }

  fish() {
    this.hunger = Math.max(0, this.hunger - 3);
    this.mood = "happy";
    return \`\${this.name} caught a salmon!\`;
  }

  nap(hours) {
    this.mood = hours > 2 ? "refreshed" : "groggy";
    return \`\${this.name} napped for \${hours}h 💤\`;
  }
}

const bearnie = new PolarBear("Bearnie");
console.log(bearnie.fish());
console.log(bearnie.nap(3));`,
  language: "auto" as string,
  detectedLanguage: "javascript",
  themeIndex: -1, // Will be set to Astro By Mike Light in init
  darkMode: false,
  showLineNumbers: true,
  padding: 64,
};

// Highlighter (loaded async)
let highlighter: any = null;

// DOM refs
const codeInput = document.getElementById(
  "code-input",
) as HTMLTextAreaElement | null;
const codeDisplay = document.getElementById(
  "code-display",
) as HTMLElement | null;
const editorContainer = document.getElementById(
  "code-editor-container",
) as HTMLElement | null;
const loadingIndicator = document.getElementById(
  "code-image-loading",
) as HTMLElement | null;
const imageBackground = document.getElementById(
  "code-image-background",
) as HTMLElement | null;
const imageCard = document.getElementById(
  "code-image-card",
) as HTMLElement | null;
const themeSelect = document.getElementById(
  "theme-select",
) as HTMLSelectElement | null;
const darkmodeToggle = document.getElementById(
  "darkmode-toggle",
) as HTMLElement | null;
const linenumbersToggle = document.getElementById(
  "linenumbers-toggle",
) as HTMLElement | null;
const languageSelect = document.getElementById(
  "language-select",
) as HTMLSelectElement | null;

// Theme pairing map (dark ↔ light variants)
const themePairs: Record<string, string> = {
  // Custom themes by Michael Andreuzza
  "Serendipity Midnight": "Serendipity Morning",
  "Serendipity Morning": "Serendipity Midnight",
  "Astro Dark": "Astro Light",
  "Astro Light": "Astro Dark",
  "Malibu Sunset": "Malibun Sunrise",
  "Malibun Sunrise": "Malibu Sunset",
  "Burnt Chestnut": "Almond Cream",
  "Almond Cream": "Burnt Chestnut",
};

// Get current theme
function getCurrentTheme(): CodeTheme {
  return codeThemes[state.themeIndex];
}

// Check if theme has a dark/light variant
function hasThemeVariant(themeId: string, isDark: boolean): boolean {
  const pairedThemeId = themePairs[themeId];
  if (!pairedThemeId) return false;

  const pairedTheme = codeThemes.find((t) => t.id === pairedThemeId);
  if (!pairedTheme) return false;

  return pairedTheme.type === (isDark ? "dark" : "light");
}

// Get best theme for dark/light mode
function getThemeForMode(isDark: boolean): number | null {
  const current = getCurrentTheme();

  // If already the right mode, keep it
  if (current.type === (isDark ? "dark" : "light")) return state.themeIndex;

  // Look for paired theme
  const pairedThemeId = themePairs[current.id];
  if (pairedThemeId) {
    const matchIndex = codeThemes.findIndex((t) => t.id === pairedThemeId);
    if (matchIndex >= 0) {
      const pairedTheme = codeThemes[matchIndex];
      // Verify it's the right type
      if (pairedTheme.type === (isDark ? "dark" : "light")) {
        return matchIndex;
      }
    }
  }

  // No variant available
  return null;
}

function isDarkTheme(theme: CodeTheme): boolean {
  return theme.type === "dark";
}

// Escape HTML
function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Initialize Shiki highlighter
async function initHighlighter() {
  try {
    // Dynamic import of Shiki web bundle
    const shiki = await import("shiki");

    // Start with just the default theme and detected language
    highlighter = await shiki.createHighlighter({
      themes: ["github-dark"],
      langs: ["javascript"],
    });

    // Custom theme files to load (mapping filename -> theme name in JSON)
    const customThemeFiles = [
      { file: "serendipity-midnight", name: "Serendipity Midnight" },
      {
        file: "serendipity-midnight-electric",
        name: "Serendipity Midnight Electric",
      },
      { file: "serendipity-sunset", name: "Serendipity Sunset" },
      { file: "serendipity-morning", name: "Serendipity Morning" },
      { file: "sequoia-moonlight", name: "Sequoia Moonlight" },
      { file: "sequoia-monochrome", name: "Sequoia Monochrome" },
      { file: "sequoia-retro", name: "Sequoia Retro" },
      { file: "dark", name: "Astro Dark" },
      { file: "light", name: "Astro Light" },
      { file: "malibu-sunrise", name: "Malibun Sunrise" },
      { file: "malibu-sunset", name: "Malibu Sunset" },
      { file: "bushland", name: "Bushland" },
      { file: "cocoa-almond-cream", name: "Almond Cream" },
      { file: "cocoa-burnt-chestnut", name: "Burnt Chestnut" },
      { file: "relentless-midnight", name: "Titillating Midnight" },
      { file: "relentless-sunset", name: "Titillating Sunset" },
    ];

    // Load custom themes from JSON files
    for (const theme of customThemeFiles) {
      try {
        const response = await fetch(`/themes/${theme.file}.json`);
        if (response.ok) {
          const themeData = await response.json();
          await highlighter.loadTheme(themeData);
        }
      } catch (e) {
        console.warn(`Could not load custom theme: ${theme.name}`, e);
      }
    }

    // Load languages
    const langIds = languages
      .filter((l) => l.id !== "plaintext" && l.id !== "javascript")
      .map((l) => l.id);

    for (const langId of langIds) {
      try {
        await highlighter.loadLanguage(langId);
      } catch (e) {
        console.warn(`Could not load language: ${langId}`, e);
      }
    }

    // Hide loading, show editor
    if (loadingIndicator) loadingIndicator.classList.add("hidden");
    if (editorContainer) {
      editorContainer.classList.remove("hidden");
      editorContainer.style.display = "";
    }

    // Set initial code
    if (codeInput) {
      codeInput.value = state.code;
    }

    state.detectedLanguage = detectLanguage(state.code);
    updateHighlighting();
  } catch (err) {
    console.error("Failed to initialize syntax highlighter:", err);
    if (loadingIndicator) {
      loadingIndicator.innerHTML = `<span class="text-destructive">Failed to load highlighter: ${err instanceof Error ? err.message : "Unknown error"}</span>`;
    }
  }
}

// Update syntax highlighting
function updateHighlighting() {
  if (!highlighter || !codeDisplay) return;

  const lang =
    state.language === "auto" ? state.detectedLanguage : state.language;
  const theme = getCurrentTheme();

  try {
    // Check if this language is loaded, fallback to javascript
    let safeLang = lang;
    try {
      const loaded = highlighter.getLoadedLanguages();
      if (!loaded.includes(lang)) safeLang = "javascript";
    } catch {
      safeLang = "javascript";
    }

    // Get highlighted tokens and build HTML manually to control line numbers
    const tokens = highlighter.codeToTokens(state.code || " ", {
      lang: safeLang,
      theme: theme.id,
    });

    const themeBg = tokens.bg || theme.bg;
    const lineCount = tokens.tokens.length;
    const gutterWidth = String(lineCount).length;

    let codeHtml = "";
    tokens.tokens.forEach((line: any[], i: number) => {
      // Line number
      if (state.showLineNumbers) {
        const num = String(i + 1).padStart(gutterWidth, " ");
        codeHtml += `<span style="color: ${theme.fg}33; user-select: none; display: inline-block; width: ${gutterWidth}ch; margin-right: 1.5em; text-align: right; line-height: 1.5;">${num}</span>`;
      }
      // Tokens
      if (line.length === 0) {
        codeHtml += "\n";
      } else {
        line.forEach((token: any) => {
          const color = token.color || theme.fg;
          codeHtml += `<span style="color: ${color};">${escapeHtml(token.content)}</span>`;
        });
        if (i < tokens.tokens.length - 1) codeHtml += "\n";
      }
    });

    const html = `<pre style="margin:0;padding:0;background:transparent;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-all;max-width:100%;width:100%;box-sizing:border-box;line-height:1.5;"><code style="display:block;max-width:100%;width:100%;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-all;box-sizing:border-box;line-height:1.5;">${codeHtml}</code></pre>`;
    codeDisplay.innerHTML = html;

    // Update card background to match theme
    if (imageCard) {
      imageCard.style.background = themeBg;
    }

    // Update caret color
    if (codeInput) {
      codeInput.style.caretColor = theme.fg;
    }
  } catch {
    const t = getCurrentTheme();
    codeDisplay.innerHTML = `<pre style="margin:0;padding:0;background:transparent;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-all;max-width:100%;width:100%;box-sizing:border-box;line-height:1.5;"><code style="color:${t.fg};display:block;max-width:100%;width:100%;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-all;box-sizing:border-box;line-height:1.5;">${escapeHtml(state.code || " ")}</code></pre>`;
  }
}

// Update theme display
function updateThemeDisplay() {
  const theme = getCurrentTheme();
  if (themeSelect) themeSelect.value = theme.id;
  updateDarkModeToggleState();
  applyBackground(); // Apply background when theme changes
  updateHighlighting();
}

// Update toggle visual for Switch component
function updateToggle(button: HTMLElement | null, active: boolean) {
  if (!button) return;
  button.setAttribute("aria-checked", String(active));
  button.setAttribute("data-state", active ? "checked" : "unchecked");

  const knob = button.querySelector("span");
  if (knob) {
    knob.setAttribute("data-state", active ? "checked" : "unchecked");
  }
}

// Update toggle disabled state for dark mode (enable/disable based on variant availability)
function updateDarkModeToggleState() {
  if (!darkmodeToggle) return;

  const current = getCurrentTheme();
  const targetMode = !state.darkMode; // The mode we'd switch to
  const hasVariant = hasThemeVariant(current.id, targetMode);

  if (hasVariant) {
    darkmodeToggle.removeAttribute("disabled");
    darkmodeToggle.style.opacity = "1";
    darkmodeToggle.style.cursor = "pointer";
  } else {
    darkmodeToggle.setAttribute("disabled", "true");
    darkmodeToggle.style.opacity = "0.5";
    darkmodeToggle.style.cursor = "not-allowed";
  }
}

// Update padding buttons (using Button component with border styling)
function updatePaddingButtons() {
  document.querySelectorAll("[data-padding]").forEach((btn) => {
    const val = parseInt(btn.getAttribute("data-padding") || "0");
    if (val === state.padding) {
      btn.classList.add("border-primary");
      btn.classList.remove("border-input");
    } else {
      btn.classList.remove("border-primary");
      btn.classList.add("border-input");
    }
  });
}

// Apply background - pattern with gradient mask
function applyBackground() {
  if (!imageBackground) return;

  const theme = getCurrentTheme();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const adjustColor = (hex: string, percent: number) => {
    const { r, g, b } = hexToRgb(hex);
    const adjust = (val: number) =>
      Math.max(0, Math.min(255, val + 255 * percent));
    const toHex = (val: number) =>
      Math.round(val).toString(16).padStart(2, "0");
    return `#${toHex(adjust(r))}${toHex(adjust(g))}${toHex(adjust(b))}`;
  };

  const baseColor = theme.bg;
  const isDark = theme.type === "dark";
  const bgColor = isDark
    ? adjustColor(baseColor, 0.02)
    : adjustColor(baseColor, -0.01);
  const maskColor = isDark ? adjustColor(baseColor, 0.08) : bgColor;

  // Light: fade mask earlier so dots are subtler; Dark: let dots show more
  const maskStop = isDark ? "80%" : "50%";

  // For dark mode, use an inverted (white dots) version of the pattern
  const patternFilter = isDark ? "invert(1)" : "none";
  // Overlay to control dot intensity: light = mostly white cover, dark = mostly dark cover
  const overlayColor = isDark ? `rgba(0,0,0,0.6)` : `rgba(255,255,255,0.85)`;

  imageBackground.style.backgroundColor = bgColor;
  imageBackground.style.backgroundImage = `linear-gradient(to top, transparent 0%, ${maskColor} ${maskStop}), linear-gradient(${overlayColor}, ${overlayColor}), url("/pattern.svg")`;
  imageBackground.style.backgroundSize = "100% 100%, auto, auto";
  imageBackground.style.backgroundRepeat = "no-repeat, repeat, repeat";
  imageBackground.style.backgroundPosition = "center center";

  // Invert the pattern for dark themes so dots appear light
  // We need a separate element for this since CSS filter applies to the whole element
  // Instead, dynamically swap the pattern SVG fill via a filter on a child div
  let patternEl = imageBackground.querySelector(
    ".pattern-overlay",
  ) as HTMLElement | null;
  if (!patternEl) {
    patternEl = document.createElement("div");
    patternEl.className = "pattern-overlay";
    patternEl.style.position = "absolute";
    patternEl.style.inset = "0";
    patternEl.style.pointerEvents = "none";
    patternEl.style.zIndex = "0";
    imageBackground.style.position = "relative";
    imageBackground.insertBefore(patternEl, imageBackground.firstChild);
  }

  patternEl.style.backgroundImage = 'url("/pattern.svg")';
  patternEl.style.backgroundSize = "auto";
  patternEl.style.backgroundRepeat = "repeat";
  patternEl.style.filter = patternFilter;
  patternEl.style.opacity = isDark ? "0.3" : "0.15";
  patternEl.style.maskImage = `linear-gradient(to top, black 0%, transparent ${maskStop})`;
  patternEl.style.webkitMaskImage = `linear-gradient(to top, black 0%, transparent ${maskStop})`;

  // Remove the pattern from the main element bg (keep only solid bg color)
  imageBackground.style.backgroundImage = "none";
  imageBackground.style.backgroundSize = "";
  imageBackground.style.backgroundRepeat = "";
}

// Apply padding
function applyPadding() {
  if (!imageBackground) return;
  imageBackground.style.padding = `${state.padding}px`;
}

// Handle code input
function onCodeInput() {
  if (!codeInput) return;

  state.code = codeInput.value;

  if (state.language === "auto") {
    const detected = detectLanguage(state.code);
    if (detected !== state.detectedLanguage) {
      state.detectedLanguage = detected;
    }
  }

  updateHighlighting();
}

// Handle Tab key
function onKeyDown(e: KeyboardEvent) {
  if (e.key === "Tab") {
    e.preventDefault();
    const target = e.target as HTMLTextAreaElement;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    target.value =
      target.value.substring(0, start) + "  " + target.value.substring(end);
    target.selectionStart = target.selectionEnd = start + 2;
    onCodeInput();
  }
}

// Event listeners
function initEventListeners() {
  codeInput?.addEventListener("input", onCodeInput);
  codeInput?.addEventListener("keydown", onKeyDown);

  // Theme select
  themeSelect?.addEventListener("change", () => {
    const idx = codeThemes.findIndex((t) => t.id === themeSelect.value);
    if (idx >= 0) {
      state.themeIndex = idx;
      state.darkMode = isDarkTheme(getCurrentTheme());
      updateToggle(darkmodeToggle, state.darkMode);
      updateDarkModeToggleState();
      updateThemeDisplay();
    }
  });

  // Dark mode toggle (Switch component dispatches 'change' event)
  darkmodeToggle?.addEventListener("change", (e: Event) => {
    const customEvent = e as CustomEvent<{ checked: boolean }>;
    const newDarkMode = customEvent.detail.checked;

    const newThemeIndex = getThemeForMode(newDarkMode);
    if (newThemeIndex !== null) {
      state.darkMode = newDarkMode;
      state.themeIndex = newThemeIndex;
      updateThemeDisplay();
    } else {
      // No variant available, reset the toggle
      e.preventDefault();
      updateToggle(darkmodeToggle, state.darkMode);
    }
  });

  // Line numbers toggle (Switch component dispatches 'change' event)
  linenumbersToggle?.addEventListener("change", (e: Event) => {
    const customEvent = e as CustomEvent<{ checked: boolean }>;
    state.showLineNumbers = customEvent.detail.checked;
    updateHighlighting();
  });

  // Padding
  document.querySelectorAll("[data-padding]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.padding = parseInt(btn.getAttribute("data-padding") || "64");
      updatePaddingButtons();
      applyPadding();
    });
  });

  // Language
  languageSelect?.addEventListener("change", () => {
    state.language = languageSelect.value;
    if (state.language === "auto") {
      state.detectedLanguage = detectLanguage(state.code);
    }
    updateHighlighting();
  });
}

// === Export functions ===

const exportArea = document.getElementById(
  "code-image-export-area",
) as HTMLElement | null;
const toast = document.getElementById("toast") as HTMLElement | null;

function showToast(message: string) {
  if (toast) {
    toast.textContent = message;
    toast.classList.remove("opacity-0");
    toast.classList.add("opacity-100");
    setTimeout(() => {
      toast.classList.remove("opacity-100");
      toast.classList.add("opacity-0");
    }, 2000);
  }
}

// Hide textarea during export so transparent text doesn't interfere
function prepareForExport() {
  const textarea = document.getElementById(
    "code-input",
  ) as HTMLTextAreaElement | null;
  if (textarea) textarea.style.display = "none";
}

function restoreAfterExport() {
  const textarea = document.getElementById(
    "code-input",
  ) as HTMLTextAreaElement | null;
  if (textarea) textarea.style.display = "";
}

// Save as PNG
async function exportPng() {
  if (!exportArea) return;
  try {
    prepareForExport();
    const { toPng } = await import("html-to-image");
    const dataUrl = await toPng(exportArea, { pixelRatio: 2 });
    restoreAfterExport();

    const link = document.createElement("a");
    link.download = "bearnie.dev.png";
    link.href = dataUrl;
    link.click();
    showToast("PNG saved!");
  } catch (err) {
    restoreAfterExport();
    console.error("Failed to export PNG:", err);
    showToast("Export failed");
  }
}

// Save as SVG
async function exportSvg() {
  if (!exportArea) return;
  try {
    prepareForExport();
    const { toSvg } = await import("html-to-image");
    const dataUrl = await toSvg(exportArea);
    restoreAfterExport();

    const link = document.createElement("a");
    link.download = "bearnie.dev.svg";
    link.href = dataUrl;
    link.click();
    showToast("SVG saved!");
  } catch (err) {
    restoreAfterExport();
    console.error("Failed to export SVG:", err);
    showToast("Export failed");
  }
}

// Copy image to clipboard
async function copyImage() {
  if (!exportArea) return;
  try {
    prepareForExport();
    const { toBlob } = await import("html-to-image");
    const blob = await toBlob(exportArea, { pixelRatio: 2 });
    restoreAfterExport();

    if (blob) {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      showToast("Image copied!");
    }
  } catch (err) {
    restoreAfterExport();
    console.error("Failed to copy image:", err);
    showToast("Copy failed");
  }
}

// Copy shareable URL
function copyUrl() {
  try {
    const config = {
      code: state.code,
      lang: state.language,
      theme: codeThemes[state.themeIndex].id,
      pad: state.padding,
      lines: state.showLineNumbers,
    };
    const hash = btoa(encodeURIComponent(JSON.stringify(config)));
    const url = `${window.location.origin}${window.location.pathname}#${hash}`;
    navigator.clipboard.writeText(url);
    showToast("URL copied!");
  } catch (err) {
    console.error("Failed to copy URL:", err);
    showToast("Copy failed");
  }
}

// Format code using Prettier
async function formatCode() {
  if (!codeInput) return;

  const lang =
    state.language === "auto" ? state.detectedLanguage : state.language;

  try {
    const prettier = await import("prettier/standalone");

    // Map language to Prettier parser + plugin
    let parser = "babel";
    let plugin;

    if (["javascript", "jsx"].includes(lang)) {
      plugin = await import("prettier/plugins/babel");
      const estree = await import("prettier/plugins/estree");
      parser = "babel";
      const result = await prettier.format(state.code, {
        parser,
        plugins: [plugin, estree],
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        printWidth: 80,
      });
      applyFormatted(result);
      return;
    }

    if (["typescript", "tsx"].includes(lang)) {
      const ts = await import("prettier/plugins/typescript");
      const estree = await import("prettier/plugins/estree");
      parser = "typescript";
      const result = await prettier.format(state.code, {
        parser,
        plugins: [ts, estree],
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        printWidth: 80,
      });
      applyFormatted(result);
      return;
    }

    if (["html", "astro", "vue", "svelte"].includes(lang)) {
      plugin = await import("prettier/plugins/html");
      parser = "html";
      const result = await prettier.format(state.code, {
        parser,
        plugins: [plugin],
        tabWidth: 2,
        printWidth: 80,
      });
      applyFormatted(result);
      return;
    }

    if (lang === "css" || lang === "scss" || lang === "less") {
      plugin = await import("prettier/plugins/postcss");
      parser = "css";
      const result = await prettier.format(state.code, {
        parser,
        plugins: [plugin],
        tabWidth: 2,
      });
      applyFormatted(result);
      return;
    }

    if (lang === "json") {
      plugin = await import("prettier/plugins/babel");
      const estree = await import("prettier/plugins/estree");
      parser = "json";
      const result = await prettier.format(state.code, {
        parser,
        plugins: [plugin, estree],
        tabWidth: 2,
      });
      applyFormatted(result);
      return;
    }

    if (lang === "markdown" || lang === "mdx") {
      plugin = await import("prettier/plugins/markdown");
      parser = "markdown";
      const result = await prettier.format(state.code, {
        parser,
        plugins: [plugin],
        tabWidth: 2,
        printWidth: 80,
      });
      applyFormatted(result);
      return;
    }

    if (lang === "yaml") {
      plugin = await import("prettier/plugins/yaml");
      parser = "yaml";
      const result = await prettier.format(state.code, {
        parser,
        plugins: [plugin],
        tabWidth: 2,
      });
      applyFormatted(result);
      return;
    }

    // Fallback: basic cleanup for unsupported languages
    let code = state.code;
    code = code.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    code = code
      .split("\n")
      .map((line: string) => line.trimEnd())
      .join("\n");
    code = code.replace(/\n{3,}/g, "\n\n");
    code = code.replace(/^\n+/, "").replace(/\n+$/, "");
    applyFormatted(code);
  } catch (err) {
    console.warn("Prettier formatting failed, applying basic cleanup:", err);
    // Fallback: basic cleanup
    let code = state.code;
    code = code.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    code = code
      .split("\n")
      .map((line: string) => line.trimEnd())
      .join("\n");
    code = code.replace(/\n{3,}/g, "\n\n");
    code = code.replace(/^\n+/, "").replace(/\n+$/, "");
    applyFormatted(code);
  }
}

function applyFormatted(code: string) {
  // Remove trailing newline that Prettier adds
  code = code.replace(/\n$/, "");
  state.code = code;
  if (codeInput) codeInput.value = code;
  updateHighlighting();
}

// Export event listeners
function initExportListeners() {
  document.getElementById("export-png")?.addEventListener("click", exportPng);
  document.getElementById("export-svg")?.addEventListener("click", exportSvg);
  document
    .getElementById("export-copy-image")
    ?.addEventListener("click", copyImage);
  document
    .getElementById("export-copy-url")
    ?.addEventListener("click", copyUrl);
  document
    .getElementById("format-code-btn")
    ?.addEventListener("click", formatCode);
}

// === URL state restoration ===

function restoreFromUrl() {
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const config = JSON.parse(decodeURIComponent(atob(hash)));

    if (config.code) state.code = config.code;
    if (config.lang) state.language = config.lang;
    if (config.theme) {
      const idx = codeThemes.findIndex((t) => t.id === config.theme);
      if (idx >= 0) state.themeIndex = idx;
    }
    if (config.pad) state.padding = config.pad;
    if (typeof config.lines === "boolean") state.showLineNumbers = config.lines;

    state.darkMode = isDarkTheme(getCurrentTheme());
  } catch {
    // Invalid hash, ignore
  }
}

// Initialize
function init() {
  // Set default theme to Astro By Mike Light if not restored from URL
  if (state.themeIndex === -1) {
    const astroLightIndex = codeThemes.findIndex((t) => t.id === "Astro Light");
    state.themeIndex = astroLightIndex >= 0 ? astroLightIndex : 0;
  }

  restoreFromUrl();
  initEventListeners();
  initExportListeners();
  initHighlighter();

  // Apply restored state to UI
  updateToggle(darkmodeToggle, state.darkMode);
  updateToggle(linenumbersToggle, state.showLineNumbers);
  updateDarkModeToggleState();
  updatePaddingButtons();
  applyBackground();
  applyPadding();
  if (themeSelect) themeSelect.value = codeThemes[state.themeIndex].id;
  if (languageSelect) languageSelect.value = state.language;
}

init();
