"use client"

import { useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { AscensionPhase, SkillAscensionPhase } from "@/app/types/resonator"
import { getMaterialAssetPath } from "@/lib/utils"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface AscensionSectionProps {
  ascensionData: AscensionPhase[] | null
  skillAscensionData: SkillAscensionPhase[] | null
  attributeColor?: string
}

export default function AscensionSection({ ascensionData, skillAscensionData, attributeColor }: AscensionSectionProps) {
  const totalMaterials = useMemo(() => {
    if (!ascensionData) return null;

    const materialsMap = new Map<string, { amount: number; type?: string }>();
    ascensionData.forEach(phase => {
      phase.materials.forEach(material => {
        const current = materialsMap.get(material.name);
        materialsMap.set(material.name, {
          amount: (current?.amount || 0) + material.amount,
          type: material.type || current?.type
        });
      });
    });

    return Array.from(materialsMap.entries()).map(([name, data]) => ({
      name,
      amount: data.amount,
      type: data.type,
    }));
  }, [ascensionData]);

  const totalSkillMaterials = useMemo(() => {
    if (!skillAscensionData || skillAscensionData.length === 0) return null;

    // Just return the materials from the JSON file as-is
    return skillAscensionData[0].materials;
  }, [skillAscensionData]);

  return (
    <section id="ascension">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Ascension Materials</h2>

      {/* ascension Content */}
      <div>
        <Tabs defaultValue="level">
          <TabsList className="w-full bg-muted">
            <TabsTrigger value="level" activeColor={attributeColor}>Character Ascension</TabsTrigger>
            <TabsTrigger value="talent" activeColor={attributeColor}>Skill Ascension</TabsTrigger>
          </TabsList>
          {/* Character Ascension */}
          <TabsContent value="level">
            <Item variant="outline" className="p-4 md:p-6">
              <ItemContent className="gap-4">
                <ItemTitle className="text-lg md:text-xl font-semibold">Total Materials Needed (Level 1 → 90)</ItemTitle>

                {!totalMaterials || totalMaterials.length === 0 ? (
                  <p className="text-muted-foreground">No materials data available</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
                    {totalMaterials.map((material, index) => (
                      <Card
                        key={index}
                        className="flex flex-col items-center gap-2 p-2"
                      >
                        <Image
                          src={getMaterialAssetPath(material.name, material.type)}
                          alt={material.name}
                          width={80}
                          height={80}
                          className="object-contain w-16 h-16 md:w-20 md:h-20"
                        />
                        <div className="flex flex-col gap-1 text-center w-full">
                          <span className="text-xs md:text-sm font-semibold wrap-break-word">{material.name}</span>
                          <span className="text-muted-foreground text-xs md:text-sm">×{material.amount.toLocaleString()}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </ItemContent>
            </Item>
          </TabsContent>

          {/* Skill Ascension */}
          <TabsContent value="talent">
            <Item variant="outline" className="p-4 md:p-6">
              <ItemContent className="gap-4">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <ItemTitle className="text-lg md:text-xl font-semibold">
                      Total Materials Needed (All Skills Level 1 → 10)
                    </ItemTitle>
                    <ItemDescription className="text-sm md:text-base text-muted-foreground">Materials shown are for all 5 skills (Normal Attack, Resonance Skill, Forte Circuit, Resonance Liberation, Intro Skill)</ItemDescription>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-sm md:text-base">Include Minor Fortes</Label>
                    <Switch disabled />
                  </div>
                </div>

                {!totalSkillMaterials || totalSkillMaterials.length === 0 ? (
                  <p className="text-muted-foreground">No materials data available</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                    {totalSkillMaterials.map((material, index) => (
                      <Card
                        key={index}
                        className="flex flex-col items-center gap-2 p-2"
                      >
                        <Image
                          src={getMaterialAssetPath(material.name, material.type)}
                          alt={material.name}
                          width={80}
                          height={80}
                          className="object-contain w-16 h-16 md:w-20 md:h-20"
                        />
                        <div className="flex flex-col gap-1 text-center w-full">
                          <span className="text-xs md:text-sm font-semibold wrap-break-word">{material.name}</span>
                          <span className="text-muted-foreground text-xs md:text-sm">×{material.amount.toLocaleString()}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </ItemContent>
            </Item>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
