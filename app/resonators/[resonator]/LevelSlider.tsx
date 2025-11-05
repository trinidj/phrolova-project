"use client"

import { useState, useMemo } from "react"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

interface ResonatorStats {
  HP?: { title: string; min: number; max: number }
  ATK?: { title: string; min: number; max: number }
  DEF?: { title: string; min: number; max: number }
  ENERGY?: number
  CR?: number
  CD?: number
  HEALING_BONUS?: number
}

export default function LevelSlider({ resonator }: { resonator: ResonatorStats }) {
  const [level, setLevel] = useState([1]);
  const currentLevel = level[0];

  const currentHP = useMemo(() => {
    if (!resonator.HP) return 0;
    const { min, max } = resonator.HP;

    const hp = min + ((currentLevel - 1) * (max - min)) / 89;
    return Math.round(hp);
  }, [level, resonator.HP]);


  const currentATK = useMemo(() => {
    if (!resonator.ATK) return 0;
    const { min, max } = resonator.ATK;

    const atk = min + ((currentLevel - 1) * (max - min)) / 89;
    return Math.round(atk);
  }, [level, resonator.ATK]);

  const currentDEF = useMemo(() => {
    if (!resonator.DEF) return 0;
    const { min, max } = resonator.DEF;

    const def = min + ((currentLevel - 1) * (max - min)) / 89;
    return Math.round(def);
  }, [level, resonator.DEF])

  return (
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

      <Table>
        <TableBody>
          {/* HP */}
          <TableRow className="flex justify-between">
            <TableCell className="flex items-center gap-2 font-bold">
              <img
                src="/assets/stats/stat_hp.png"
                width={20}
                alt="HP"
              />
              {resonator.HP?.title}
            </TableCell>
            <TableCell>{currentHP.toLocaleString()}</TableCell>
          </TableRow>

          {/* ATK*/}
          <TableRow className="flex justify-between">
            <TableCell className="flex items-center gap-2 font-bold">
              <img
                src="/assets/stats/stat_atk.png"
                width={20}
                alt="ATK"
              />
              {resonator.ATK?.title}
            </TableCell>
            <TableCell>{currentATK.toLocaleString()}</TableCell>
          </TableRow>

          {/* DEF */}
          <TableRow className="flex justify-between">
            <TableCell className="flex items-center gap-2 font-bold">
              <img
                src="/assets/stats/stat_def.png"
                width={20}
                alt="ATK"
              />
              {resonator.DEF?.title}
            </TableCell>
            <TableCell>{currentDEF.toLocaleString()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
