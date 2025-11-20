import { Resonator, getResonatorAssets } from "@/app/types/resonator"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAttributeColor, getAttributeBackgroundStyle } from "@/lib/utils"

import LevelSlider from "./LevelSlider"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ProfileSectionProps {
  resonator: Resonator
}

export default function ProfileSection({ resonator }: ProfileSectionProps) {
  const assets = getResonatorAssets(resonator)
  const getCombatRoleIcon = (role: string) => {
    const slug = role
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "")

    return `/assets/combat_roles/${slug}.png`
  }

  return (
    <section id="profile" className="flex flex-col lg:flex-row gap-8 lg:gap-12">
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

        {resonator.combatRoles?.length ? (
          <Card className="gap-2">
            <CardHeader>
              <CardTitle>Combat Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-wrap items-center gap-3 sm:gap-2">
                {resonator.combatRoles.map((role) => {
                  const icon = getCombatRoleIcon(role)
                  return (
                    <li key={role} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2">
                            {icon ? (
                              <Image
                                alt={`${role} icon`}
                                src={icon}
                                width={40}
                                height={40}
                              />
                            ) : null}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-center font-semibold">{role}</p>
                        </TooltipContent>
                      </Tooltip>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </Card>
        ) : null}
      </div>

      {/* Right Side: Character Sprite */}
      <div className="flex justify-end flex-1">
        <Image
          alt={`${resonator.name} sprite`}
          src={assets.sprite}
          width={500}
          height={800}
          className="lg:flex lg:justify-end"
        />
      </div>
    </section>
  )
}
