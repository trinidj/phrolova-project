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
                        <ToggleGroupItem value="5">
                          5★
                        </ToggleGroupItem>
                        <ToggleGroupItem value="4">
                          4★
                        </ToggleGroupItem>
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
                        <ToggleGroupItem
                          value="aero"
                        >
                          <img 
                            alt="Aero"
                            src="/assets/attributes/Aero.png" 
                            width={32}
                          />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="electro"
                        >
                          <img 
                            alt="Electro"
                            src="/assets/attributes/Electro.png"
                            width={32}
                          />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="fusion"
                        >
                          <img 
                            alt="Fusion"
                            src="/assets/attributes/Fusion.png"
                            width={32}
                          />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="glacio"
                        >
                          <img 
                            alt="Glacio"
                            src="/assets/attributes/Glacio.png"
                            width={32}
                          />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="havoc"
                        >
                          <img 
                            alt="Havoc"
                            src="/assets/attributes/Havoc.png"
                            width={32}
                          />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="spectro"
                        >
                          <img 
                            alt="Spectro"
                            src="/assets/attributes/Spectro.png"
                            width={32}
                          />
                        </ToggleGroupItem>
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
                        <ToggleGroupItem
                          value="broadblade"
                        >
                          <img
                            alt="Broadblade"
                            src="/assets/weapons/Broadblade_icon.png"
                            width={32}
                          />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="pistol"
                        >
                          <img
                            alt="Pistol"
                            src="/assets/weapons/Pistols_Icon.png"
                            width={32}
                          />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="rectifier"
                        >
                          <img
                            alt="Rectifier"
                            src="/assets/weapons/Rectifier_Icon.png"
                            width={32}
                          />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="gauntlet"
                        >
                          <img
                            alt="Gauntlet"
                            src="/assets/weapons/Gauntlets_Icon.png"
                            width={32}
                          />
                        </ToggleGroupItem>
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
                      `transition-transform rounded-lg duration-200 hover:scale-105 will-change-transform p-0 gap-0 border-0 overflow-hidden ${getRarityGradient(resonator.rarity)}`
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
                    <div className="bg-sidebar/73 px-4 rounded-xl absolute bottom-2 left-1/2 -translate-x-1/2">
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
                      <Badge variant="outline" className="flex gap-2 text-sm">
                        <Image
                          src={assets.attribute}
                          alt={resonator.attribute}
                          width={20}
                          height={20}
                        />
                        {resonator.attribute}
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