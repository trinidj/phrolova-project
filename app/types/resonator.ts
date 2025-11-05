export type Attribute = "Fusion" | "Aero" | "Glacio" | "Havoc" | "Electro" | "Spectro";
export type WeaponType = "Pistol" | "Sword" | "Broadblade" | "Rectifier" | "Gauntlet";
export type Rarity = 4 | 5;

export interface StatRange {
  min: number;
  max: number;
}

export interface Resonator {
  id: string;
  name: string;
  rarity: Rarity;
  attribute: Attribute;
  weaponType: WeaponType;
  description: string;
  stats: {
    hp: StatRange;
    atk: StatRange;
    def: StatRange;
  };
}

export interface ResonatorAssets {
  image: string;
  sprite: string;
  attribute: string;
  weaponType: string;
}

/**
 * Get all asset URLs for a resonator based on naming conventions
 */
export function getResonatorAssets(resonator: Resonator): ResonatorAssets {
  const weaponIconMap: Record<WeaponType, string> = {
    Pistol: "Pistols_Icon.png",
    Sword: "Sword_Icon.png",
    Broadblade: "Broadblade_icon.png",
    Rectifier: "Rectifier_Icon.png",
    Gauntlet: "Gauntlets_Icon.png",
  };

  return {
    image: `/assets/resonators/${resonator.name}/${resonator.name}.png`,
    sprite: `/assets/resonators/${resonator.name}/sprite.png`,
    attribute: `/assets/attributes/${resonator.attribute}.png`,
    weaponType: `/assets/weapons/${weaponIconMap[resonator.weaponType]}`,
  };
}

/**
 * Calculate stat value at a given level (1-90)
 */
export function calculateStat(statRange: StatRange, level: number): number {
  const { min, max } = statRange;
  const value = min + ((level - 1) * (max - min)) / 89;
  return Math.round(value);
}
