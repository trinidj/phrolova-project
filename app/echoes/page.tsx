import { getAllSonatas } from "@/app/lib/sonatas"
import { getAllEchoes } from "@/app/lib/echoes"
import EchoesExplorer from "@/components/echoes-explorer"

export default async function EchoesPage() {
  const sonatas = await getAllSonatas()
  const echoes = await getAllEchoes()

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">Echoes</h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">Browse all Sonata effects in Wuthering Waves with their set bonuses and specifications.</p>
        </div>
      </header>

      <main>
        <EchoesExplorer sonatas={sonatas} echoes={echoes} />
      </main>
    </div>
  )
}