import { promises as fs } from 'fs'
import { cache } from 'react'
import path from 'path'
import sonatasData from '@/app/data/sonatas/index.json'

const SONATAS_DIR = path.join(process.cwd(), 'app', 'data', 'sonatas')

export interface SonataMetadata {
  id: string
  name: string
  icon: string
  descriptionPath: string
}

export interface Sonata extends SonataMetadata {
  description: string
}

/**
 * Get all sonata IDs from the index.json file
 */
export async function getAllSonataIds(): Promise<string[]> {
  return sonatasData.map(s => s.id)
}

/**
 * Get all sonata metadata
 */
export async function getAllSonatasMetadata(): Promise<SonataMetadata[]> {
  return sonatasData
}

/**
 * Get sonata description markdown content
 */
export const getSonataDescription = cache(async (id: string): Promise<string | null> => {
  try {
    const descriptionPath = path.join(SONATAS_DIR, id, 'description.md')
    return await fs.readFile(descriptionPath, 'utf-8')
  } catch {
    // It's okay if description.md doesn't exist
    return null
  }
})

/**
 * Get a complete sonata object with all data
 */
export async function getSonata(id: string): Promise<Sonata | null> {
  const metadata = sonatasData.find(s => s.id === id)
  if (!metadata) return null

  const description = await getSonataDescription(id)
  if (!description) return null

  return {
    ...metadata,
    description
  }
}

/**
 * Get all sonatas with descriptions
 */
export async function getAllSonatas(): Promise<Sonata[]> {
  const ids = await getAllSonataIds()
  const sonatas = await Promise.all(
    ids.map(id => getSonata(id))
  )
  return sonatas.filter((s): s is Sonata => s !== null)
}

/**
 * Get a sonata by name (case-insensitive)
 */
export async function getSonataByName(name: string): Promise<Sonata | null> {
  const metadata = sonatasData.find(s => s.name.toLowerCase() === name.toLowerCase())
  if (!metadata) return null

  const description = await getSonataDescription(metadata.id)
  if (!description) return null

  return {
    ...metadata,
    description
  }
}
