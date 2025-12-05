"use client"

import Image from "next/image"
import { useState } from "react"
import { renderSonataDescription } from "@/app/lib/sonata-descriptions"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Sonata = {
  id: string
  name: string
  icon: string
  description?: string
}

type Echo = {
  id: string
  name: string
  sonataIds: string[]
  icon?: string
  rarity?: string
}

type EchoCostKey = "cost_4" | "cost_3" | "cost_1"

const echoSections: { key: EchoCostKey; label: string; }[] = [
  { key: "cost_4", label: "4-Cost" },
  { key: "cost_3", label: "3-Cost" },
  { key: "cost_1", label: "1-Cost" },
]

function getEchoIcon(echo: Echo) {
  return echo.icon ?? `/assets/echoes/${echo.id}.png`
}

export default function EchoesExplorer({
  sonatas,
  echoes,
}: {
  sonatas: Sonata[]
  echoes: Echo[]
}) {
  const [selected, setSelected] = useState<string>(sonatas?.[0]?.id ?? "")

  if (!sonatas?.length) {
    return <p className="text-muted-foreground">No sonatas available.</p>
  }

  const activeValue = selected || sonatas[0]?.id

  return (
    <div className="flex flex-col gap-4">
      <Tabs value={activeValue} onValueChange={setSelected} className="space-y-4">
        <TabsList className="w-fit bg-none  justify-start gap-2">
          {sonatas.map((sonata) => (
            <Tooltip key={sonata.id}>
              <TooltipTrigger asChild>
                <TabsTrigger
                  value={sonata.id}
                  className="relative size-10 flex-wrap border-2 border-muted cursor-pointer transition-all duration-150 hover:border-2 hover:border-rarity-5/50"
                >
                  <Image
                    src={sonata.icon}
                    alt={sonata.name}
                    fill
                    className="object-contain"
                  />
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {sonata.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </TabsList>

        {sonatas.map((sonata) => {
          const sonataEchoes = echoes.filter((echo) => echo.sonataIds.includes(sonata.id))
          const echoesByRarity: Record<EchoCostKey, Echo[]> = {
            cost_4: sonataEchoes.filter((echo) => echo.rarity === "cost_4"),
            cost_3: sonataEchoes.filter((echo) => echo.rarity === "cost_3"),
            cost_1: sonataEchoes.filter((echo) => echo.rarity === "cost_1"),
          }

          return (
            <TabsContent key={sonata.id} value={sonata.id} className="space-y-4">
              <Card>
                <CardHeader className="gap-0">
                  <div className="flex items-center gap-2">
                    <div className="border-2 border-rarity-5/50 rounded-sm">
                      <Image 
                        src={sonata.icon}
                        alt={`${sonata.name} Icon`}
                        width={48}
                        height={48}
                        quality={100}
                      />
                    </div>

                    <CardTitle>{sonata.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {renderSonataDescription(sonata.description)}
                </CardContent>
              </Card>

              <div className="space-y-3">
                {echoSections.map(({ key, label }) => {
                  const list = echoesByRarity[key]

                  return (
                    <Card key={key}>
                      <CardHeader className="gap-0">
                        <CardTitle className="bg-accent border-2 border-rarity-5/50 rounded-sm w-fit p-2">{label}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-wrap gap-4">
                        {list.length > 0 ? (
                          list.map((echo) => (
                            <Tooltip key={echo.id}>
                              <TooltipTrigger asChild>
                                <div className="relative overflow-hidden rounded-md bg-linear-to-t from-rarity-5 via-rarity-5/30">
                                  <Image
                                    src={getEchoIcon(echo)}
                                    alt={echo.name}
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                  />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                {echo.name}
                              </TooltipContent>
                            </Tooltip>
                          ))
                        ) : (
                          <p className="col-span-full text-sm text-muted-foreground">
                            No echoes found for this cost.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
