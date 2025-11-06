import { AscensionPhase } from "@/app/types/resonator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface AscensionSectionProps {
  ascension?: AscensionPhase[]
  resonatorName: string
}

export default function AscensionSection({ ascension, resonatorName }: AscensionSectionProps) {
  // if (!ascension || ascension.length === 0) {
  //   return (
  //     <section id="ascension">
  //       <h2 className="text-2xl font-bold mb-4">Ascension</h2>
  //       <p className="text-muted-foreground">Ascension data not yet available for {resonatorName}.</p>
  //     </section>
  //   )
  // }

  return (
    <section id="ascension">
      <h2 className="text-2xl font-bold mb-6">Ascension Materials</h2>

      {/* ascension Content */}
      <div>
        <Tabs defaultValue="Level">
          <TabsList>
            <TabsTrigger value="level">Character Ascension</TabsTrigger>
            <TabsTrigger value="talent">Skill Ascension</TabsTrigger>
          </TabsList>
          <TabsContent value="level">
            <Item variant="outline">
              
            </Item>  
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
