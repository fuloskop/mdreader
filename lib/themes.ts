export interface Theme {
  id: string;
  name: string;
  icon: string;
  category: "light" | "dark";
  bg: string;
  text: string;
  heading: string;
  muted: string;
  link: string;
  codeBg: string;
  border: string;
  // prose extras
  preBorder: string;
  blockquoteBg: string;
  blockquoteBorder: string;
  tableHeadBg: string;
}

export const themes: Theme[] = [
  {
    id: "paper",
    name: "Paper White",
    icon: "☀️",
    category: "light",
    bg: "#FAFAFA",
    text: "#1A1A2E",
    heading: "#0F0F1A",
    muted: "#6B7280",
    link: "#2563EB",
    codeBg: "#F0F0F5",
    border: "#E2E4E9",
    preBorder: "#E2E4E9",
    blockquoteBg: "#F5F5FA",
    blockquoteBorder: "#D0D4E0",
    tableHeadBg: "#F0F0F5",
  },
  {
    id: "sepia",
    name: "Sepia",
    icon: "📜",
    category: "light",
    bg: "#FBF0D9",
    text: "#5C4B37",
    heading: "#3E2F20",
    muted: "#8B7355",
    link: "#7C4D1A",
    codeBg: "#F0E4C8",
    border: "#E6D5B8",
    preBorder: "#E6D5B8",
    blockquoteBg: "#F5EBD4",
    blockquoteBorder: "#D4C09A",
    tableHeadBg: "#F0E4C8",
  },
  {
    id: "sage",
    name: "Sage",
    icon: "🌿",
    category: "light",
    bg: "#EEF1E6",
    text: "#37422A",
    heading: "#2A331F",
    muted: "#6B7A5E",
    link: "#4A6741",
    codeBg: "#E2E8D5",
    border: "#CDD5BC",
    preBorder: "#CDD5BC",
    blockquoteBg: "#E5EAD9",
    blockquoteBorder: "#B5C09A",
    tableHeadBg: "#E2E8D5",
  },
  {
    id: "soft-dark",
    name: "Soft Dark",
    icon: "🌙",
    category: "dark",
    bg: "#1A1B23",
    text: "#CDD5E0",
    heading: "#E4E8EF",
    muted: "#8891A0",
    link: "#7DAED4",
    codeBg: "#22242E",
    border: "#2E3140",
    preBorder: "#2E3140",
    blockquoteBg: "#20222C",
    blockquoteBorder: "#3A4058",
    tableHeadBg: "#22242E",
  },
  {
    id: "oled",
    name: "OLED Dark",
    icon: "⚫",
    category: "dark",
    bg: "#000000",
    text: "#D4D4D4",
    heading: "#E8E8E8",
    muted: "#7A7A7A",
    link: "#6DB3F2",
    codeBg: "#111111",
    border: "#222222",
    preBorder: "#222222",
    blockquoteBg: "#0A0A0A",
    blockquoteBorder: "#333333",
    tableHeadBg: "#111111",
  },
  {
    id: "dusk",
    name: "Dusk",
    icon: "🌅",
    category: "dark",
    bg: "#1C1917",
    text: "#D6CEBF",
    heading: "#E8E0D0",
    muted: "#8C8478",
    link: "#C4915C",
    codeBg: "#252119",
    border: "#33302A",
    preBorder: "#33302A",
    blockquoteBg: "#221F19",
    blockquoteBorder: "#4A4238",
    tableHeadBg: "#252119",
  },
];

export function getTheme(id: string): Theme {
  return themes.find((t) => t.id === id) ?? themes[0];
}
