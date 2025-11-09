"use client"

import { useState, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Item, ItemContent } from "@/components/ui/item"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AscensionPhase, AscensionMaterial } from "@/app/types/resonator"
import { getMaterialAssetPath } from "@/lib/utils"
import Image from "next/image"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AscensionSectionProps {
  ascensionData: AscensionPhase[] | null
}

export default function AscensionSection({ ascensionData }: AscensionSectionProps) {
  // Character levels
  const levels = [1, 20, 40, 50, 60, 70, 80, 90];
  const [startLevel, setStartLevel] = useState("1");
  const [endLevel, setEndLevel] = useState("90");

  // Skill levels (1-10)
  const skillLevels = Array.from({ length: 10 }, (_, i) => i + 1);
  const [startSkillLevel, setStartSkillLevel] = useState("1");
  const [endSkillLevel, setEndSkillLevel] = useState("10");

  // Generic handler for start level changes
  const createStartLevelHandler = (
    setStart: (value: string) => void,
    setEnd: (value: string) => void,
    currentEnd: string,
    availableLevels: number[]
  ) => (value: string) => {
    setStart(value);
    // If new start level is >= current end level, adjust end level
    if (parseInt(value) >= parseInt(currentEnd)) {
      const nextLevel = availableLevels.find(level => level > parseInt(value));
      if (nextLevel) {
        setEnd(nextLevel.toString());
      }
    }
  };

  // Generic handler for end level changes
  const createEndLevelHandler = (
    setEnd: (value: string) => void,
    setStart: (value: string) => void,
    currentStart: string,
    availableLevels: number[]
  ) => (value: string) => {
    setEnd(value);
    // If new end level is <= current start level, adjust start level
    if (parseInt(value) <= parseInt(currentStart)) {
      const prevLevel = [...availableLevels].reverse().find(level => level < parseInt(value));
      if (prevLevel !== undefined) {
        setStart(prevLevel.toString());
      }
    }
  };

  const handleStartLevelChange = createStartLevelHandler(setStartLevel, setEndLevel, endLevel, levels);
  const handleEndLevelChange = createEndLevelHandler(setEndLevel, setStartLevel, startLevel, levels);
  const handleStartSkillLevelChange = createStartLevelHandler(setStartSkillLevel, setEndSkillLevel, endSkillLevel, skillLevels);
  const handleEndSkillLevelChange = createEndLevelHandler(setEndSkillLevel, setStartSkillLevel, startSkillLevel, skillLevels);

  // Get available options for start level (must be less than end level)
  const availableStartLevels = levels.filter(level => level < parseInt(endLevel));

  // Get available options for end level (must be greater than start level)
  const availableEndLevels = levels.filter(level => level > parseInt(startLevel));

  // Get available options for start skill level (must be less than end skill level)
  const availableStartSkillLevels = skillLevels.filter(level => level < parseInt(endSkillLevel));

  // Get available options for end skill level (must be greater than start skill level)
  const availableEndSkillLevels = skillLevels.filter(level => level > parseInt(startSkillLevel));

  // Calculate total materials needed for character ascension
  const totalMaterials = useMemo(() => {
    if (!ascensionData) return null;

    const start = parseInt(startLevel);
    const end = parseInt(endLevel);

    // Find phases that fall within the selected range
    const relevantPhases = ascensionData.filter(phase => {
      const phaseLevel = parseInt(phase.level);
      return phaseLevel > start && phaseLevel <= end;
    });

    // Aggregate materials
    const materialsMap = new Map<string, number>();
    relevantPhases.forEach(phase => {
      phase.materials.forEach(material => {
        const current = materialsMap.get(material.name) || 0;
        materialsMap.set(material.name, current + material.amount);
      });
    });

    // Convert to array
    return Array.from(materialsMap.entries()).map(([name, amount]) => ({
      name,
      amount,
    }));
  }, [ascensionData, startLevel, endLevel]);

  return (
    <section id="ascension">
      <h2 className="text-2xl font-bold mb-6">Ascension Materials</h2>

      {/* ascension Content */}
      <div>
        <Tabs defaultValue="level">
          <TabsList>
            <TabsTrigger value="level">Character Ascension</TabsTrigger>
            <TabsTrigger value="talent">Skill Ascension</TabsTrigger>
          </TabsList>
          {/* Character Ascension */}
          <TabsContent value="level">
            <Item variant="outline">
              <ItemContent>
                <div className="">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4">Total Materials Needed</h3>

                    <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4">
                      <h4 className="font-medium text-base">Level</h4>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Select value={startLevel} onValueChange={handleStartLevelChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {availableStartLevels.map(level => (
                                <SelectItem key={level} value={level.toString()}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        <Select value={endLevel} onValueChange={handleEndLevelChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {availableEndLevels.map(level => (
                                <SelectItem key={level} value={level.toString()}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {!totalMaterials || totalMaterials.length === 0 ? (
                      <p className="text-muted-foreground">No materials needed for this level range</p>
                    ) : (
                      <div className="grid grid-cols-5 gap-3 p-10">
                        {totalMaterials.map((material, index) => (
                          <Card
                            key={index}
                            className="flex items-center p-5"
                          >
                            <div className="flex items-center gap-3">
                              <Image
                                src={getMaterialAssetPath(material.name)}
                                alt={material.name}
                                width={80}
                                height={80}
                                className="object-contain"
                              />
                            </div>
                            <span className="text-muted-foreground text-base">×{material.amount.toLocaleString()}</span>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </ItemContent>
            </Item>
          </TabsContent>

          {/* Skill Ascension */}
          <TabsContent value="talent">
            <Item variant="outline">
              <ItemContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h1>Ascension Materials Display</h1>
                  </div>

                  <Card>
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <CardTitle className="text-2xl">Skills</CardTitle>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm whitespace-nowrap">Include Inherit Skills & Minor Fortes</Label>
                        <Switch />
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      {["Normal Attack", "Resonance Skill", "Forte Circuit", "Resonance Liberation", "Intro Skill"].map((skillName) => (
                        <div key={skillName} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                          <span className="font-medium text-base">{skillName}</span>

                          <div className="flex flex-col sm:flex-row gap-4">
                            <Select value={startSkillLevel} onValueChange={handleStartSkillLevelChange}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {availableStartSkillLevels.map(level => (
                                    <SelectItem key={level} value={level.toString()}>
                                      {level}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>

                            <Select value={endSkillLevel} onValueChange={handleEndSkillLevelChange}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {availableEndSkillLevels.map(level => (
                                    <SelectItem key={level} value={level.toString()}>
                                      {level}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </ItemContent>
            </Item>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
