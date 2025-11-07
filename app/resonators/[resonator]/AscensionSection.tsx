"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Item, ItemContent } from "@/components/ui/item"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

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

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}


export default function AscensionSection() {
  // Character levels
  const levels = [1, 20, 40, 50, 60, 70, 80, 90];
  const [startLevel, setStartLevel] = useState("1");
  const [endLevel, setEndLevel] = useState("90");

  // Skill levels (1-10)
  const skillLevels = Array.from({ length: 10 }, (_, i) => i + 1);
  const [startSkillLevel, setStartSkillLevel] = useState("1");
  const [endSkillLevel, setEndSkillLevel] = useState("10");

  const handleStartLevelChange = (value: string) => {
    setStartLevel(value);
    // If new start level is >= current end level, adjust end level
    if (parseInt(value) >= parseInt(endLevel)) {
      const nextLevel = levels.find(level => level > parseInt(value));
      if (nextLevel) {
        setEndLevel(nextLevel.toString());
      }
    }
  };

  const handleEndLevelChange = (value: string) => {
    setEndLevel(value);
    // If new end level is <= current start level, adjust start level
    if (parseInt(value) <= parseInt(startLevel)) {
      const prevLevel = levels.reverse().find(level => level < parseInt(value));
      if (prevLevel !== undefined) {
        setStartLevel(prevLevel.toString());
      }
      levels.reverse(); // restore original order
    }
  };

  const handleStartSkillLevelChange = (value: string) => {
    setStartSkillLevel(value);
    // If new start level is >= current end level, adjust end level
    if (parseInt(value) >= parseInt(endSkillLevel)) {
      const nextLevel = skillLevels.find(level => level > parseInt(value));
      if (nextLevel) {
        setEndSkillLevel(nextLevel.toString());
      }
    }
  };

  const handleEndSkillLevelChange = (value: string) => {
    setEndSkillLevel(value);
    // If new end level is <= current start level, adjust start level
    if (parseInt(value) <= parseInt(startSkillLevel)) {
      const prevLevel = [...skillLevels].reverse().find(level => level < parseInt(value));
      if (prevLevel !== undefined) {
        setStartSkillLevel(prevLevel.toString());
      }
    }
  };

  // Get available options for start level (must be less than end level)
  const availableStartLevels = levels.filter(level => level < parseInt(endLevel));

  // Get available options for end level (must be greater than start level)
  const availableEndLevels = levels.filter(level => level > parseInt(startLevel));

  // Get available options for start skill level (must be less than end skill level)
  const availableStartSkillLevels = skillLevels.filter(level => level < parseInt(endSkillLevel));

  // Get available options for end skill level (must be greater than start skill level)
  const availableEndSkillLevels = skillLevels.filter(level => level > parseInt(startSkillLevel));

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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h1>Ascension Materials Display</h1>
                  </div>

                  <Card>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <span className="font-medium text-base">Level</span>

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
                    </CardContent>
                  </Card>
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
                      {/* Normal Attack */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <span className="font-medium text-base">Normal Attack</span>

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

                      {/* Resonance Skill */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <span className="font-medium text-base">Resonance Skill</span>

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
                      
                      {/* Forte Circuit */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <span className="font-medium text-base">Forte Circuit</span>

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

                      {/* Resonance Liberation */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <span className="font-medium text-base">Resonance Liberationl</span>

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

                      {/* Intro Skill */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <span className="font-medium text-base">Intro Skill</span>

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
