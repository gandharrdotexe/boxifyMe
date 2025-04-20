"use client"

import { useEffect, useRef, useState } from "react"
import * as fabric from "fabric"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, Check } from "lucide-react"

export function MeasurementCanvas({ imageUrl, referenceObject, onScaleCalculated }) {
  const canvasRef = useRef(null)
  const fabricCanvasRef = useRef(null)
  const [isCalibrated, setIsCalibrated] = useState(false)
  const [boxWidth, setBoxWidth] = useState(null)
  const [scale, setScale] = useState(null)
  const [isDrawing, setIsDrawing] = useState(true)

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 600,
      height: 400,
      selection: false,
    })
    fabricCanvasRef.current = canvas

    fabric.Image.fromURL(imageUrl, (img) => {
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.9

      img.scale(scale)

      img.set({
        left: canvas.width / 2,
        top: canvas.height / 2,
        originX: "center",
        originY: "center",
        selectable: false,
        evented: false,
      })

      canvas.add(img)
      canvas.renderAll()

      const rect = new fabric.Rect({
        left: canvas.width / 2 - 50,
        top: canvas.height / 2 - 25,
        width: 100,
        height: 50,
        fill: "rgba(0,0,0,0)",
        stroke: "#2563eb",
        strokeWidth: 2,
        strokeUniform: true,
        cornerColor: "#2563eb",
        cornerSize: 8,
        transparentCorners: false,
      })

      canvas.add(rect)
      canvas.setActiveObject(rect)

      canvas.on("object:modified", (e) => {
        if (e.target === rect) {
          const width = rect.getScaledWidth()
          setBoxWidth(width)
        }
      })
    })

    return () => {
      canvas.dispose()
    }
  }, [imageUrl])

  const handleCalibrate = () => {
    if (!boxWidth) return

    const pixelsPerCm = boxWidth / referenceObject.actualSize
    setScale(pixelsPerCm)
    setIsCalibrated(true)
    setIsDrawing(false)
    onScaleCalculated(pixelsPerCm)

    if (fabricCanvasRef.current) {
      const objects = fabricCanvasRef.current.getObjects()
      const rect = objects.find((obj) => obj.type === "rect")
      if (rect) {
        rect.set({
          selectable: false,
          evented: false,
          stroke: "#10b981",
        })
        fabricCanvasRef.current.renderAll()
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Draw Measurement Box</h2>
        <p className="text-muted-foreground mb-4">
          Draw a box around your {referenceObject.name.toLowerCase()} by resizing the blue rectangle. This will
          establish the scale for measurements.
        </p>
      </div>

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Calibration Instructions</AlertTitle>
        <AlertDescription>
          Resize the blue rectangle to precisely fit around your {referenceObject.name.toLowerCase()}. Make sure the
          width of your box matches the width of the reference object ({referenceObject.actualSize} cm).
        </AlertDescription>
      </Alert>

      <Card className="overflow-hidden">
        <div className="relative">
          <canvas ref={canvasRef} className="border border-border" />
        </div>
      </Card>

      {isCalibrated ? (
        <Alert className="bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-500" />
          <AlertTitle className="text-green-700">Calibration Complete</AlertTitle>
          <AlertDescription className="text-green-600">
            Scale established: {scale?.toFixed(2)} pixels per centimeter. You can now measure other objects in this
            image.
          </AlertDescription>
        </Alert>
      ) : (
        <Button onClick={handleCalibrate} disabled={!boxWidth} className="w-full">
          Complete Calibration
        </Button>
      )}
    </div>
  )
}
