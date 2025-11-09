"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import { Button } from "./ui/button"
import Image from "next/image"
import { getAttributeColor } from "@/lib/utils"

interface Resonator {
  id: string
  name: string
  rarity: number
  attribute: string
  weaponType: string
  description: string
}

interface SearchDialogContentProps {
  resonators: Resonator[]
}

export function SearchDialogContent({ resonators }: SearchDialogContentProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Resonator[]>([])

  // Filter resonators based on search query
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchLower = query.toLowerCase()
    const filtered = resonators.filter(
      (resonator) =>
        resonator.name.toLowerCase().includes(searchLower) ||
        resonator.attribute.toLowerCase().includes(searchLower) ||
        resonator.weaponType.toLowerCase().includes(searchLower) ||
        resonator.description.toLowerCase().includes(searchLower)
    )

    setResults(filtered)
  }, [query, resonators])

  return (
    <>
      <InputGroup>
        <InputGroupInput
          placeholder="Search by name, attribute, weapon, or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      {/* Search Results */}
      <ScrollArea className="h-[400px]">
        {query && results.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No resonators found matching &quot;{query}&quot;
          </div>
        )}

        {!query && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            Start typing to search for resonators...
          </div>
        )}

        {results.length > 0 && (
          <div className="flex flex-col gap-2">
            {results.map((resonator) => (
              <Button
                key={resonator.id}
                variant="outline"
                className="w-full h-fit"
              >
                <Link
                  href={`/resonators/${resonator.id}`}
                  className="flex items-center gap-3 w-full"
                >
                  <Image
                    src={`/assets/resonators/${resonator.rarity}_stars/${resonator.name}/icon.png`}
                    alt={resonator.name}
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-lg">{resonator.name}</span>

                    <div className="flex gap-2">
                      <span className="text-sm font-medium" style={{ color: getAttributeColor(resonator.attribute) }}>
                        {resonator.attribute}
                      </span>
                      <span className="text-muted-foreground">{resonator.weaponType}</span>
                    </div>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        )}
      </ScrollArea>
    </>
  )
}
