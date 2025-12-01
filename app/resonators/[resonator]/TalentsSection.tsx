'use client'

import { Resonator, getResonatorSkillAssets, TalentData } from "@/app/types/resonator"
import { renderDescription } from "@/app/lib/talents"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { getAttributeColor } from "@/lib/utils"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"


interface SkillItem {
  type: string
  asset: string | undefined
  talent?: TalentData
}

interface TalentsSectionProps {
  talents?: Resonator["talents"]
  resonatorName: string
  resonatorRarity: number
  resonatorAttribute: Resonator["attribute"]
}

function SkillTabs({
  title,
  items,
  activeColor,
}: {
  title: string
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
      <div className="flex flex-col gap-2">
        <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
        <TabsList className="justify-start w-fit ">
          {validItems.map((skill, index) => (
            <Tooltip>
              <TooltipTrigger>
                <TabsTrigger
                  key={toValue(skill, index)}
                  value={toValue(skill, index)}
                  className="flex flex-col items-center gap-2 w-fit h-fit"
                  activeColor={activeColor}
                >
                  <Image
                    alt={`${skill.type} icon`}
                    src={skill.asset || ""}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent>
                {skill.talent?.type}
              </TooltipContent>
            </Tooltip>
          ))}
        </TabsList>
      </div>

      {validItems.map((skill, index) => (
        <TabsContent
          key={toValue(skill, index)}
          value={toValue(skill, index)}
          className="space-y-2 sm:space-y-3"
        >
          <Label className="text-base sm:text-xl font-semibold italic">{skill.talent?.type} - {skill.talent?.name}</Label>
          <div className="text-sm sm:text-base space-y-2 sm:space-y-3">
            {renderDescription(skill.talent?.description)}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default function TalentsSection({ talents, resonatorName, resonatorRarity, resonatorAttribute }: TalentsSectionProps) {
  const resonator = {
    rarity: resonatorRarity,
    name: resonatorName,
  } as Resonator

  const assets = getResonatorSkillAssets(resonator)
  const attributeColor = getAttributeColor(resonatorAttribute)

  const skillItems = [
    { type: "Normal Attack", asset: assets.normalAttack, talent: talents?.normalAttack },
    { type: "Resonance Skill", asset: assets.resonanceSkill, talent: talents?.resonanceSkill },
    { type: "Resonance Liberation", asset: assets.resonanceLiberation, talent: talents?.resonanceLiberation },
    { type: "Forte Circuit", asset: assets.forteCircuit, talent: talents?.forteCircuit },
  ]

  const inheritSkillItems = [
    { type: "Inherent Skill", asset: assets.inheritSkill1, talent: talents?.inheritSkill1 },
    { type: "Inherent Skill", asset: assets.inheritSkill2, talent: talents?.inheritSkill2 },
  ]

  const concertoSkillItems = [
    { type: "Intro Skill", asset: assets.introSkill, talent: talents?.introSkill },
    { type: "Outro Skill", asset: assets.outroSkill, talent: talents?.outroSkill },
  ]

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
    <section id="skills">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Skills & Talents</h2>

      <div className="flex flex-col gap-8">
        <SkillTabs title="Active Skills" items={skillItems} activeColor={attributeColor} />
        <Separator />
        <SkillTabs title="Inherent Skills" items={inheritSkillItems} activeColor={attributeColor} />
        <Separator />
        <SkillTabs title="Concerto Skills" items={concertoSkillItems} activeColor={attributeColor} />
      </div>
    </section>
  )
}
