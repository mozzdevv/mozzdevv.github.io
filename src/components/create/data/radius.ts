// Radius options for the dropdown
export const radiusOptions = [
  { name: "None", value: "0" },
  { name: "Small", value: "0.375" },
  { name: "Default", value: "0.5" },
  { name: "Medium", value: "0.625" },
  { name: "Large", value: "0.75" },
];

// Map value to display name (for label updates)
export const radiusNames: Record<string, string> = {
  '0': 'None',
  '0.375': 'Small',
  '0.5': 'Default',
  '0.625': 'Medium',
  '0.75': 'Large'
};
