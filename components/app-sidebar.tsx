import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "./ui/separator"

const data = {
  navHeader: { title: "Tethys Hub", icon: "/assets/The_Black_Shores_Emblem.png" },
  navMain: [
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
      title: "Echos",
      url: "/echos",
      icon: "/assets/echoes_icon.png"
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { navHeader, navMain } = data

  return (
    <Sidebar {...props} collapsible="icon" variant="floating">
      <SidebarHeader className="flex gap-0 flex-row items-center">
        <SidebarMenuButton asChild size="lg">
          <Link href="/">
            <Image 
              src={navHeader.icon}
              alt="Tethys Hub"
              width={30}
              height={30}
              className="object-contain"
            />
            <span className="font-medium text-lg">{navHeader.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>

      <Separator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {navMain.map((item) => (
              <Tooltip key={item.title}>
                <TooltipTrigger>
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size="lg">
                      <Link href={item.url}>
                        <Image 
                          src={item.icon}
                          alt="Resonator Icon"
                          width={30}
                          height={30}
                          className="object-contain"
                        />
                        <span className="font-semibold">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <span className="font-semibold">{item.title}</span>
                </TooltipContent>
              </Tooltip>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
