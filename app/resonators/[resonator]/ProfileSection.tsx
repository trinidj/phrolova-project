import fs from "fs"
import path from "path"
import { Resonator, getResonatorAssets } from "@/app/types/resonator"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getAttributeColor, getAttributeBackgroundStyle } from "@/lib/utils"
import { Expand, Ellipsis } from "lucide-react"

import LevelSlider from "./LevelSlider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

interface ProfileSectionProps {
  resonator: Resonator
}

export default function ProfileSection({ resonator }: ProfileSectionProps) {
  const assets = getResonatorAssets(resonator)
  const splashArtPath = path.join(
    process.cwd(),
    "public",
    "assets",
    "resonators",
    `${resonator.rarity}_stars`,
    resonator.name,
    "splash_art.png"
  )
  const hasSplashArt = fs.existsSync(splashArtPath)
  const splashArt = hasSplashArt ? assets.splashArt : assets.sprite
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
    <>
      <section
        id="profile"
        className="flex flex-col gap-6 lg:flex-row lg:gap-6 lg:justify-between"
      >
        {/* Left Side: Profile Info */}
        <div className="flex flex-1 h-full flex-col gap-6 lg:gap-6">
          <Card className="px-6">
            <CardHeader className="px-0">
              <div className="flex justify-between gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                      quality={100}
                      className="size-12 sm:size-16"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <CardTitle className="font-bold text-2xl sm:text-3xl">{resonator.name}</CardTitle>
                    <CardDescription className="text-muted-foreground font-medium text-sm sm:text-base">
                      {resonator.description}
                    </CardDescription>

                    <div className="flex gap-2 items-center">
                      <Badge variant="secondary" className="h-8">
                        <Image
                          alt={`${resonator.rarity}-star`}
                          src={`/assets/rarity/${resonator.rarity}_star.png`}
                          width={95}
                          height={40}
                          quality={100}
                          className="w-15 lg:w-20"
                        />
                      </Badge>

                      <Badge variant="secondary" className="h-8">
                        <Image
                          alt={`${resonator.weaponType} icon`}
                          src={assets.weaponType}
                          width={20}
                          height={40}
                          quality={100}
                        />
                        <Label>{resonator.weaponType}</Label>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <Separator/>
            <CardContent className="px-0">
              {resonator.combatRoles?.length ? (
                <div className="flex justify-between gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <ul className="flex flex-wrap items-center gap-3 sm:gap-2">
                    {resonator.combatRoles.map((role) => {
                      return (
                        <li key={role} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-2">
                                <Image
                                  alt={`${role} icon`}
                                  src={getCombatRoleIcon(role)}
                                  width={40}
                                  height={40}
                                  quality={100}
                                />
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

                  <Dialog>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="cursor-pointer">
                            <Ellipsis />
                          </Button>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>View Combat Roles</span>
                      </TooltipContent>
                    </Tooltip>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Combat Roles</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-3">
                        {resonator.combatRoles.map((role) => {
                          const details = combatRoleMap[role]
                          return (
                            <div
                              key={role}
                              className="flex items-start gap-3 rounded-md border p-3"
                            >
                              <Image
                                alt={`${role} icon`}
                                src={getCombatRoleIcon(role)}
                                width={36}
                                height={36}
                                quality={100}
                                className="mt-0.5"
                              />
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
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card className="px-6">
            <CardHeader className="px-0 gap-0">
              <CardTitle className="text-2xl">Stats</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="px-0">
              <LevelSlider resonator={resonator} />
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Character Sprite */}
        <Card className="p-0 w-full max-w-[500px] h-full">
          <CardContent className="relative p-0 overflow-hidden">
            <Image
              alt={`${resonator.name} sprite`}
              src={assets.sprite}
              width={524}
              height={600}
              quality={100}
              className="object-cover w-full h-[360px] sm:h-[460px] lg:h-[575px]"
            />

            <Dialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="absolute right-2 top-2 sm:right-3 sm:top-3 z-10 cursor-pointer"
                      size="icon"
                      disabled={!hasSplashArt}
                    >
                      <Expand />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <span>View Splash Art</span>
                </TooltipContent>
              </Tooltip>
              <DialogContent className="max-w-fit sm:max-w-[90vw] lg:max-w-fit">
                <DialogHeader>
                  <DialogTitle>{resonator.name}</DialogTitle>
                </DialogHeader>
                <Skeleton className="max-h-[75vh] w-auto object-contain" />
                <Image
                  src={splashArt}
                  alt={`${resonator.name} splash art`}
                  width={2840}
                  height={1873}
                  quality={100}
                  loading="lazy"
                  className="max-h-[75vh] w-auto object-contain"
                />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
