import Navbar from "./components/pages/Navbar"
import ImageUploadPage from "./components/pages/ImageUploadPage"
import ImageUpload from "./components/pages/imageUpload"
import TemplateProcess from "./components/pages/TemplateProcess"
import DemoModelPage from "./DielineBox"

import ReferenceSelection from "./components/pages/referenceSelection"
import { useState } from "react"
import BoundingBoxDrawer from "./components/pages/BoundingBoxDrawer"

export default function App()



{
  const [selectedReference, setSelectedReference] = useState("Credit card");
    const referenceObjects = {
    "Credit Card": 8.5,
    "A4 Paper Width": 21,
    "Standard Pen": 14,
    "Coin (INR ₹10)": 2.7,
    }
  const dimensions = {
    "length": 12.1,
    "width": 9,
    "depth":3
  }
  const handleReferenceSelected = (reference) => {
    setSelectedReference(reference)
    setCurrentStep(3)
  }
  

  const handleBoundingBoxMeasured = (width) => {
    setPixelWidth(width)

    // Calculate pixels per cm
    const realWorldWidth = referenceObjects[selectedReference]
    const calculatedPixelsPerCm = width / realWorldWidth
    setPixelsPerCm(calculatedPixelsPerCm)

    // Here you would typically send this data to the backend
    console.log({
      selectedReferenceObject: selectedReference,
      boundingBox: {
        pixelWidth: width,
      },
      calculatedPixelsPerCm: calculatedPixelsPerCm,
    })
  }
  return (
    
    // <ImageUpload  />
    
    // <TemplateProcess imageUrl="http://127.0.0.1:5000/static/annotated_image.jpg"
    //   referenceObject="2x2 cube"
    //   dimensions={dimensions}
    // />
    
<DemoModelPage/>
  )
}