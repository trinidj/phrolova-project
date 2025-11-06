"use client"

import { useState, useMemo } from "react"
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
  getValue: (level: number) => string
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
      label: "HP",
      icon: "hp",
      getValue: () => currentHP.toLocaleString()
    },
    {
      label: "ATK",
      icon: "atk",
      getValue: () => currentATK.toLocaleString()
    },
    {
      label: "DEF",
      icon: "def",
      getValue: () => currentDEF.toLocaleString()
    },
    {
      label: "Energy Regen",
      icon: "energy",
      getValue: () => "100%"
    },
    {
      label: "Crit. Rate",
      icon: "cr",
      getValue: () => "5%"
    },
    {
      label: "Crit. DMG",
      icon: "cd",
      getValue: () => "150%"
    }
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

      <Table>
        <TableBody>
          {stats.map((stat) => (
            <TableRow key={stat.label} className="flex justify-between">
              <TableCell className="flex items-center gap-2 font-bold">
                <img
                  src={`/assets/stats/stat_${stat.icon}.png`}
                  width={20}
                  alt={stat.label}
                />
                {stat.label}
              </TableCell>
              <TableCell className="font-medium">{stat.getValue(currentLevel)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
