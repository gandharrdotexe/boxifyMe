"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"

export default function ImageUpload({ onImageUploaded }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
  const { toast } = useToast()
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]

    if (!selectedFile) return

    if (!["image/jpeg", "image/jpg", "image/png"].includes(selectedFile.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG or PNG image.",
        variant: "destructive",
      })
      return
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      })
      return
    }

    setFile(selectedFile)

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("image", file)
      formData.append("userId", "user123")
      formData.append("imageName", file.name)

      const response = await axios.post("http://localhost:5001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log(response.data.imageUrl);// Make sure this matches your backend
      setImageUrl(response.data.imageUrl);
      toast({
        title: "Upload successful",
        description: "Your image has been uploaded successfully.",
      })

      onImageUploaded(imageUrl)
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/jpg,image/png"
        className="hidden"
      />

      <Card
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
          preview ? "border-green-300" : "border-gray-300"
        }`}
        onClick={triggerFileInput}
      >
        {preview ? (
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md mx-auto mb-4">
              <img
                src={preview || "/placeholder.svg"}
                alt="Preview"
                className="max-h-64 max-w-full mx-auto rounded-md object-contain"
              />
            </div>
            <p className="text-sm text-gray-500">Click to change image</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-lg font-medium">Click to upload an image</p>
            <p className="text-sm text-gray-500 mt-1">JPEG or PNG, max 5MB</p>
          </div>
        )}
      </Card>

      {preview && (
        <div className="flex justify-center">
          <Button onClick={handleUpload} disabled={isUploading} className="w-full max-w-xs">
            {isUploading ? (
              <>
                <span className="animate-spin mr-2">◌</span>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
