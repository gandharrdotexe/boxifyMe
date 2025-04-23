import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

export default function BoundingBoxDrawer({ imageUrl, referenceObject, onBoundingBoxMeasured }) {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    console.log("[DEBUG] useEffect triggered");

    if (canvasRef.current && !fabricCanvasRef.current) {
      console.log("[DEBUG] Initializing Fabric canvas");

      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        selection: false,
      });

      fabricCanvasRef.current = canvas;

      // Set background color (optional)
      canvas.setBackgroundColor("lightgray", canvas.renderAll.bind(canvas));

      console.log("[DEBUG] Canvas initialized");
    }

    return () => {
      if (fabricCanvasRef.current) {
        console.log("[DEBUG] Disposing canvas");
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      {/* Render the canvas */}
      <canvas ref={canvasRef} />
    </div>
  );
}
