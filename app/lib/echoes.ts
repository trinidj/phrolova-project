import echoesData from "@/app/data/echoes/index.json"

export type Echo = {
  id: string
  name: string
  sonataIds: string[]
  rarity?: string
  icon?: string
}

export async function getAllEchoes(): Promise<Echo[]> {
  // echoesData may be one of multiple shapes:
  // 1) { echoes: [ ... ] } (flat array, legacy)
  // 2) { echoes: { cost_1: [...], cost_3: [...], cost_4: [...] } } (grouped by rarity)
  // Additionally, a top-level `categories` map may exist for alternate rarity mapping.
  const data = echoesData as any

  // build id -> rarity map from categories (if present)
  const rarityMap: Record<string, string> = {}
  if (data.categories) {
    for (const [rarity, ids] of Object.entries(data.categories)) {
      if (Array.isArray(ids)) {
        ids.forEach((id) => {
          rarityMap[id] = rarity
        })
      }
    }
  }

  const out: Echo[] = []

  // handle flat-array shape
  if (Array.isArray(data.echoes)) {
    data.echoes.forEach((e: Echo) => {
      out.push({
        ...e,
        rarity: e.rarity ?? rarityMap[e.id],
      })
    })
  } else if (data.echoes && typeof data.echoes === "object") {
    // grouped shape: keys are rarity names, values are arrays of echoes
    for (const [rarityKey, list] of Object.entries(data.echoes)) {
      if (!Array.isArray(list)) continue
      list.forEach((e: Echo) => {
        out.push({
          ...e,
          rarity: e.rarity ?? rarityMap[e.id] ?? rarityKey,
        })
      })
    }
  }

  return out
}

export async function getEchoesBySonataId(sonataId: string): Promise<Echo[]> {
  const echoes = await getAllEchoes()
  return echoes.filter((e) => e.sonataIds?.includes(sonataId))
}

export async function getEchoById(id: string): Promise<Echo | undefined> {
  const echoes = await getAllEchoes()
  return echoes.find((e) => e.id === id)
}

export default {
  getAllEchoes,
  getEchoesBySonataId,
  getEchoById,
}
