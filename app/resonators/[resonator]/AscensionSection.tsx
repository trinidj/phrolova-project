import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Item } from "@/components/ui/item"

export default function AscensionSection() {
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
