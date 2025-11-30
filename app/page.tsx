import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const sections = [
    {
      title: "Resonators",
      href: "/resonators",
      icon: "/assets/resonators_icon.png",
      alt: "Resonators Icon",
    },
    {
      title: "Weapons",
      href: "/weapons",
      icon: "/assets/weapons_icon.png",
      alt: "Weapons Icon",
    },
    {
      title: "Echoes",
      href: "/echoes",
      icon: "/assets/echoes_icon.png",
      alt: "Echoes Icon",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-20 px-4 py-12 text-center sm:px-6 lg:px-8">
        <header className="flex flex-col items-center gap-6">
          <div className="rounded-full bg-muted/60 p-3 shadow-sm">
            <Image
              src="/assets/site_icon.png"
              alt="Phrolova Project"
              width={128}
              height={128}
              sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
              className="h-24 w-24 object-contain sm:h-28 sm:w-28 md:h-32 md:w-32"
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Phrolova Project
            </h1>
            <p className="max-w-3xl text-base text-muted-foreground sm:text-lg md:text-xl">
              Phrolova is an unofficial Wuthering Waves database and tools site,
              offering clear stats, builds, and resources to help you optimize
              your resonators and teams.
            </p>
          </div>
        </header>

        <main className="flex justify-center w-full max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group size-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Card className="items-center text-center transition p-4 hover:-translate-y-1 hover:shadow-md">
                <CardContent className="flex flex-col items-center gap-3 p-0">
                  <Image
                    src={section.icon}
                    alt={section.alt}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                  <CardTitle className="text-lg font-semibold w-40">
                    {section.title}
                  </CardTitle>
                </CardContent>
              </Card>
            </Link>
          ))}
        </main>
      </div>
    </div>
  )
}
