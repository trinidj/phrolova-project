import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Sword } from "lucide-react"
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

      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/resonators">
          <Card className="transition-all hover:border-primary cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Resonators</CardTitle>
              </div>
              <CardDescription>
                Browse all characters, their stats, talents, and ascension materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">
                View Resonators
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Card className="opacity-50 h-full">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Sword className="w-6 h-6 text-muted-foreground" />
              </div>
              <CardTitle>Weapons</CardTitle>
            </div>
            <CardDescription>
              Weapons database coming soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
