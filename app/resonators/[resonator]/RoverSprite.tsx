"use client"

import Image from "next/image"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Expand } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

type RoverSpriteProps = {
  resonatorName: string
  primarySprite: string
  maleSprite?: string
  splashArt: string
  hasSplashArt: boolean
}

export default function RoverSprite({
  resonatorName,
  primarySprite,
  maleSprite,
  splashArt,
  hasSplashArt,
}: RoverSpriteProps) {
  const [gender, setGender] = useState<"female" | "male">("female")
  const spriteSrc = gender === "male" && maleSprite ? maleSprite : primarySprite

  return (
    <>
      <Card className="p-0 w-full max-w-[500px] self-stretch mx-auto lg:mx-0 gap-0">
        <CardContent className="relative p-0 overflow-hidden">
          <Image
            alt={`${resonatorName} sprite`}
            src={spriteSrc}
            width={524}
            height={600}
            quality={100}
            className="object-cover w-full h-[400px] sm:h-[440px] lg:h-[575px]"
          />

          {maleSprite && (
            <Tabs
              value={gender}
              onValueChange={(val) => setGender(val as "female" | "male")}
              className="self-end absolute left-2 top-2"
            >
              <TabsList>
                <TabsTrigger value="female">Female</TabsTrigger>
                <TabsTrigger value="male">Male</TabsTrigger>
              </TabsList>
            </Tabs>
          )}

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
            <DialogContent className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-fit">
              <DialogHeader>
                <DialogTitle>{resonatorName}</DialogTitle>
              </DialogHeader>
              <Skeleton className="max-h-[75vh] w-full sm:w-auto object-contain" />
              <Image
                src={splashArt}
                alt={`${resonatorName} splash art`}
                width={2840}
                height={1873}
                quality={100}
                loading="lazy"
                className="max-h-[75vh] w-full sm:w-auto object-contain"
              />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </>
  )
}
