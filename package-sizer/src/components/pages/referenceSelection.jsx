"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight } from "lucide-react"
import TemplateProcess from "./TemplateProcess"
import Navbar from "./Navbar"

export default function ReferenceSelection({ imageUrl, referenceObjects, onReferenceSelected })
{
  const [selectedReference, setSelectedReference] = useState("")
  const [imgUrl, setImageUrl] = useState("");
 const [dimensions, setDimensions] = useState(null);

  const handleContinue = () =>
  {
    if (selectedReference && imageUrl)
    {
      onReferenceSelected(selectedReference); // still invoke the original callback if needed
      
      fetch("http://127.0.0.1:5000/measure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ image_url: imageUrl })  // assumes imageUrl is cloudinaryUrl
      })
        .then(res => res.json())
        .then(data =>
        {
          console.log("Measurement response:", data.measurements[0]);
          console.log("url: ", data.annotated_image_url);

          let length=Math.ceil(data.measurements[0].length * 10) / 10;
         let width=Math.ceil(data.measurements[0].width * 10) / 10;
           setDimensions({
  length: length,
  width: width,
  height: 3
});

          console.log(dimensions);
           setImageUrl(data.annotated_image_url)
          
          // Optionally handle/display data here
        })
        .catch(err =>
        {
          console.error("Error measuring dimensions:", err);
        });
    }
  };

  return (
  
    !(imgUrl || dimensions) ? (
      < div className = "space-y-6" >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <Card className="overflow-hidden">
              <div className="relative aspect-video w-full">
                <img src={imageUrl || "/placeholder.svg"} alt="Uploaded image" className="object-contain w-full h-full" />
              </div>
            </Card>
          </div>

          <div className="flex-1">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Select a Reference Object</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Choose an object in your image whose size you know. This will be used to calculate the scale.
                    </p>

                    <Select value={selectedReference} onValueChange={setSelectedReference}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reference object" />
                      </SelectTrigger>
                      <SelectContent>
                        {referenceObjects.map((object) => (
                          <SelectItem key={object} value={object}>
                            {object}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Reference Object Sizes:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Credit Card</span>
                        <span className="font-medium">8.5 cm width</span>
                      </li>
                      
                      
                      <li className="flex justify-between">
                        <span>Coin (INR ₹10)</span>
                        <span className="font-medium">2.7 cm diameter</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sqaure</span>
                        <span className="font-medium">2x2 cm </span>
                      </li>
                    </ul>
                  </div>

                  <Button onClick={handleContinue} disabled={!selectedReference} className="w-full">
                    Measure Dimensions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div >): (
      <TemplateProcess imageUrl={imgUrl}
        referenceObject={selectedReference}
      dimensions={dimensions}
    />
    )
      
  )

}
