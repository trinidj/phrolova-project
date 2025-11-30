import * as React from "react"
import { NavMain } from "@/components/nav-main"
import { GameSwitcher } from "@/components/game-switcher"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"

const data = {
  games: [
    {
      title: "Phrolova Project",
      logo: "/assets/site_icon.png"
    },
    {
      title: "Gambit Project",
      logo: "/assets/site_icon.png"
    }
  ],
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: "/assets/home_icon.png"
    },
    {
      title: "Resonators",
      url: "/resonators",
      icon: "/assets/resonators_icon.png"
    },
    {
      title: "Weapons",
      url: "/weapons",
      icon: "/assets/weapons_icon.png"
    },
    {
      title: "Echoes",
      url: "/echoes",
      icon: "/assets/echoes_icon.png"
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} collapsible="icon">
      <SidebarHeader>
        <GameSwitcher games={data.games} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
