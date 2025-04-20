"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import * as fabric from "fabric"
import { Check, RefreshCw } from "lucide-react"

export default function BoundingBoxDrawer({ imageUrl, referenceObject, onBoundingBoxMeasured }) {
  const canvasRef = useRef(null)
  const fabricCanvasRef = useRef(null)
  const rectRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMeasuring, setIsMeasuring] = useState(false)

  useEffect(() => {
    // Initialize Fabric.js canvas
    if (canvasRef.current && !fabricCanvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        selection: false,
      })

      // Load the image
      fabric.Image.fromURL(imageUrl, (img) => {
        setIsLoading(false)

        const canvasWidth = fabricCanvasRef.current.getWidth() || 800
        const canvasHeight = fabricCanvasRef.current.getHeight() || 600

        const imgWidth = img.width || 0
        const imgHeight = img.height || 0

        const scaleX = canvasWidth / imgWidth
        const scaleY = canvasHeight / imgHeight
        const scale = Math.min(scaleX, scaleY)

        img.scale(scale)

        img.set({
          left: (canvasWidth - imgWidth * scale) / 2,
          top: (canvasHeight - imgHeight * scale) / 2,
          selectable: false,
          evented: false,
        })

        fabricCanvasRef.current.add(img)
        fabricCanvasRef.current.sendToBack(img)

        const rect = new fabric.Rect({
          left: canvasWidth / 2 - 100,
          top: canvasHeight / 2 - 50,
          width: 200,
          height: 100,
          fill: "rgba(0,0,0,0)",
          stroke: "#2563eb",
          strokeWidth: 2,
          strokeUniform: true,
          cornerColor: "#2563eb",
          cornerStrokeColor: "#ffffff",
          cornerSize: 10,
          transparentCorners: false,
          lockRotation: true,
        })

        rectRef.current = rect
        fabricCanvasRef.current.add(rect)
        fabricCanvasRef.current.setActiveObject(rect)
      })
    }

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose()
        fabricCanvasRef.current = null
      }
    }
  }, [imageUrl])

  const handleMeasure = () => {
    if (!rectRef.current) return

    setIsMeasuring(true)

    const pixelWidth = rectRef.current.getScaledWidth()

    onBoundingBoxMeasured(pixelWidth)

    setIsMeasuring(false)
  }

  const handleReset = () => {
    if (!fabricCanvasRef.current || !rectRef.current) return

    rectRef.current.set({
      left: (fabricCanvasRef.current.getWidth() || 800) / 2 - 100,
      top: (fabricCanvasRef.current.getHeight() || 600) / 2 - 50,
      width: 200,
      height: 100,
      scaleX: 1,
      scaleY: 1,
    })

    fabricCanvasRef.current.setActiveObject(rectRef.current)
    fabricCanvasRef.current.renderAll()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="text-center mb-2">
          <h3 className="text-lg font-medium">Draw a box around your {referenceObject}</h3>
          <p className="text-sm text-gray-500">
            Resize and position the blue box to match the width of your reference object
          </p>
        </div>

        <Card className="overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          )}
          <div className="canvas-container flex justify-center p-4">
            <canvas ref={canvasRef} />
          </div>
        </Card>

        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Box
          </Button>
          <Button onClick={handleMeasure} disabled={isLoading || isMeasuring}>
            <Check className="mr-2 h-4 w-4" />
            Confirm Measurement
          </Button>
        </div>
      </div>
    </div>
  )
}
