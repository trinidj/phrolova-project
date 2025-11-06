import { Resonator, getResonatorAssets } from "@/app/types/resonator"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

import LevelSlider from "./LevelSlider"

interface ProfileSectionProps {
  resonator: Resonator
}

export default function ProfileSection({ resonator }: ProfileSectionProps) {
  const assets = getResonatorAssets(resonator)

  return (
    <section id="profile" className="relative flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* Left Side: Profile Info */}
      <div className="flex flex-col gap-4 sm:gap-6 shrink-0">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Image
              alt={resonator.attribute}
              src={assets.attribute}
              width={500}
              height={500}
              className="size-12 sm:size-16"
            />

            <Separator orientation="vertical" className="hidden sm:block" />

            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-2xl sm:text-3xl">{resonator.name}</h1>
              <p className="text-muted-foreground font-medium text-sm sm:text-base">
                {resonator.description}
              </p>
            </div>
          </div>

          <div className="w-32 sm:w-40 flex items-center">
            <Image
              alt={`${resonator.rarity}-star`}
              src={`/assets/rarity/${resonator.rarity}_star.png`}
              width={160}
              height={40}
              className="w-full h-auto"
            />
          </div>
        </div>

        <Card className="w-full lg:w-lg h-fit">
          <CardContent className="flex flex-col gap-1">
            <LevelSlider resonator={resonator} />


          </CardContent>
        </Card>
      </div>

      {/* Right Side: Character Sprite */}
      <div className="flex-1 flex justify-center lg:justify-end">
        <Image
          alt={`${resonator.name} sprite`}
          src={assets.sprite}
          width={400}
          height={800}
        />
      </div>
    </section>
  )
}
