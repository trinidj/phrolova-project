export type Attribute = "Fusion" | "Aero" | "Glacio" | "Havoc" | "Electro" | "Spectro";
export type WeaponType = "Pistol" | "Sword" | "Broadblade" | "Rectifier" | "Gauntlet";
export type Rarity = 4 | 5;

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

export interface SkillAscensionPhase {
  level: number;
  materials: AscensionMaterial[];
}

export interface TalentScaling {
  level: number;
  [key: string]: number; 
}

export interface Talent {
  name: string;
  type: string;
  description: string;
  icon?: string;
  scaling?: TalentScaling[];
}

export interface TalentData {
  name: string;
  type: string;
  description?: string;
}

export interface SequenceNode {
  name: string;
  description?: string;
}

export interface Resonator {
  id: string;
  name: string;
  rarity: Rarity;
  attribute: Attribute;
  weaponType: WeaponType;
  isNew?: boolean;
  description: string;
  stats: {
    hp: StatRange;
    atk: StatRange;
    def: StatRange;
  };
  talents?: {
    normalAttack?: Talent;
    resonanceSkill?: Talent;
    resonanceLiberation?: Talent;
    forteCircuit?: Talent;
    introSkill?: Talent;
    outroSkill?: Talent;
    inheritSkill1?: Talent;
    inheritSkill2?: Talent;
  };
  sequenceNodes?: SequenceNode[];
  ascension?: AscensionPhase[];
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
    Broadblade: "Broadblade_Icon.png",
    Rectifier: "Rectifier_Icon.png",
    Gauntlet: "Gauntlets_Icon.png",
  };

  return {
    image: `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/icon.png`,
    sprite: `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/sprite.png`,
    attribute: `/assets/attributes/${resonator.attribute}.png`,
    weaponType: `/assets/weapons/${weaponIconMap[resonator.weaponType]}`,
  };
}

export interface ResonatorSkillAssets {
  normalAttack?: string;
  resonanceSkill?: string;
  resonanceLiberation?: string;
  forteCircuit?: string;
  inheritSkill1?: string;
  inheritSkill2?: string;
  introSkill?: string;
  outroSkill?: string
}

/**
 * Get all skill/talent asset URLs for a resonator based on naming conventions
 */
export function getResonatorSkillAssets(resonator: Resonator): ResonatorSkillAssets {
  return {
    normalAttack: `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/normal_attack.png`,
    resonanceSkill: `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/resonance_skill.png`,
    resonanceLiberation: `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/resonance_liberation.png`,
    forteCircuit: `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/forte_circuit.png`,
    inheritSkill1: `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/inherit_skill_1.png`,
    inheritSkill2: `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/inherit_skill_2.png`,
    introSkill: `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/intro_skill.png`,
    outroSkill: `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/outro_skill.png`
  }
}

export interface SequenceNodeAssets {
  sequenceNode1?: string;
  sequenceNode2?: string;
  sequenceNode3?: string;
  sequenceNode4?: string;
  sequenceNode5?: string;
  sequenceNode6?: string;
}

/**
 * Get all sequence node asset URLs for a resonator based on naming conventions
 */
export function getSequenceNodeAssets(resonator: Resonator): SequenceNodeAssets {
  return {
    sequenceNode1: `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/node_1.png`,
    sequenceNode2: `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/node_2.png`,
    sequenceNode3: `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/node_3.png`,
    sequenceNode4: `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/node_4.png`,
    sequenceNode5: `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/node_5.png`,
    sequenceNode6: `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/node_6.png`
  }
}

/**
 * Calculate stat value at a given level (1-90)
 */
export function calculateStat(statRange: StatRange, level: number): number {
  const { min, max } = statRange;
  const value = min + ((level - 1) * (max - min)) / 89;
  return Math.round(value);
}
