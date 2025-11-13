import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Attribute } from "@/app/types/resonator"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the asset path for a material based on its name and type
 */
export function getMaterialAssetPath(materialName: string, materialType?: string): string {
  if (materialType === 'boss') {
    // Boss materials are in a subdirectory
    return `/assets/materials/boss/${materialName.replace(/\s+/g, '_')}.png`;
  }

  // Convert material name to lowercase filename format
  // Example: "Luminous Calendula" -> "luminous_calendula.png"
  const filename = materialName.toLowerCase().replace(/\s+/g, '_') + '.png';
  return `/assets/materials/${filename}`;
}

/**
 * Attribute color mapping using CSS custom properties from globals.css
 */
export const ATTRIBUTE_COLORS: Record<Attribute, string> = {
  Electro: 'var(--electro)',
  Fusion: 'var(--fusion)',
  Havoc: 'var(--havoc)',
  Glacio: 'var(--glacio)',
  Aero: 'var(--aero)',
  Spectro: 'var(--spectro)',
}

/**
 * Get the color for a specific attribute
 */
export function getAttributeColor(attribute: Attribute | string): string {
  return ATTRIBUTE_COLORS[attribute as Attribute] || 'var(--foreground)'
}

/**
 * Get inline style object for attribute background with opacity
 */
export function getAttributeBackgroundStyle(
  attribute: Attribute | string,
  opacity: number = 0.1
): React.CSSProperties {
  const color = getAttributeColor(attribute)
  // Use color-mix to apply opacity
  return {
    backgroundColor: `color-mix(in srgb, ${color} ${opacity * 100}%, transparent)`
  }
}
