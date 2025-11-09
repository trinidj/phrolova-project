import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Attribute } from "@/app/types/resonator"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Check if a material is a boss material based on naming patterns
 * Boss materials typically have longer, unique names
 */
function isBossMaterial(materialName: string): boolean {
  // Boss materials are typically longer names with specific patterns
  // You can expand this list as needed
  const bossMaterialKeywords = [
    'Crown', 'Bone', 'Core', 'Shard', 'Fragment',
    'Heart', 'Scale', 'Fang', 'Claw', 'Eye', 'Puppet King'
  ];

  return bossMaterialKeywords.some(keyword =>
    materialName.includes(keyword)
  );
}

/**
 * Get the asset path for a material based on its name
 */
export function getMaterialAssetPath(materialName: string): string {
  if (isBossMaterial(materialName)) {
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
 * Get inline style object for attribute color
 */
export function getAttributeColorStyle(attribute: Attribute | string): React.CSSProperties {
  return { color: getAttributeColor(attribute) }
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
