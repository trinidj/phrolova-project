import { Resonator, getResonatorAssets } from "@/app/types/resonator"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { getAttributeColor, getAttributeBackgroundStyle } from "@/lib/utils"

import LevelSlider from "./LevelSlider"

interface ProfileSectionProps {
  resonator: Resonator
}

export default function ProfileSection({ resonator }: ProfileSectionProps) {
  const assets = getResonatorAssets(resonator)

  return (
    <section id="profile" className="relative flex flex-col justify-between lg:flex-row gap-8 lg:gap-12">
      {/* Left Side: Profile Info */}
      <div className="flex flex-col gap-4 sm:gap-6 shrink-0">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className="rounded-lg p-1 border-2"
              style={{
                borderColor: getAttributeColor(resonator.attribute),
                ...getAttributeBackgroundStyle(resonator.attribute, 0.05)
              }}
            >
              <Image
                alt={resonator.attribute}
                src={assets.attribute}
                width={500}
                height={500}
                className="size-12 sm:size-16"
              />
            </div>

            <Separator
              orientation="vertical"
              className="hidden sm:block"
              style={{ backgroundColor: getAttributeColor(resonator.attribute) }}
            />

            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-2xl sm:text-4xl">{resonator.name}</h1>
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
      <Image
        alt={`${resonator.name} sprite`}
        src={assets.sprite}
        width={500}
        height={800}
      />
    </section>
  )
}
