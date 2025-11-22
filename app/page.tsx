import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col items-center gap-6">
        <div className="rounded-full bg-muted p-2">
          <Image 
            src="/assets/site_icon.png"
            alt="Phrolova Project"
            width={128}
            height={128}
            className="object-contain"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold">Phrolova Project</h1>
          <p className="text-xl text-muted-foreground text-center w-3xl">
            Phrolova is an unofficial Wuthering Waves database and tools site, offering clear stats, builds, and resources to help you optimize your resonators and teams.
          </p>
        </div>
      </header>
    </div>
  )
}
