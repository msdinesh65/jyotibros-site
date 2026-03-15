/**
 * Infer color label and Tailwind dot class from an image path/filename.
 * Use when CSV "Color" is blank – e.g. "2026_1001-blue.jpg" → { id: "blue", label: "Blue", colorDotClass: "bg-blue-500" }.
 */

const COLOR_MAP: Record<string, { label: string; colorDotClass: string }> = {
  blue: { label: "Blue", colorDotClass: "bg-blue-500" },
  green: { label: "Green", colorDotClass: "bg-emerald-500" },
  red: { label: "Red", colorDotClass: "bg-red-500" },
  yellow: { label: "Yellow", colorDotClass: "bg-amber-400" },
  pink: { label: "Pink", colorDotClass: "bg-rose-500" },
  black: { label: "Black", colorDotClass: "bg-slate-800" },
  white: { label: "White", colorDotClass: "bg-slate-100" },
  maroon: { label: "Maroon", colorDotClass: "bg-rose-700" },
  navy: { label: "Navy", colorDotClass: "bg-blue-900" },
  orange: { label: "Orange", colorDotClass: "bg-orange-500" },
  purple: { label: "Purple", colorDotClass: "bg-purple-500" },
  grey: { label: "Grey", colorDotClass: "bg-slate-500" },
  gray: { label: "Grey", colorDotClass: "bg-slate-500" },
  brown: { label: "Brown", colorDotClass: "bg-amber-800" },
  beige: { label: "Beige", colorDotClass: "bg-amber-100" },
  sky: { label: "Sky", colorDotClass: "bg-sky-300" },
  lime: { label: "Lime", colorDotClass: "bg-lime-500" },
  dusty: { label: "Dusty", colorDotClass: "bg-slate-400" },
  rose: { label: "Rose", colorDotClass: "bg-rose-400" },
  amber: { label: "Amber", colorDotClass: "bg-amber-400" },
  emerald: { label: "Emerald", colorDotClass: "bg-emerald-500" },
};

/** Extract color id from path: .../2026_1001-blue.jpg → blue, .../suit-red.png → red */
export function colorIdFromImagePath(imagePath: string): string {
  const base = imagePath.split("/").pop() ?? imagePath;
  const nameWithoutExt = base.replace(/\.(jpg|jpeg|png|webp)$/i, "");
  const lower = nameWithoutExt.toLowerCase();
  for (const key of Object.keys(COLOR_MAP)) {
    if (lower.endsWith(`-${key}`) || lower.includes(`-${key}.`)) return key;
  }
  const parts = nameWithoutExt.split(/[-_.]/);
  const last = parts[parts.length - 1]?.toLowerCase();
  if (last && COLOR_MAP[last]) return last;
  return "default";
}

/** Get label and Tailwind class for a color id (from CSV or from colorIdFromImagePath). */
export function getColorLabelAndClass(
  colorIdOrLabel: string
): { id: string; label: string; colorDotClass: string } {
  const key = colorIdOrLabel.toLowerCase().replace(/\s+/g, "-");
  const mapped = COLOR_MAP[key];
  if (mapped) {
    return { id: key, label: mapped.label, colorDotClass: mapped.colorDotClass };
  }
  const label =
    colorIdOrLabel.charAt(0).toUpperCase() + colorIdOrLabel.slice(1).toLowerCase();
  return { id: key, label, colorDotClass: "bg-slate-400" };
}

/** If colorFromCsv is blank, infer from image path; otherwise use CSV value. */
export function resolveVariantColor(
  imagePath: string,
  colorFromCsv: string | undefined
): { id: string; label: string; colorDotClass: string } {
  if (colorFromCsv?.trim()) {
    return getColorLabelAndClass(colorFromCsv.trim());
  }
  const id = colorIdFromImagePath(imagePath);
  return getColorLabelAndClass(id);
}
