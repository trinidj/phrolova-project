import { Resonator, AscensionPhase, SkillAscensionPhase, TalentData, SequenceNode } from '@/app/types/resonator'
import { promises as fs } from 'fs'
import { cache } from 'react'
import path from 'path'
import resonatorsData from '@/app/data/resonators/index.json'

const RESONATORS_DIR = path.join(process.cwd(), 'app', 'data', 'resonators')

interface ResonatorStats {
  id: string
  name: string
  rarity: number
  attribute: string
  weaponType: string
  description: string
  stats: {
    hp: { min: number; max: number }
    atk: { min: number; max: number }
    def: { min: number; max: number }
  }
}

function hasCompleteStats(entry: unknown): entry is ResonatorStats {
  if (!entry || typeof entry !== "object") return false
  const candidate = entry as Partial<ResonatorStats>
  const stats = candidate.stats
  return Boolean(
    stats &&
    stats.hp?.min !== undefined &&
    stats.hp?.max !== undefined &&
    stats.atk?.min !== undefined &&
    stats.atk?.max !== undefined &&
    stats.def?.min !== undefined &&
    stats.def?.max !== undefined
  )
}

type ResonatorVariant = Partial<Resonator> & {
  id?: string
  attribute?: string
  name?: string
  variants?: never
}

function resolveVariantResonator(base: Resonator, variant: ResonatorVariant): Resonator {
  const { variants: _ignored, ...baseResonator } = base as Resonator & { variants?: unknown }
  const attribute = variant.attribute ?? base.attribute
  const name = variant.name ?? `${base.name} (${attribute})`
  const id = variant.id ?? `${base.id}_${attribute.toLowerCase()}`

  return {
    ...baseResonator,
    ...variant,
    id,
    attribute,
    name,
    description: variant.description ?? base.description,
    combatRoles: variant.combatRoles ?? base.combatRoles,
    stats: variant.stats ?? base.stats,
    nation: variant.nation ?? base.nation,
    versionRelease: variant.versionRelease ?? base.versionRelease,
    voiceActors: (variant as Resonator).voiceActors ?? base.voiceActors,
    weaponType: variant.weaponType ?? base.weaponType,
  } as Resonator
}

function resolveResonatorEntries(): Resonator[] {
  return (resonatorsData.resonators as unknown as Resonator[]).flatMap((entry) => {
    const variants = (entry as Resonator & { variants?: ResonatorVariant[] }).variants
    if (!variants || variants.length === 0) {
      return entry
    }

    const { variants: _ignored, ...baseResonator } = entry as Resonator & { variants?: unknown }
    const resolvedVariants = variants.map((variant) => resolveVariantResonator(baseResonator as Resonator, variant))

    return [baseResonator as Resonator, ...resolvedVariants]
  })
}

const RESOLVED_RESONATORS = resolveResonatorEntries()

/**
 * Get all resonator IDs from the index.json file
 */
export async function getAllResonatorIds(): Promise<string[]> {
  return RESOLVED_RESONATORS.map(r => r.id)
}

/**
 * Get basic stats for a resonator from index.json
 */
export async function getResonatorStats(id: string): Promise<ResonatorStats | null> {
  const resonator = RESOLVED_RESONATORS.find((r) => r.id === id)
  if (!resonator || !hasCompleteStats(resonator)) return null
  return resonator
}

/**
 * Normalize markdown by handling line endings and removing the main title
 */
