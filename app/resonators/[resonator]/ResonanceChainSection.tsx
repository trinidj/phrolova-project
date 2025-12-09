'use client'

import { renderDescription } from "@/app/lib/talents"
import { Resonator, getSequenceNodeAssets, SequenceNode } from "@/app/types/resonator"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { getAttributeColor } from "@/lib/utils"

import { 
  Card, 
  CardHeader, 
  CardContent,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

interface ResonanceChainSectionProps {
  sequenceNodes?: SequenceNode[]
  resonator: Resonator
  resonatorAttribute: Resonator["attribute"]
}

export default function ResonanceChainSection({ sequenceNodes, resonator, resonatorAttribute }: ResonanceChainSectionProps) {
  const assets = getSequenceNodeAssets(resonator)
  const attributeColor = getAttributeColor(resonatorAttribute)

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
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Resonance Chain</h2>
      <Card className="px-6">
        <CardContent className="px-0">
          {/* Sequence Nodes Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {sequenceNodes.map((node, index) => {
              const nodeKey = `sequenceNode${index + 1}` as keyof typeof assets
              const nodeImage = assets[nodeKey]

              return (
                <Card key={`${node.name}-${index}`} className="p-6 bg-accent">
                  <CardHeader className="p-0 gap-0">
                    <div className="flex items-center gap-4">
                      {nodeImage ? (
                        <div 
                          className="flex item-center justify-center border-2 rounded-full"
                          style={{ borderColor: attributeColor }}
                        >
                          <Image
                            src={nodeImage}
                            alt={`${node.name} icon`}
                            width={64}
                            height={64}
                            className="object-contain scale-75"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center size-12 sm:size-14 md:size-16 rounded-full bg-primary/10 text-primary font-bold text-base sm:text-lg shrink-0">
                          S{index + 1}
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        <CardTitle>{node.name}</CardTitle>
                        <CardDescription>Sequence Node {index + 1}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="p-0">
                    <div className="text-sm font-medium sm:text-base space-y-2 sm:space-y-3">
                      {renderDescription(node.description)}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
