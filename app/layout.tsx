import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import resonatorsData from "@/app/data/resonators/index.json"
import { Resonator } from "@/app/types/resonator";

import { ThemeProvider } from "@/components/theme-provider"
import NavBar from "@/components/nav-bar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar";

import { cookies } from "next/headers";

import { SearchDialogContent } from "@/components/search-dialog-content";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phrolova Project",
  description: "Wuwa Database",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { 
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <div className="flex min-h-screen w-full flex-col">
              <header className="bg-card border-b-2 border-rarity-5/30">
                <div className="flex h-16 items-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-80 justify-between">
                  {/* Mobile Navbar */}
                  <div className="flex items-center gap-2 md:hidden">
                    <SidebarTrigger />
                    <span className="text-sm font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                      Phrolova Project
                    </span>
                  </div>

                  {/* Desktop Navbar */}
                  <div className="hidden md:flex w-full justify-center">
                    <NavBar />
                  </div>

                  <div className="shrink-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Search />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Search Resonators</DialogTitle>
                        </DialogHeader>
                        <SearchDialogContent resonators={resonatorsData.resonators as Resonator[]} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </header>

              <main className="py-6 px-4 sm:py-12 sm:px-8 md:px-16 lg:px-32 xl:py-20 xl:px-80">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
