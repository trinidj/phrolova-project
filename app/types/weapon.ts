export interface StatRange {
  min: number;
  max: number;
}

export interface AscensionMaterial {
  name: string;
  amount: number;
  type?: string;
  icon?: string;
}

export interface AscensionPhase {
  level: string;
  materials: AscensionMaterial[];
}

export interface Weapon {
  id: string;
  name: string;
  rarity: number;
  description: string;
  type: string;
  stats: {
    baseStat: StatRange; 
    mainStat: StatRange;
  }
  ascensionPhases: AscensionPhase[];
}

export interface WeaponAssets {
  icon: string;
  image: string;
}

export function getWeaponAssets(weapon: Weapon): WeaponAssets {
  const basePath = `/assets/weapons/${weapon.id}`;

  return {
    icon: `${basePath}/icon.png`,
    image: `${basePath}/image.png`,
  };
}

export 