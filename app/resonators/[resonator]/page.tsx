import { getResonatorByName, getResonatorTalents, parseTalentsMarkdown, getResonatorSequenceNodes, parseSequenceNodesMarkdown, getResonatorAscension, getResonatorSkillAscension } from "@/app/lib/resonators"
import { Separator } from "@/components/ui/separator"
import ProfileSection from "./ProfileSection"
import AscensionSection from "./AscensionSection"
import TalentsSection from "./TalentsSection"
import ResonanceChainSection from "./ResonanceChainSection"
import Link from "next/link"
import resonatorsData from "@/app/data/resonators/index.json"
import { getAttributeColor } from "@/lib/utils"

import {
  NavigationMenu,
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
  const attributeColor = getAttributeColor(resonator.attribute)

  return (
    <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
      <ProfileSection resonator={resonator} />
      <Separator />
      <TalentsSection
        talents={parsedTalents}
        resonatorName={resonator.name}
        resonatorRarity={resonator.rarity}
        resonatorAttribute={resonator.attribute}
      />
      <Separator />
      <AscensionSection
        ascensionData={ascensionData}
        skillAscensionData={skillAscensionData}
        attributeColor={attributeColor}
      />
      <Separator />
      <ResonanceChainSection sequenceNodes={parsedSequenceNodes} resonator={resonator} />

      <NavigationMenu className="hidden xl:block fixed top-1/5 right-10 -translate-y-1/2">
        <NavigationMenuItem className="flex flex-col gap-2 list-none text-right">
          <NavigationMenuLink asChild className="text-xs font-semibold">
            <Link href="#profile">Profile</Link>
          </NavigationMenuLink>

          <NavigationMenuLink asChild className="text-xs font-semibold">
            <Link href="#skills">Skills</Link>
          </NavigationMenuLink>

          <NavigationMenuLink asChild className="text-xs font-semibold">
            <Link href="#ascension">Ascension</Link>
          </NavigationMenuLink>

          <NavigationMenuLink asChild className="text-xs font-semibold">
            <Link href="#resonance-chain">Resonance Chain</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  )
}

// Pre-generate params for all known resonators to avoid runtime lookups
export const dynamicParams = false

export async function generateStaticParams() {
  return (resonatorsData.resonators as { name: string }[]).map((r) => ({ resonator: r.name }))
}
