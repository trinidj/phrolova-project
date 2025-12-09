'use client'

import { useMemo } from "react"

import { Resonator, SkillAscensionPhase, TalentData, getResonatorSkillAssets } from "@/app/types/resonator"
import { renderDescription } from "@/app/lib/talents"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import { getAttributeColor, getMaterialAssetPath } from "@/lib/utils"

interface SkillItem {
  type: string
  asset: string | undefined
  talent?: TalentData
}

interface TalentsSectionProps {
  talents?: Resonator["talents"]
  resonatorId: Resonator["id"]
  resonatorName: string
  resonatorRarity: number
  resonatorAttribute: Resonator["attribute"]
  skillAscensionData: SkillAscensionPhase[] | null
}

function SkillTabs({
  items,
  activeColor,
}: {
  items: SkillItem[]
  activeColor: string
}) {
  const toValue = (item: SkillItem, index: number) =>
    `${item.type}-${item.talent?.name ?? "unnamed"}-${index}`.toLowerCase().replace(/\s+/g, "_")

  const validItems = items.filter((item) => item.talent)
  if (validItems.length === 0) return null
  const defaultValue = toValue(validItems[0], 0)

  return (
    <Tabs defaultValue={defaultValue} className="space-y-3 sm:space-y-4">
      <TabsList className="justify-start w-fit p-0 flex-wrap grid grid-cols-4 sm:flex md:flex lg:flex">
        {validItems.map((skill, index) => (
          <TabsTrigger
            value={toValue(skill, index)}
            key={toValue(skill, index)}
            className="group flex flex-col rounded-none items-center py-3 gap-4 w-fit h-fit border-0 border-b-[3px]"
            activeColor={activeColor}
          >
            <div
              className="border-2 p-1 rounded-full transition-shadow group-data-[state=active]:shadow-[0_0_15px_var(--tab-active-color)]"
              style={{ borderColor: activeColor }}
            >
              <Image
                alt={`${skill.type} icon`}
                src={skill.asset || ""}
                width={48}
                height={48}
                className="object-contain scale-75"
              />
            </div>
          </TabsTrigger>
        ))}
      </TabsList>

      {validItems.map((skill, index) => (
        <TabsContent
          key={toValue(skill, index)}
          value={toValue(skill, index)}
          className="space-y-2 sm:space-y-3"
        >
          <Label className="text-xl underline-offset-4">{skill.talent?.type}</Label>
          <div className="text-sm font-medium sm:text-base space-y-2 sm:space-y-3">
            {renderDescription(skill.talent?.description)}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default function TalentsSection({ talents, resonatorId, resonatorName, resonatorRarity, resonatorAttribute, skillAscensionData }: TalentsSectionProps) {
  const resonator = {
    rarity: resonatorRarity,
    name: resonatorName,
    id: resonatorId,
    attribute: resonatorAttribute,
  } as Resonator

  const assets = getResonatorSkillAssets(resonator)
  const attributeColor = getAttributeColor(resonatorAttribute)

  const skillItems = [
    { type: "Normal Attack", asset: assets.normalAttack, talent: talents?.normalAttack },
    { type: "Resonance Skill", asset: assets.resonanceSkill, talent: talents?.resonanceSkill },
    { type: "Resonance Liberation", asset: assets.resonanceLiberation, talent: talents?.resonanceLiberation },
    { type: "Forte Circuit", asset: assets.forteCircuit, talent: talents?.forteCircuit },
    { type: "Intro Skill", asset: assets.introSkill, talent: talents?.introSkill },
    { type: "Outro Skill", asset: assets.outroSkill, talent: talents?.outroSkill },
  ]

  const inheritSkillItems = [
    { type: "Inherent Skill", asset: assets.inheritSkill1, talent: talents?.inheritSkill1 },
    { type: "Inherent Skill", asset: assets.inheritSkill2, talent: talents?.inheritSkill2 },
  ]

  const totalSkillMaterials = useMemo(() => {
    if (!skillAscensionData || skillAscensionData.length === 0) return null

    // Just return the materials from the JSON file as-is
    return skillAscensionData[0].materials
  }, [skillAscensionData])

  if (!talents) {
    return (
      <section id="skills">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Skills & Talents</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Talent information not yet available for this resonator.
        </p>
      </section>
    )
  }

  return (
    <section id="forte">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Forte</h2>
      <Card className="px-6">
        <CardContent className="flex flex-col gap-8 px-0">
          <SkillTabs items={skillItems} activeColor={attributeColor} />
          <Separator />
          <SkillTabs items={inheritSkillItems} activeColor={attributeColor} />
          <Separator />

          <Card className="bg-accent">
            <CardHeader className="gap-0">
              <CardTitle className="font-semibold text-xl">Total Ascension Materials</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
              {!totalSkillMaterials || totalSkillMaterials.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No skill ascension data available.</p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-12 gap-4 items-center">
                    {totalSkillMaterials.map((material, materialIndex) => (
                      <Card
                        key={materialIndex}
                        className="flex flex-col items-center gap-0 p-0 rounded-sm overflow-hidden"
                      >
                        <CardContent className="px-0 w-full">
                          <Image
                            src={getMaterialAssetPath(material.name, material.type)}
                            alt={material.name}
                            width={80}
                            height={80}
                            className="object-contain w-full"
                          />
                          <div className="bg-accent/50 p-1 text-center border-t-2 border-t-rarity-5">
                            <Label className="text-sm justify-center">{material.amount.toLocaleString()}</Label>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </section>
  )
}
