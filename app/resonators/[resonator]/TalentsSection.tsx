'use client'

import { Resonator, getResonatorSkillAssets, TalentData } from "@/app/types/resonator"
import { renderDescription } from "@/app/lib/talents"
import Image from "next/image"

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
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

interface SkillItem {
  type: string
  asset: string | undefined
  talent?: TalentData
}

interface TalentsSectionProps {
  talents?: Resonator['talents']
  resonatorName: string
  resonatorRarity: number
}

function SkillAccordion({ skill }: { skill: SkillItem }) {
  if (!skill.talent) return null

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={skill.type.toLowerCase().replace(/ /g, '_')}>
        <AccordionTrigger>
          <Item variant="muted" className="w-full">
            <ItemMedia>
              <Image
                alt={`${skill.type} Icon`}
                src={skill.asset || ''}
                width={64}
                height={64}
                className="size-12 sm:size-16"
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="text-base sm:text-lg">{skill.talent.name}</ItemTitle>
              <ItemDescription className="text-xs sm:text-sm">{skill.type}</ItemDescription>
            </ItemContent>
          </Item>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
            {renderDescription(skill.talent.description)}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default function TalentsSection({ talents, resonatorName, resonatorRarity }: TalentsSectionProps) {
  // Create a minimal resonator object to get skill assets
  const resonator = {
    rarity: resonatorRarity,
    name: resonatorName,
  } as Resonator

  const assets = getResonatorSkillAssets(resonator)

  const skillItems = [
    { type: "Normal Attack", asset: assets.normalAttack, talent: talents?.normalAttack },
    { type: "Resonance Skill", asset: assets.resonanceSkill, talent: talents?.resonanceSkill },
    { type: "Resonance Liberation", asset: assets.resonanceLiberation, talent: talents?.resonanceLiberation },
    { type: "Forte Circuit", asset: assets.forteCircuit, talent: talents?.forteCircuit },
  ]

  const inheritSkillItems = [
    { type: "Inherit Skill", asset: assets.inheritSkill1, talent: talents?.inheritSkill1 },
    { type: "Inherit Skill", asset: assets.inheritSkill2, talent: talents?.inheritSkill2 },
  ]

  const concertoSkillItems = [
    { type: "Intro Skill", asset: assets.introSkill, talent: talents?.introSkill },
    { type: "Outro Skill", asset: assets.outroSkill, talent: talents?.outroSkill }
  ]

  if (!talents) {
    return (
      <section id="skills">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Skills & Talents</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Talent information not yet available for this resonator.</p>
      </section>
    )
  }

  return (
    <section id="skills">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Skills & Talents</h2>

      {/* Skill Content */}
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Active Skills */}
        <div className="flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold">Active Skills</h3>
          {skillItems.map((skill, index) => (
            <SkillAccordion
              key={`${skill.type}-${skill.talent?.name ?? index}`}
              skill={skill}
            />
          ))}
        </div>

        {/* Inherit Skills */}
        <div className="flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold">Inherit Skills</h3>
          {inheritSkillItems.map((skill, index) => (
            <SkillAccordion
              key={`${skill.type}-${skill.talent?.name ?? index}`}
              skill={skill}
            />
          ))}
        </div>

        {/* Concerto Skills */}
        <div className="flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold">Concerto Skills</h3>
          {concertoSkillItems.map((skill, index) => (
            <SkillAccordion
              key={`${skill.type}-${skill.talent?.name ?? index}`}
              skill={skill}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
