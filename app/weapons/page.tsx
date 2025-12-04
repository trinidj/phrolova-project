"use client"

export default function SonataGalleryPage() {

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">Weapons</h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">Browse all Weapons in Wuthering Waves</p>
        </div>
      </header>

      <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        
      </main>
    </div>
  )
}