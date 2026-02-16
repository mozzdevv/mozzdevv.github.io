// Icon library options for the dropdown
export const iconLibraryOptions = [
  { name: "Lucide", value: "lucide" },
  { name: "Tabler Icons", value: "tabler" },
  { name: "Carbon", value: "carbon" },
  { name: "Solar", value: "solar" },
];

// Icon library package names (used for CLI commands)
export const iconLibraryPackages: Record<string, string> = {
  lucide: "@lucide/astro",
  tabler: "@tabler/icons-react",
  carbon: "@carbon/icons-react",
  solar: "solar-icon-set",
};
