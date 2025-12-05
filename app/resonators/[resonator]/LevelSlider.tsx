"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"
import { Resonator, calculateStat } from "@/app/types/resonator"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface StatConfig {
  label: string
  icon: string
  value: string
}

export default function LevelSlider({ resonator }: { resonator: Resonator }) {
  const [level, setLevel] = useState([1]);
  const currentLevel = level[0];

  const currentHP = useMemo(() => {
    return calculateStat(resonator.stats.hp, currentLevel);
  }, [currentLevel, resonator.stats.hp]);

  const currentATK = useMemo(() => {
    return calculateStat(resonator.stats.atk, currentLevel);
  }, [currentLevel, resonator.stats.atk]);

  const currentDEF = useMemo(() => {
    return calculateStat(resonator.stats.def, currentLevel);
  }, [currentLevel, resonator.stats.def])

  const stats: StatConfig[] = useMemo(() => [
    {
      label: "Base HP",
      icon: "hp",
      value: currentHP.toLocaleString()
    },
    {
      label: "Base ATK",
      icon: "atk",
      value: currentATK.toLocaleString()
    },
    {
      label: "Base DEF",
      icon: "def",
      value: currentDEF.toLocaleString()
    },
  ], [currentHP, currentATK, currentDEF])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <span>Level</span>
          <span>{level[0]}</span>
        </div>

        <Slider
          value={level}
          onValueChange={setLevel}
          min={1}
          max={90}
          step={1}
        />
      </div>

      <Table className="bg-accent border-2 rounded-sm overflow-hidden">
        <TableBody>
          {stats.map((stat) => (
            <TableRow key={stat.label} className="flex justify-between">
              <TableCell className="flex items-center gap-2 font-bold">
                <Image
                  src={`/assets/stats/stat_${stat.icon}.png`}
                  width={24}
                  height={24}
                  alt={stat.label}
                />
                {stat.label}
              </TableCell>
              <TableCell className="font-medium">{stat.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
