import { Resonator, getResonatorAssets } from "@/app/types/resonator"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAttributeColor, getAttributeBackgroundStyle } from "@/lib/utils"

import LevelSlider from "./LevelSlider"
import { Ellipsis } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import combatRolesData from "@/app/data/combat_roles.json"

interface ProfileSectionProps {
  resonator: Resonator
}

export default function ProfileSection({ resonator }: ProfileSectionProps) {
  const assets = getResonatorAssets(resonator)
  const combatRoleMap = combatRolesData.combat_roles.reduce<
    Record<string, { description: string }>
  >((acc, role) => {
    acc[role.name] = { description: role.description }
    return acc
  }, {})

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
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Combat Roles</CardTitle>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" className="cursor-pointer">
                    <Ellipsis />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Combat Roles</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-3">
                    {resonator.combatRoles.map((role) => {
                      const icon = getCombatRoleIcon(role)
                      const details = combatRoleMap[role]
                      return (
                        <div
                          key={role}
                          className="flex items-start gap-3 rounded-md border p-3"
                        >
                          {icon ? (
                            <Image
                              alt={`${role} icon`}
                              src={icon}
                              width={36}
                              height={36}
                              className="mt-0.5"
                            />
                          ) : null}
                          <div className="flex flex-col gap-1">
                            <p className="font-semibold leading-none">{role}</p>
                            <p className="text-sm text-muted-foreground">
                              {details?.description ??
                                "Description not available for this combat role."}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </DialogContent>
              </Dialog>

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
