import { getResonatorByName, getResonatorTalents, parseTalentsMarkdown, getResonatorSequenceNodes, parseSequenceNodesMarkdown, getResonatorAscension, getResonatorSkillAscension } from "@/app/lib/resonators"
import { Separator } from "@/components/ui/separator"
import ProfileSection from "./ProfileSection"
import TalentsSection from "./TalentsSection"
import ResonanceChainSection from "./ResonanceChainSection"
import Link from "next/link"
import resonatorsData from "@/app/data/resonators/index.json"

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

export default async function ResonatorDetails({
  params,
}: {
  params: Promise<{ resonator: string }>
}) {
  const resonatorSlug = (await params).resonator
  const resonatorName = decodeURIComponent(resonatorSlug)
  const resonator = await getResonatorByName(resonatorName)

  if (!resonator) {
    return <div>Resonator not found</div>
  }

  // Load and parse talents markdown content if available
  const talentsMarkdown = await getResonatorTalents(resonator.id)
  const parsedTalents = talentsMarkdown ? parseTalentsMarkdown(talentsMarkdown) : resonator.talents

  // Load and parse sequence nodes markdown content if available
  const sequenceNodesMarkdown = await getResonatorSequenceNodes(resonator.id)
  const parsedSequenceNodes = sequenceNodesMarkdown ? parseSequenceNodesMarkdown(sequenceNodesMarkdown) : undefined

  // Load ascension data if available
  const ascensionData = await getResonatorAscension(resonator.id)

  // Load skill ascension data if available
  const skillAscensionData = await getResonatorSkillAscension(resonator.id)

  return (
    <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
      <ProfileSection resonator={resonator} ascensionData={ascensionData} />
      <Separator />
      <TalentsSection
        talents={parsedTalents}
        resonatorId={resonator.id}
        resonatorName={resonator.name}
        resonatorRarity={resonator.rarity}
        resonatorAttribute={resonator.attribute}
        skillAscensionData={skillAscensionData}
      />
      <Separator />
      <ResonanceChainSection 
        sequenceNodes={parsedSequenceNodes} resonator={resonator} 
        resonatorAttribute={resonator.attribute}
      />

      <NavigationMenu
        viewport={false}
        className="hidden xl:block fixed right-10 top-[20%] -translate-y-1/2 z-40"
      >
        <NavigationMenuList className="flex-col items-end gap-2 text-right">
          <NavigationMenuItem>
            <NavigationMenuLink asChild className="text-xs font-semibold">
              <Link href="#profile">Profile</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className="text-xs font-semibold">
              <Link href="#forte">Forte</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className="text-xs font-semibold">
              <Link href="#resonance-chain">Resonance Chain</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

// Pre-generate params for all known resonators to avoid runtime lookups
export const dynamicParams = false

export async function generateStaticParams() {
  return (resonatorsData.resonators as { name: string; variants?: { name?: string; attribute?: string }[] }[])
    .flatMap((resonator) => {
      const baseParam = { resonator: resonator.name }

      if (!resonator.variants || resonator.variants.length === 0) {
        return [baseParam]
      }

      const variantParams = resonator.variants.map((variant) => ({
        resonator: variant.name ?? `${resonator.name} (${variant.attribute})`,
      }))

      return [baseParam, ...variantParams]
    })
}
