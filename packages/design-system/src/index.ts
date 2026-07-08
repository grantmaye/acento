export const colors = {
  ink: "#171412",
  paper: "#faf8f4",
  surface: "#ffffff",
  night: "#0f1115",
  nightSurface: "#171a21",
  sienna: "#a6532f",
  plantain: "#f0c95a",
  sea: "#2c7a7b",
  guava: "#d96b6b",
  border: "#e7dfd4",
  muted: "#6f6860",
} as const;

export const spacing = {
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
} as const;

export const radii = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  full: "999px",
} as const;

export const typography = {
  sans: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  display: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "SFMono-Regular, ui-monospace, Menlo, Monaco, Consolas, monospace",
} as const;

export const motion = {
  quick: "140ms cubic-bezier(0.2, 0, 0, 1)",
  smooth: "240ms cubic-bezier(0.2, 0, 0, 1)",
  expressive: "420ms cubic-bezier(0.16, 1, 0.3, 1)",
} as const;
