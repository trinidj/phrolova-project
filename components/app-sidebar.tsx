import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
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
      title: "Sonata Gallery",
      url: "/sonata-gallery",
      icon: "/assets/echoes_icon.png"
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { navMain } = data

  return (
    <Sidebar {...props} collapsible="icon" variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild size="lg" tooltip={item.title}>
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
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