function normalizeMarkdown(markdown: string): string {
  // Normalize line endings to \n (handle both Unix \n and Windows \r\n)
  const normalizedMarkdown = markdown.replace(/\r\n/g, '\n')
  // Remove the main title (h1) if it exists at the start
  return normalizedMarkdown.replace(/^#\s+.+?\n\n?/m, '').trim()
}

/**
 * Get talents markdown content for a resonator
 */
export const getResonatorTalents = cache(async (id: string): Promise<string | null> => {
  const roverAttribute = (() => {
    if (!id.startsWith('rover')) return null
    const resonator = RESOLVED_RESONATORS.find(r => r.id === id)
    return (resonator?.attribute ?? id.split('_')[1])?.toLowerCase() ?? null
  })()

  const paths = [
    roverAttribute ? path.join(RESONATORS_DIR, 'rover', roverAttribute, 'talents.md') : null,
    path.join(RESONATORS_DIR, id, 'talents.md')
  ].filter((p): p is string => Boolean(p))

  for (const talentsPath of paths) {
    try {
      return await fs.readFile(talentsPath, 'utf-8')
    } catch {
      // It's okay if talents.md doesn't exist in this location
    }
  }

  return null
})

/**
 * Get sequence nodes (resonance chains) markdown content for a resonator
 */
export const getResonatorSequenceNodes = cache(async (id: string): Promise<string | null> => {
  try {
    const sequenceNodesPath = path.join(RESONATORS_DIR, id, 'sequence-nodes.md')
    return await fs.readFile(sequenceNodesPath, 'utf-8')
  } catch {
    // It's okay if sequence-nodes.md doesn't exist
    return null
  }
})

/**
 * Get ascension data for a resonator
 */
export const getResonatorAscension = cache(async (id: string): Promise<AscensionPhase[] | null> => {
  try {
    const ascensionPath = path.join(RESONATORS_DIR, id, 'ascension.json')
    const content = await fs.readFile(ascensionPath, 'utf-8')
    return JSON.parse(content)
  } catch {
    // It's okay if ascension.json doesn't exist
    return null
  }
})

/**
 * Get skill ascension data for a resonator
 */
export const getResonatorSkillAscension = cache(async (id: string): Promise<SkillAscensionPhase[] | null> => {
  try {
    const skillAscensionPath = path.join(RESONATORS_DIR, id, 'skill-ascension.json')
    const content = await fs.readFile(skillAscensionPath, 'utf-8')
    return JSON.parse(content)
  } catch {
    // It's okay if skill-ascension.json doesn't exist
    return null
  }
})

/**
 * Parse talents markdown into structured data
 * This function extracts talent information from the markdown format
 */
export function parseTalentsMarkdown(markdown: string): Record<string, TalentData> {
  const talents: Record<string, TalentData> = {}

  // Normalize markdown content
  const content = normalizeMarkdown(markdown)

  // Split by horizontal rules (---) to get major sections
  const sections = content.split(/\n---\n/).filter(Boolean)

  for (const section of sections) {
    const trimmedSection = section.trim()

    // Check if it starts with ##
    const headerMatch = trimmedSection.match(/^##\s+(.+?)(?::\s*(.+))?$/m)
    if (!headerMatch) continue

    const [, type, name] = headerMatch

    // Extract description (everything after the header)
    const descriptionStart = trimmedSection.indexOf('\n') + 1
    const description = trimmedSection.substring(descriptionStart).trim()

    // Handle special cases for Inherent Skills section
    if (type === 'Inherent Skills') {
      // Parse individual inherent skills using h3 headers (###)
      const inheritSkillMatches = description.matchAll(/###\s+(.+?)\n([\s\S]*?)(?=###|$)/g)
      let inheritIndex = 1
      for (const match of inheritSkillMatches) {
        const [, skillName, skillDesc] = match
        talents[`inheritSkill${inheritIndex}`] = {
          name: skillName,
          type: 'Inherent Skill',
          description: skillDesc.trim()
        }
        inheritIndex++
      }
      continue
    }

    // Convert type to camelCase key
    let key = type.toLowerCase().replace(/\s+/g, '')

    // Map to expected talent keys
    const keyMap: Record<string, string> = {
      'normalattack': 'normalAttack',
      'resonanceskill': 'resonanceSkill',
      'resonanceliberation': 'resonanceLiberation',
      'fortecircuit': 'forteCircuit',
      'introskill': 'introSkill',
      'outroskill': 'outroSkill'
    }

    key = keyMap[key] || key

    talents[key] = { name, type, description }
  }

  return talents
}

/**
 * Parse sequence nodes (resonance chain) markdown into structured data
 * This function extracts sequence node information from the markdown format
 */
export function parseSequenceNodesMarkdown(markdown: string): SequenceNode[] {
  const sequenceNodes: SequenceNode[] = []

  // Normalize markdown content
  const content = normalizeMarkdown(markdown)

  // Match all sequence node sections (## Sequence Node N: Name)
  const nodePattern = /##\s+Sequence Node \d+:\s+(.+?)\n\n([\s\S]*?)(?=##\s+Sequence Node|$)/g
  const matches = content.matchAll(nodePattern)

  for (const match of matches) {
    const [, name, description] = match
    sequenceNodes.push({
      name: name.trim(),
      description: description.trim()
    })
  }

  return sequenceNodes
}

/**
 * Get a complete resonator object with all data
 */
export async function getResonator(id: string): Promise<Resonator | null> {
  const stats = await getResonatorStats(id)
  if (!stats) return null

  const talentsMarkdown = await getResonatorTalents(id)
  const talents = talentsMarkdown ? parseTalentsMarkdown(talentsMarkdown) : undefined

  return {
    ...stats,
    talents,
  } as Resonator
}

/**
 * Get all resonators
 */
export async function getAllResonators(): Promise<Resonator[]> {
  const ids = await getAllResonatorIds()
  const resonators = await Promise.all(
    ids.map(id => getResonator(id))
  )
  return resonators.filter((r): r is Resonator => r !== null)
}

/**
 * Get a resonator by name (case-insensitive)
 */
export async function getResonatorByName(name: string): Promise<Resonator | null> {
  const nameLower = name.toLowerCase()

  // Fast path: get base data directly from index.json without loading all resonators
  const resolved = RESOLVED_RESONATORS.find(r => r.name.toLowerCase() === nameLower)
  if (!resolved) return null

  // Load talents lazily for this single resonator
  const talentsMarkdown = await getResonatorTalents(resolved.id)
  const talents = talentsMarkdown ? parseTalentsMarkdown(talentsMarkdown) : undefined

  return { ...(resolved as Resonator), talents }
}
