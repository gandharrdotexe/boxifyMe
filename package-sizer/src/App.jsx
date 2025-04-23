import Navbar from "./components/pages/Navbar"
import ImageUploadPage from "./components/pages/ImageUploadPage"
import ImageUpload from "./components/pages/imageUpload"

import ImgUpload from "./components/pages/ImgUpload"
import TuckboxGenerator from "./TuckboxGenerato"
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
    
    <ImageUpload onImageUploaded />

    

  )
}