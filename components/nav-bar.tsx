"use client"

import { navItems } from "@/app/config/nav"

import Link from "next/link";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export default function NavBar() {
  const isMobile = useIsMobile()

  return (
    <nav className="flex w-full items-center justify-between gap-6">
      <div className="shrink-0">
        <Image 
          src="/assets/site_icon.png"
          alt="Site Icon"
          width={48}
          height={48}
          quality={100}
        />
      </div>

      <div className="flex-1 flex justify-center">
        <NavigationMenu viewport={isMobile}>
          <NavigationMenuList className="gap-3">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink asChild>
                  <div className="flex flex-row items-center gap-2">
                    <Image 
                      src={item.icon}
                      alt={`${item.title} Icon`}
                      width={24}
                      height={24}
                      quality={100}
                    />

                    <Link href={item.url}>
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </div>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}