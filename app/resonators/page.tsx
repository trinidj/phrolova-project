"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, Search, Grid3x2, LayoutGrid } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import {
  Card,
  CardTitle,
} from "@/components/ui/card"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { FieldGroup, FieldSet, Field, FieldLabel } from "@/components/ui/field"
import resonatorsData from "@/app/data/resonators/index.json"
import { Resonator, getResonatorAssets } from "@/app/types/resonator"
import { getAttributeColor, getAttributeBackgroundStyle, cn } from "@/lib/utils"
import { ATTRIBUTES, WEAPON_TYPES, RARITIES } from "@/app/lib/constants"

import Image from "next/image"
import Link from "next/link"

type ResonatorIndexEntry = Omit<Resonator, "weaponType" | "stats" | "combatRoles"> & {
  weaponType?: Resonator["weaponType"]
  stats?: Resonator["stats"]
  combatRoles?: Resonator["combatRoles"] | string
}

export default function ResonatorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([])
  const [selectedWeaponTypes, setSelectedWeaponTypes] = useState<string[]>([])
  const [selectedRarities, setSelectedRarities] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [showSprites, setShowSprites] = useState(false)

  const iconPreviewImageClassName = "rounded"
  const spritePreviewImageClassName = "rounded"

  // Temporary filter states (before saving)
  const [tempAttributes, setTempAttributes] = useState<string[]>([])
  const [tempWeaponTypes, setTempWeaponTypes] = useState<string[]>([])
  const [tempRarities, setTempRarities] = useState<string[]>([])

  const resonators = resonatorsData.resonators as ResonatorIndexEntry[]

  // Filter resonators based on search query and filters
  const filteredResonators = resonators.filter((resonator) => {
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch = resonator.name.toLowerCase().includes(searchLower)

    const matchesAttribute = selectedAttributes.length === 0 ||
      selectedAttributes.includes(resonator.attribute.toLowerCase())

    const matchesWeapon = selectedWeaponTypes.length === 0 ||
      (resonator.weaponType && selectedWeaponTypes.includes(resonator.weaponType.toLowerCase()))

    const matchesRarity = selectedRarities.length === 0 ||
      selectedRarities.includes(resonator.rarity.toString())

    return matchesSearch && matchesAttribute && matchesWeapon && matchesRarity
  })

  const handleSaveFilters = () => {
    setSelectedAttributes(tempAttributes)
    setSelectedWeaponTypes(tempWeaponTypes)
    setSelectedRarities(tempRarities)
    setIsFilterOpen(false)
  }

  const handleCancelFilters = () => {
    setTempAttributes(selectedAttributes)
    setTempWeaponTypes(selectedWeaponTypes)
    setTempRarities(selectedRarities)
    setIsFilterOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (open) {
      // When opening, set temp values to current values
      setTempAttributes(selectedAttributes)
      setTempWeaponTypes(selectedWeaponTypes)
      setTempRarities(selectedRarities)
    }
    setIsFilterOpen(open)
  }

  const getRarityGradient = (rarity: number) => {
    if (rarity === 5) {
      return 'bg-gradient-to-t from-rarity-5 via-rarity-5/10 to-transparent'
    }
    return 'bg-gradient-to-t from-rarity-4 via-rarity-4/10 to-transparent'
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">Resonators</h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">Browse all Resonators in Wuthering Waves</p>
        </div>

        <div className="flex gap-2 flex-col sm:flex-row">
          <InputGroup>
            <InputGroupInput
              placeholder="Search Resonator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <Dialog open={isFilterOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button size="icon" className="cursor-pointer">
                <Filter />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter</DialogTitle>
                <DialogDescription>
                  Filter resonators by attribute, rarity, or weapon type
                </DialogDescription>
              </DialogHeader>

              <form>
                <FieldSet>
                  <FieldGroup>
                    <Field>
                      <FieldLabel>Rarity</FieldLabel>
                      <ToggleGroup
                        type="multiple"
                        variant="outline"
                        value={tempRarities}
                        onValueChange={setTempRarities}
                      >
                        {RARITIES.map((rarity) => (
                          <ToggleGroupItem key={rarity.value} value={rarity.value}>
                            {rarity.label}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </Field>

                    <Field>
                      <FieldLabel>Attribute</FieldLabel>
                      <ToggleGroup
                        type="multiple"
                        variant="outline"
                        className="cursor-pointer"
                        value={tempAttributes}
                        onValueChange={setTempAttributes}
                      >
                        {ATTRIBUTES.map((attribute) => {
                          const isSelected = tempAttributes.includes(attribute.value)
                          return (
                            <ToggleGroupItem
                              key={attribute.value}
                              value={attribute.value}
                              style={
                                isSelected
                                  ? {
                                      borderColor: getAttributeColor(attribute.label),
                                      ...getAttributeBackgroundStyle(attribute.label, 0.2)
                                    }
                                  : {}
                              }
                            >
                              <Image
                                alt={attribute.label}
                                src={attribute.icon}
                                width={32}
                                height={32}
                              />
                            </ToggleGroupItem>
                          )
                        })}
                      </ToggleGroup>
                    </Field>

                    <Field>
                      <FieldLabel>Weapon Type</FieldLabel>
                      <ToggleGroup
                        type="multiple"
                        variant="outline"
                        value={tempWeaponTypes}
                        onValueChange={setTempWeaponTypes}
                      >
                        {WEAPON_TYPES.map((weaponType) => (
                          <ToggleGroupItem key={weaponType.value} value={weaponType.value}>
                            <Image
                              alt={weaponType.label}
                              src={weaponType.icon}
                              width={32}
                              height={32}
                            />
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </Field>
                  </FieldGroup> 
                </FieldSet>
              </form>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={handleCancelFilters}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="cursor-pointer"
                  onClick={handleSaveFilters}
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            size="icon"
            className="cursor-pointer"
            variant={showSprites ? "secondary" : "outline"}
            onClick={() => setShowSprites((prev) => !prev)}
            aria-pressed={showSprites}
            title={showSprites ? "Show icons" : "Show sprites"}
          >
            {showSprites ? <LayoutGrid /> : <Grid3x2 />}
          </Button>
        </div>
      </header>

      <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {filteredResonators.map((resonator) => {
          const hasDetailData = Boolean(
            resonator.weaponType &&
            resonator.stats?.hp &&
            resonator.stats?.atk &&
            resonator.stats?.def &&
            resonator.description !== "???"
          )

          const iconCardImageClassName =
            "object-contain w-full h-full"
          const spriteCardImageClassName =
            "object-cover w-full h-full"

          const assets = resonator.weaponType ? getResonatorAssets(resonator as Resonator) : undefined
          const fallbackSprite = `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/sprite.png`
          const fallbackIcon = `/assets/resonators/${resonator.rarity}_stars/${resonator.name}/icon.png`
          const displayImage = showSprites
            ? assets?.sprite ?? fallbackSprite
            : assets?.image ?? fallbackIcon
          const attributeIcon = assets?.attribute ?? `/assets/attributes/${resonator.attribute}.png`
          const weaponTypeIcon = assets?.weaponType ?? `/assets/weapontType/${resonator.weaponType}.png`

          const displayCardImageClassName = showSprites ? spriteCardImageClassName : iconCardImageClassName
          const displayPreviewImageClassName = showSprites ? spritePreviewImageClassName : iconPreviewImageClassName

          const cardContent = (
            <Card
              className={cn(
                "transition-transform duration-300 border-none hover:scale-105 will-change-transform p-0 gap-0 overflow-hidden",
                getRarityGradient(resonator.rarity),
                !hasDetailData && "opacity-70 cursor-not-allowed"
              )}
              style={{ backfaceVisibility: 'hidden', perspective: 1000 }}
            >
              <div className="absolute right-1 top-1 z-10 transform-gpu bg-accent p-1 rounded-full">
                <div 
                  className="rounded-full" 
                  style={{ 
                    backfaceVisibility: 'hidden',
                    borderColor: getAttributeColor(resonator.attribute),
                    ...getAttributeBackgroundStyle(resonator.attribute, 0.5) 
                  }}
                >
                  <Image
                    alt="Attribute"
                    width={25}
                    height={25}
                    src={attributeIcon}
                  />
                </div>

                <Image 
                  alt="Weapon Type"
                  width={25}
                  height={25}
                  src={weaponTypeIcon}
                  className="mt-2"
                />
              </div>

              {resonator.isNew && (
                <div className="absolute right-1 top-1 z-10 transform-gpu" style={{ backfaceVisibility: 'hidden' }}>
                  <Badge className="text-white text-xs bg-red-600/80 ">
                    New
                  </Badge>
                </div>
              )}
              {!hasDetailData && (
                <div className="absolute left-1 top-1 z-10 transform-gpu" style={{ backfaceVisibility: 'hidden' }}>
                  <Badge variant="outline" className="bg-background/80 text-xs">
                    Unavailable
                  </Badge>
                </div>
              )}
              <Image
                alt={resonator.name}
                src={displayImage}
                width={200}
                height={200}
                className={displayCardImageClassName}
                style={{ backfaceVisibility: 'hidden' }}
              />
              <div className="bg-accent/80 w-full border-t-4 border-rarity-5 p-2 text-center">
                <CardTitle className="text-sm">{resonator.name}</CardTitle>
              </div>
            </Card>
          )

          return (
            <HoverCard key={resonator.id}>
              <HoverCardTrigger asChild>
                {hasDetailData ? (
                  <Link href={`/resonators/${resonator.name}`}>
                    {cardContent}
                  </Link>
                ) : (
                  <div aria-disabled="true" className="pointer-events-none">
                    {cardContent}
                  </div>
                )}
              </HoverCardTrigger>
              {hasDetailData && assets && (
                <HoverCardContent side="top" className="w-fit">
                  {/** Resolve labels so alt text is always a string */ }
                  {(() => {
                    const weaponTypeLabel = resonator.weaponType ?? "Weapon type"
                    const attributeLabel = resonator.attribute ?? "Attribute"

                    return (
                  <div className="flex items-center gap-4">
                    <Image
                      src={displayImage}
                      alt={resonator.name}
                      width={64}
                      height={64}
                      className={displayPreviewImageClassName}
                    />

                    <div className="flex flex-col gap-2">
                      <h2 className="text-2xl font-medium">{resonator.name}</h2>

                      <div className="flex gap-2">
                        <Badge
                          variant="outline"
                          className="flex gap-2 text-sm font-medium"
                          style={{
                            borderColor: getAttributeColor(resonator.attribute),
                            ...getAttributeBackgroundStyle(resonator.attribute, 0.15)
                          }}
                        >
                          <Image
                            src={assets.attribute}
                            alt={attributeLabel}
                            width={20}
                            height={20}
                          />
                          <span style={{ color: getAttributeColor(resonator.attribute) }}>
                            {resonator.attribute}
                          </span>
                        </Badge>
                        <Badge variant="outline" className="flex gap-2 text-sm">
                          <Image
                            src={assets.weaponType}
                            alt={weaponTypeLabel}
                            width={20}
                            height={20}
                          />
                          {resonator.weaponType}
                        </Badge>
                      </div>
                    </div>
                  </div>
                    )
                  })()}
                </HoverCardContent>
              )}
            </HoverCard>
          );
        })}
      </main>
    </div>
  )
}
