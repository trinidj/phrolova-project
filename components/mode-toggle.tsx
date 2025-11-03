"use client"

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      size="icon"
      variant="outline"
      className="cursor-pointer"
      onClick={() => setTheme(theme === 'light' ? 'dark': 'light')}
    >
      {theme === 'light' ? <Sun /> : <Moon />}
    </Button>
  )
}