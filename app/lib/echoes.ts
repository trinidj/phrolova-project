import echoesData from "@/app/data/echoes/index.json"

export type Echo = {
  id: string
  name: string
  sonataIds: string[]
  rarity?: string
}

export async function getAllEchoes(): Promise<Echo[]> {
  // echoesData is a JSON object with an `echoes` array
  // keep this simple and synchronous-friendly for server components
  return (echoesData as any).echoes || []
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
