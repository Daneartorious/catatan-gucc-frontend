export function getCategoryColor(id: number | null): {
  bg: string;
  text: string;
  border: string;
  dot: string;
} {
  if (id === null) {
    return {
      bg: "bg-[#eef0f3]",
      text: "text-[#5b616e]",
      border: "border-[#dee1e6]",
      dot: "bg-[#5b616e]",
    };
  }

  const palettes = [
    {
      bg: "bg-[#eef1f9]",
      text: "text-[#1b2f6b]",
      border: "border-[#dee1e6]",
      dot: "bg-[#1b2f6b]",
    },
    {
      bg: "bg-[#eaf2fc]",
      text: "text-[#2a78d6]",
      border: "border-[#d0e2fa]",
      dot: "bg-[#2a78d6]",
    },
    {
      bg: "bg-[#fdf0ea]",
      text: "text-[#eb6834]",
      border: "border-[#fadcd0]",
      dot: "bg-[#eb6834]",
    },
    {
      bg: "bg-[#eaf7f2]",
      text: "text-[#1baf7a]",
      border: "border-[#d0eee2]",
      dot: "bg-[#1baf7a]",
    },
  ];

  return palettes[Math.abs(id) % palettes.length];
}

export function truncateText(text: string, maxLength: number = 100): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export function calculateReadTime(text: string): string {
  if (!text) return "1 mnt baca";
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 150);
  return `${minutes} mnt baca`;
}
