import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Search } from "lucide-react";
import "./globals.css";

import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { cookies } from "next/headers";

import { ThemeProvider } from "@/components/theme-provider"
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb"
import { SearchDialogContent } from "@/components/search-dialog-content"
import resonatorsData from "@/app/data/resonators/index.json"
import { Resonator } from "@/app/types/resonator"

import { Button } from "@/components/ui/button"
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
  title: "Tethys Hub",
  description: "Wuwa Database",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies()
  const defaultClose = cookieStore.get("sidebar_state")?.value === "false"
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={defaultClose}>
            <AppSidebar />
            <SidebarInset>
              <header className="flex justify-between h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]">
                <div className="flex items-center gap-4 px-4">
                  <SidebarTrigger className="-ml-1 cursor-pointer" variant="outline" size="icon" />
                  <DynamicBreadcrumb />
                </div>

                <div className="flex items-center gap-2 px-4">
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
              </header>

              <main className="py-6 px-4 sm:py-12 sm:px-8 md:px-16 lg:px-32 xl:py-20 xl:px-80">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
