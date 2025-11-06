'use client'

import { renderDescription } from "@/app/lib/talents"
import { Resonator, getSequenceNodeAssets } from "@/app/types/resonator"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"

interface SequenceNode {
  name: string
  description?: string
}

interface ResonanceChainSectionProps {
  sequenceNodes?: SequenceNode[]
  resonator: Resonator
}

export default function ResonanceChainSection({ sequenceNodes, resonator }: ResonanceChainSectionProps) {
  const assets = getSequenceNodeAssets(resonator)

  if (!sequenceNodes || sequenceNodes.length === 0) {
    return (
      <section id="resonance-chain">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Resonance Chain</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Resonance chain information not yet available for this resonator.</p>
      </section>
    )
  }

  return (
    <section id="resonance-chain">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Resonance Chain</h2>

      {/* Sequence Nodes Content */}
      <div className="flex flex-col gap-2 sm:gap-3">
        {sequenceNodes.map((node, index) => {
          const nodeKey = `sequenceNode${index + 1}` as keyof typeof assets
          const nodeImage = assets[nodeKey]

          return (
            <Accordion key={`${node.name}-${index}`} type="single" collapsible>
              <AccordionItem value={`sequence-node-${index + 1}`}>
                <AccordionTrigger>
                  <Item variant="muted" className="w-full">
                    {nodeImage ? (
                      <img
                        src={nodeImage}
                        alt={`${node.name} icon`}
                        className="size-12 sm:size-16 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="flex items-center justify-center size-12 sm:size-16 rounded-full bg-primary/10 text-primary font-bold text-lg sm:text-xl shrink-0">
                        S{index + 1}
                      </div>
                    )}
                    <ItemContent>
                      <ItemTitle className="text-base sm:text-lg">{node.name}</ItemTitle>
                      <ItemDescription className="text-xs sm:text-sm">Sequence Node {index + 1}</ItemDescription>
                    </ItemContent>
                  </Item>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                    {renderDescription(node.description)}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        })}
      </div>
    </section>
  )
}
