"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom";

import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calculator } from "lucide-react"
import Navbar from "./Navbar";

const MATERIALS = {
  "standard-cardboard": { name: "Standard Cardboard", cost: 120 },
  "corrugated-single": { name: "Single Wall Corrugated Board", cost: 180 },
  "corrugated-double": { name: "Double Wall Corrugated Board", cost: 250 },
  "kraft-paper": { name: "Kraft Paper", cost: 100 },
  "recycled-cardboard": { name: "Recycled Cardboard", cost: 90 },
  "premium-cardboard": { name: "Premium Cardboard", cost: 350 },
}

export default function CostEstimationPage() {
 
const [searchParams] = useSearchParams();
  const length = searchParams.get("length");
  const width = searchParams.get("width");
  const height = searchParams.get("height");
  const initialDimensions = {
    height: parseFloat(searchParams.get("height") || "10"),
    width: parseFloat(searchParams.get("width") || "5"),
    length: parseFloat(searchParams.get("length") || "4"),
  }

  const [dimensions, setDimensions] = useState(initialDimensions)
  const [material, setMaterial] = useState("standard-cardboard")
  const [quantity, setQuantity] = useState(100)
  const [estimatedCost, setEstimatedCost] = useState({ perUnit: 0, total: 0, area: 0 })

  useEffect(() => {
    calculateCost()
  }, [dimensions, material, quantity])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDimensions((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }))
  }

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value) || 1)
  }

  const calculateCost = () => {
    const { height, width, length } = dimensions

    const glueTabWidth = 0.5
    const flapHeight = (1 / 3) * length
    const tuckHeight = (3 / 4) * length

    const mainPanelsArea =
      width * height * 2 +
      length * height * 2 +
      glueTabWidth * height

    const flapsArea =
      length * flapHeight * 4 +
      width * tuckHeight * 2

    const totalAreaCm2 = mainPanelsArea + flapsArea
    const totalAreaM2 = totalAreaCm2 / 10000
    const areaWithWaste = totalAreaM2 * 1.1

    const materialCostPerM2 = MATERIALS[material].cost
    const costPerUnit = areaWithWaste * materialCostPerM2
    const totalCost = costPerUnit * quantity

    setEstimatedCost({
      perUnit: costPerUnit,
      total: totalCost,
      area: areaWithWaste,
    })
  }

    return (
      <><Navbar /><main className="container mx-auto py-8 px-4 mt-[100px]">


            <Card>
                <CardHeader>
                    <CardTitle>Packaging Cost Estimation</CardTitle>
                    <CardDescription>
                        Calculate the estimated cost of your packaging based on dimensions and material
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium mb-4">Box Dimensions</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="height">Height (H) in cm</Label>
                                        <Input
                                            id="height"
                                            name="height"
                                            type="number"
                                            step="0.1"
                                            min="0.1"
                                            value={dimensions.height}
                                            onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="width">Width (W) in cm</Label>
                                        <Input
                                            id="width"
                                            name="width"
                                            type="number"
                                            step="0.1"
                                            min="0.1"
                                            value={dimensions.width}
                                            onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="length">Length (L) in cm</Label>
                                        <Input
                                            id="length"
                                            name="length"
                                            type="number"
                                            step="0.1"
                                            min="0.1"
                                            value={dimensions.length}
                                            onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="material">Material Type</Label>
                                    <Select value={material} onValueChange={setMaterial}>
                                        <SelectTrigger id="material">
                                            <SelectValue placeholder="Select material type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(MATERIALS).map(([key, { name }]) => (
                                                <SelectItem key={key} value={key}>
                                                    {name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-muted-foreground">
                                        Base cost: ₹{MATERIALS[material].cost} per m²
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="quantity">Quantity</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        min="1"
                                        step="1"
                                        value={quantity}
                                        onChange={handleQuantityChange} />
                                    <p className="text-xs text-muted-foreground">Number of boxes to produce</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg border">
                            <div className="flex items-center mb-6">
                                <Calculator className="h-6 w-6 mr-2 text-primary" />
                                <h3 className="text-lg font-medium">Cost Estimation</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-2 border-b">
                                    <span className="text-muted-foreground">Material</span>
                                    <span className="font-medium">{MATERIALS[material].name}</span>
                                </div>

                                <div className="flex justify-between items-center pb-2 border-b">
                                    <span className="text-muted-foreground">Material Area (with 10% waste)</span>
                                    <span className="font-medium">{estimatedCost.area.toFixed(3)} m²</span>
                                </div>

                                <div className="flex justify-between items-center pb-2 border-b">
                                    <span className="text-muted-foreground">Cost per Box</span>
                                    <span className="font-medium">₹{estimatedCost.perUnit.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between items-center pb-2 border-b">
                                    <span className="text-muted-foreground">Quantity</span>
                                    <span className="font-medium">{quantity} boxes</span>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-lg font-medium">Total Cost</span>
                                    <span className="text-lg font-bold text-primary">₹{estimatedCost.total.toFixed(2)}</span>
                                </div>

                                <div className="mt-6 pt-4 border-t text-sm text-muted-foreground">
                                    <p>
                                        * Estimation includes material cost only. Additional costs for printing, die-cutting, and labor may apply.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </main></>
  )
}
