// import { useState, Suspense, lazy } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Steps, Step } from "@/components/pages/steps"

// const ImageUpload = lazy(() => import("@/components/pages/ImgUpload"))
// const ReferenceSelection = lazy(() => import("@/components/pages/referenceSelection"))
// const BoundingBoxDrawer = lazy(() => import("@/components/pages/boxDrawer"))

// export default function ImgUpload() {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [imageUrl, setImageUrl] = useState("")
//   const [selectedReference, setSelectedReference] = useState("")
//   const [pixelWidth, setPixelWidth] = useState(0)
//   const [pixelsPerCm, setPixelsPerCm] = useState(0)

//   const referenceObjects = {
//     "Credit Card": 8.5,
//     "A4 Paper Width": 21,
//     "Standard Pen": 14,
//     "Coin (INR ₹10)": 2.7,
//   }

//   const handleImageUploaded = (url) => {
//     setImageUrl(url)
//     setCurrentStep(2)
//   }

//   const handleReferenceSelected = (reference) => {
//     setSelectedReference(reference)
//     setCurrentStep(3)
//   }

//   const handleBoundingBoxMeasured = (width) => {
//     setPixelWidth(width)
//     const realWorldWidth = referenceObjects[selectedReference]
//     const calculatedPixelsPerCm = width / realWorldWidth
//     setPixelsPerCm(calculatedPixelsPerCm)

//     console.log({
//       selectedReferenceObject: selectedReference,
//       boundingBox: { pixelWidth: width },
//       calculatedPixelsPerCm,
//     })
//   }

//   return (
//     <main className="container mx-auto py-8 px-4">
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>Image Measurement Tool</CardTitle>
//           <CardDescription>
//             Upload an image and define a reference object to calculate real-world measurements.
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <Steps currentStep={currentStep} className="mb-8">
//             <Step title="Upload Image" description="Select and upload an image" />
//             <Step title="Select Reference" description="Choose a reference object" />
//             <Step title="Draw Bounding Box" description="Define the reference size" />
//           </Steps>

//           <Tabs defaultValue={`step-${currentStep}`} value={`step-${currentStep}`} className="w-full">
//             <TabsList className="grid grid-cols-3">
//               <TabsTrigger value="step-1" disabled={currentStep !== 1} onClick={() => setCurrentStep(1)}>
//                 Upload Image
//               </TabsTrigger>
//               <TabsTrigger value="step-2" disabled={currentStep < 2} onClick={() => imageUrl && setCurrentStep(2)}>
//                 Select Reference
//               </TabsTrigger>
//               <TabsTrigger
//                 value="step-3"
//                 disabled={currentStep < 3}
//                 onClick={() => selectedReference && setCurrentStep(3)}
//               >
//                 Draw Bounding Box
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="step-1" className="mt-6">
//               <Suspense fallback={<div>Loading Upload...</div>}>
//                 <ImageUpload onImageUploaded={handleImageUploaded} />
//               </Suspense>
//             </TabsContent>

//             <TabsContent value="step-2" className="mt-6">
//               <Suspense fallback={<div>Loading Reference Selection...</div>}>
//                 <ReferenceSelection
//                   imageUrl={imageUrl}
//                   referenceObjects={Object.keys(referenceObjects)}
//                   onReferenceSelected={handleReferenceSelected}
//                 />
//               </Suspense>
//             </TabsContent>

//             <TabsContent value="step-3" className="mt-6">
//               <Suspense fallback={<div>Loading Bounding Box Tool...</div>}>
//                 <BoundingBoxDrawer
//                   imageUrl={imageUrl}
//                   referenceObject={selectedReference}
//                   onBoundingBoxMeasured={handleBoundingBoxMeasured}
//                 />
//               </Suspense>
//             </TabsContent>
//           </Tabs>

//           {pixelsPerCm > 0 && (
//             <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-md">
//               <h3 className="text-lg font-medium text-green-800">Measurement Complete!</h3>
//               <p className="text-green-700">Scale factor: {pixelsPerCm.toFixed(2)} pixels per centimeter</p>
//               <p className="text-green-700">
//                 Reference object: {selectedReference} ({referenceObjects[selectedReference]} cm)
//               </p>
//               <p className="text-green-700">Measured width: {pixelWidth} pixels</p>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </main>
//   )
// }
