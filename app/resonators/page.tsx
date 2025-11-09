"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, Search } from "lucide-react"

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
import { getAttributeColor, getAttributeBackgroundStyle } from "@/lib/utils"
import { ATTRIBUTES, WEAPON_TYPES, RARITIES } from "@/app/lib/constants"

import Image from "next/image"
import Link from "next/link"

export default function ResonatorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([])
  const [selectedWeaponTypes, setSelectedWeaponTypes] = useState<string[]>([])
  const [selectedRarities, setSelectedRarities] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Temporary filter states (before saving)
  const [tempAttributes, setTempAttributes] = useState<string[]>([])
  const [tempWeaponTypes, setTempWeaponTypes] = useState<string[]>([])
  const [tempRarities, setTempRarities] = useState<string[]>([])

  // Filter resonators based on search query and filters
  const filteredResonators = (resonatorsData.resonators as Resonator[]).filter((resonator) => {
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch = resonator.name.toLowerCase().includes(searchLower)

    const matchesAttribute = selectedAttributes.length === 0 ||
      selectedAttributes.includes(resonator.attribute.toLowerCase())

    const matchesWeapon = selectedWeaponTypes.length === 0 ||
      selectedWeaponTypes.includes(resonator.weaponType.toLowerCase())

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
      return 'bg-gradient-to-t from-rarity-5'
    }
    return 'bg-gradient-to-br from-rarity-4/20 to-rarity-4/5'
  }

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">Resonators</h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">Browse all playable characters in Wuthering Waves with their stats, abilities, and element types.</p>
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
                              <img
                                alt={attribute.label}
                                src={attribute.icon}
                                width={32}
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
                            <img
                              alt={weaponType.label}
                              src={weaponType.icon}
                              width={32}
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
        </div>
      </header>

      <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {filteredResonators.map((resonator) => {
          const assets = getResonatorAssets(resonator);
          return (
            <HoverCard key={resonator.id}>
              <HoverCardTrigger asChild>
                <Link href={`/resonators/${resonator.name}`}>
                  <Card
                    className={
                      `transition-transform rounded-lg duration-200 border-none hover:scale-105 will-change-transform p-0 gap-0 overflow-hidden ${getRarityGradient(resonator.rarity)}`
                    }
                  >
                    <div className="absolute left-1 top-1 z-10">
                      <Image
                        alt="Attribute"
                        width={32}
                        height={32}
                        src={assets.attribute}
                      />
                    </div>
                    <Image
                      alt={resonator.name}
                      src={assets.image}
                      width={200}
                      height={200}
                      className="object-contain w-full h-full transition-transform duration-200 hover:scale-110"
                    />
                    <div
                      className="text-center w-3/4 px-4 rounded-xl absolute bottom-2 left-1/2 -translate-x-1/2 backdrop-blur-2xl"
                    >
                      <CardTitle className="text-sm">{resonator.name}</CardTitle>
                    </div>
                  </Card>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent side="top" className="w-fit">
                <div className="flex items-center gap-4">
                  <Image
                    src={assets.image}
                    alt={resonator.name}
                    width={64}
                    height={64}
                    className="rounded"
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
                          alt={resonator.attribute}
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
                          alt={resonator.weaponType}
                          width={20}
                          height={20}
                        />
                        {resonator.weaponType}
                      </Badge>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        })}
      </main>
    </div>
  )
}