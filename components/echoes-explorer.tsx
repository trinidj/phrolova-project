"use client"

import Image from "next/image"
import { useState } from "react"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { renderSonataDescription } from "@/app/lib/sonata-descriptions"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
  rarity?: string
}

export default function EchoesExplorer({
  sonatas,
  echoes,
}: {
  sonatas: Sonata[]
  echoes: Echo[]
}) {
  const [selected, setSelected] = useState<string | null>(sonatas?.[0]?.id ?? null)

  const selectedSonata = sonatas.find((s) => s.id === selected) ?? null

  const filtered = selected ? echoes.filter((e) => e.sonataIds.includes(selected)) : []

  // Group echoes by rarity
  const echosByRarity = {
    cost_4: filtered.filter((e) => e.rarity === 'cost_4'),
    cost_3: filtered.filter((e) => e.rarity === 'cost_3'),
    cost_1: filtered.filter((e) => e.rarity === 'cost_1'),
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2 max-h-[570px] overflow-auto">
        <Accordion type="single" collapsible value={selected ?? ""} onValueChange={(v) => setSelected(v === "" ? null : v)}>
          {sonatas.map((s) => (
            <AccordionItem key={s.id} value={s.id}>
              <AccordionTrigger>
                <Item variant="muted" className="w-full">
                  <ItemMedia>
                    <Image src={s.icon} alt={s.name} width={64} height={64} className="object-contain" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="text-base sm:text-lg">{s.name}</ItemTitle>
                  </ItemContent>
                </Item>
              </AccordionTrigger>

              <AccordionContent>
                <div className="text-sm text-muted-foreground">
                  {renderSonataDescription(s.description)}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div>
        <div className="mb-3">
          <h2 className="text-2xl font-semibold">{selectedSonata ? selectedSonata.name : 'Select a Sonata'}</h2>
        </div>

        <div className="space-y-2">
          {filtered.length === 0 && <div className="text-sm text-muted-foreground">No echoes for this set.</div>}
          
          {/* 4 cost */}
          {echosByRarity.cost_4.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">4-Cost</h3>
              <div className="space-y-1">
                {echosByRarity.cost_4.map((e) => (
                  <Item key={e.id} variant="muted">
                    <ItemContent>
                      <ItemTitle>{e.name}</ItemTitle>
                    </ItemContent>
                  </Item>
                ))}
              </div>
            </div>
          )}

          {/* 3 cost */}
          {echosByRarity.cost_3.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">3-Cost</h3>
              <div className="space-y-1">
                {echosByRarity.cost_3.map((e) => (
                  <Item key={e.id} variant="muted">
                    <ItemContent>
                      <ItemTitle>{e.name}</ItemTitle>
                    </ItemContent>
                  </Item>
                ))}
              </div>
            </div>
          )}

          {/* 1 cost */}
          {echosByRarity.cost_1.length > 0 && (
            <div className="flex flex-col gap-2">
              <header className="flex items-center px-2 w-fit border-2 rounded-lg border-yellow-400/50">
                <h3 className="text-lg font-semibold">1-Cost</h3>
              </header>

              <div className="space-y-1 flex gap-2">
                {echosByRarity.cost_1.map((e) => (
                  <Tooltip key={e.id}>
                    <TooltipTrigger>
                      <Item variant="muted" className="w-fit mb-0">
                        <ItemContent>
                          <Image 
                            src={`/assets/echoes/${e.id}.png`}
                            alt={e.name}
                            width={64}
                            height={64}
                            className="object-contain rounded-xl"
                          />
                        </ItemContent>
                      </Item>
                    </TooltipTrigger>
                    <TooltipContent>{e.name}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
