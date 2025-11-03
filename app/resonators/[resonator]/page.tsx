import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card"
import resonatorsData from "@/app/data/resonators.json"

export default async function ResonatorDetails({
  params,
}: {
  params: Promise<{ resonator: string }>
}) {
  const resonatorName = (await params).resonator
  const resonator = resonatorsData.resonators.find(
    (r) => r.name === resonatorName
  )

  if (!resonator) {
    return <div>Resonator not found</div>
  }

  return (
    <>
      <header>
        <Card className="w-fit">
          <CardHeader className="flex items-center">
            <img 
              alt="Electro"
              src={resonator.attributeUrl}
            />
            <div className="flex flex-col">
              <CardTitle className="text-xl">{resonator.name}</CardTitle>
              <CardDescription>{resonator.attribute}</CardDescription>
            </div>
            
          </CardHeader>
          <CardContent className="p-0">
            <img
              alt="Sprite"
              src={resonator.spriteUrl}
              className="w-lg"
            />
          </CardContent>
        </Card>
      </header>
    </>
  )
}