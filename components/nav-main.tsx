"use client"

import Link from "next/link"
import Image from "next/image"

import { 
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: string
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarMenu className="gap-2">
        {items.map((item) => (
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
  )
}