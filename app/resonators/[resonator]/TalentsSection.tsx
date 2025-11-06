'use client'

import { Resonator, getResonatorSkillAssets } from "@/app/types/resonator"
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

interface TalentsSectionProps {
  talents?: Resonator['talents']
  resonatorName: string
}

export default function TalentsSection({ talents, resonatorName }: TalentsSectionProps) {
  // Create a minimal resonator object to get skill assets
  const resonator = {
    rarity: 5,
    name: resonatorName,
  } as Resonator

  const assets = getResonatorSkillAssets(resonator)

  const skillItems = [  
    { type: "Normal Attack", asset: assets.normalAttack, talent: talents?.normalAttack },
    { type: "Resonance Skill", asset: assets.resonanceSkill, talent: talents?.resonanceSkill },
    { type: "Resonance Liberation", asset: assets.resonanceLiberation, talent: talents?.resonanceLiberation },
    { type: "Forte Circuit", asset: assets.forteCircuit, talent: talents?.forteCircuit },
    { type: "Intro Skill", asset: assets.introSkill, talent: talents?.introSkill },
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
        <h2 className="text-2xl font-bold mb-6">Skills & Talents</h2>
        <p className="text-muted-foreground">Talent information not yet available for this resonator.</p>
      </section>
    )
  }

  return (
    <section id="skills">
      <h2 className="text-2xl font-bold mb-6">Skills & Talents</h2>

      {/* Skill Content */}
      <div className="flex flex-col gap-6">
        {/* Skills */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">Active Skills</h3>
          {skillItems.map((skill) => {
            if (!skill.talent) return null

            return (
              <Accordion key={skill.talent.name} type="single" collapsible >
                <AccordionItem value={skill.type.toLowerCase().replace(/ /g, '_')}>
                  <AccordionTrigger>
                    <Item variant="muted" className="w-full">
                      <ItemMedia>
                        <Image
                          alt={`${skill.type} Icon`}
                          src={skill.asset || ''}
                          width={64}
                          height={64}
                        />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle className="text-lg">{skill.talent.name}</ItemTitle>
                        <ItemDescription>{skill.type}</ItemDescription>
                      </ItemContent>
                    </Item>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ut! Maxime, esse distinctio sunt ea sapiente obcaecati nulla impedit alias quasi cumque, ipsa corporis reiciendis doloribus. Voluptatem quia ad id!</p>

                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ut! Maxime, esse distinctio sunt ea sapiente obcaecati nulla impedit alias quasi cumque, ipsa corporis reiciendis doloribus. Voluptatem quia ad id!</p>

                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ut! Maxime, esse distinctio sunt ea sapiente obcaecati nulla impedit alias quasi cumque, ipsa corporis reiciendis doloribus. Voluptatem quia ad id!</p>

                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ut! Maxime, esse distinctio sunt ea sapiente obcaecati nulla impedit alias quasi cumque, ipsa corporis reiciendis doloribus. Voluptatem quia ad id!</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          })}
        </div>

        {/* Inherit Skills */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">Inherit Skills</h3>

          {inheritSkillItems.map((skill) => {
            if (!skill.talent) return null

            return (
              <Accordion key={skill.talent.name} type="single" collapsible >
                <AccordionItem value={skill.type.toLowerCase().replace(/ /g, '_')}>
                  <AccordionTrigger>
                    <Item variant="muted" className="w-full">
                      <ItemMedia>
                        <Image
                          alt={`${skill.type} Icon`}
                          src={skill.asset || ''}
                          width={64}
                          height={64}
                        />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle className="text-lg">{skill.talent.name}</ItemTitle>
                        <ItemDescription>{skill.type}</ItemDescription>
                      </ItemContent>
                    </Item>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ut! Maxime, esse distinctio sunt ea sapiente obcaecati nulla impedit alias quasi cumque, ipsa corporis reiciendis doloribus. Voluptatem quia ad id!</p>

                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ut! Maxime, esse distinctio sunt ea sapiente obcaecati nulla impedit alias quasi cumque, ipsa corporis reiciendis doloribus. Voluptatem quia ad id!</p>

                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ut! Maxime, esse distinctio sunt ea sapiente obcaecati nulla impedit alias quasi cumque, ipsa corporis reiciendis doloribus. Voluptatem quia ad id!</p>

                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ut! Maxime, esse distinctio sunt ea sapiente obcaecati nulla impedit alias quasi cumque, ipsa corporis reiciendis doloribus. Voluptatem quia ad id!</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          })}
        </div>

        {/* Concerto Skills */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">Concerto Skills</h3>

          {concertoSkillItems.map((skill) => {
            if (!skill.talent) return null

            return (
              <Accordion key={skill.talent.name} type="single" collapsible >
                <AccordionItem value={skill.type.toLowerCase().replace(/ /g, '_')}>
                  <AccordionTrigger>
                    <Item variant="muted" className="w-full">
                      <ItemMedia>
                        <Image
                          alt={`${skill.type} Icon`}
                          src={skill.asset || ''}
                          width={64}
                          height={64}
                        />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle className="text-lg">{skill.talent.name}</ItemTitle>
                        <ItemDescription>{skill.type}</ItemDescription>
                      </ItemContent>
                    </Item>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ut! Maxime, esse distinctio sunt ea sapiente obcaecati nulla impedit alias quasi cumque, ipsa corporis reiciendis doloribus. Voluptatem quia ad id!</p>

                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ut! Maxime, esse distinctio sunt ea sapiente obcaecati nulla impedit alias quasi cumque, ipsa corporis reiciendis doloribus. Voluptatem quia ad id!</p>

                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ut! Maxime, esse distinctio sunt ea sapiente obcaecati nulla impedit alias quasi cumque, ipsa corporis reiciendis doloribus. Voluptatem quia ad id!</p>

                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ut! Maxime, esse distinctio sunt ea sapiente obcaecati nulla impedit alias quasi cumque, ipsa corporis reiciendis doloribus. Voluptatem quia ad id!</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          })}
        </div>
      </div>
    </section>
  )
}
