"use client"

import { useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Item, ItemContent, ItemDescription, ItemTitle, ItemHeader } from "@/components/ui/item"
import { AscensionPhase, SkillAscensionPhase } from "@/app/types/resonator"
import { getMaterialAssetPath } from "@/lib/utils"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface AscensionSectionProps {
  ascensionData: AscensionPhase[] | null
  skillAscensionData: SkillAscensionPhase[] | null
}

export default function AscensionSection({ ascensionData, skillAscensionData }: AscensionSectionProps) {
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
      <h2 className="text-2xl font-bold mb-6">Ascension Materials</h2>

      {/* ascension Content */}
      <div>
        <Tabs defaultValue="level">
          <TabsList>
            <TabsTrigger value="level">Character Ascension</TabsTrigger>
            <TabsTrigger value="talent">Skill Ascension</TabsTrigger>
          </TabsList>
          {/* Character Ascension */}
          <TabsContent value="level">
            <Item variant="outline" className="p-6">
              <ItemContent className="gap-4">
                <ItemTitle className="text-xl font-semibold">Total Materials Needed (Level 1 → 90)</ItemTitle>

                {!totalMaterials || totalMaterials.length === 0 ? (
                  <p className="text-muted-foreground">No materials data available</p>
                ) : (
                  <div className="grid grid-cols-7 gap-2">
                    {totalMaterials.map((material, index) => (
                      <Card
                        key={index}
                        className="flex items-center gap-2 p-2"
                      >
                        <Image
                          src={getMaterialAssetPath(material.name, material.type)}
                          alt={material.name}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                        <div className="flex flex-col gap-2 text-center">
                          <span className="text-base font-semibold">{material.name}</span>
                          <span className="text-muted-foreground text-base">×{material.amount.toLocaleString()}</span>
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
            <Item variant="outline" className="p-6">
              <ItemContent className="gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <ItemTitle className="text-xl font-semibold">
                      Total Materials Needed (All Skills Level 1 → 10)
                    </ItemTitle>
                    <ItemDescription className="text-muted-foreground">Materials shown are for all 5 skills (Normal Attack, Resonance Skill, Forte Circuit, Resonance Liberation, Intro Skill)</ItemDescription>
                  </div>

                  <div className="flex gap-2">
                    <Label>Include Minor Fortes</Label>
                    <Switch />
                  </div>
                </div>

                {!totalSkillMaterials || totalSkillMaterials.length === 0 ? (
                  <p className="text-muted-foreground">No materials data available</p>
                ) : (
                  <div className="grid grid-cols-6 gap-2">
                    {totalSkillMaterials.map((material, index) => (
                      <Card
                        key={index}
                        className="flex items-center gap-2 p-2"
                      >
                        <Image
                          src={getMaterialAssetPath(material.name, material.type)}
                          alt={material.name}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                        <div className="flex flex-col gap-2 text-center">
                          <span className="text-base font-semibold">{material.name}</span>
                          <span className="text-muted-foreground text-base">×{material.amount.toLocaleString()}</span>
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
