"use client";
 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DemoModelPage from "../../DielineBox";
import Navbar from "./Navbar";
export default function TemplateProcess({ imageUrl, referenceObject, dimensions, onBack }) {
  const [processingStep, setProcessingStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
 const [showTemplateView, setShowTemplateView] = useState(false);
  const navigate = useNavigate();
  // Simulate processing steps
  useEffect(() => {
    const steps = [
      { step: 1, time: 1500 },
      
      { step: 3, time: 1800 },
      { step: 4, time: 2200 },
    ];
      
    


 
    const timeoutIds = [];
 
    steps.forEach((stepInfo) => {
      const id = setTimeout(() => {
        setProcessingStep(stepInfo.step);
        if (stepInfo.step === steps.length) {
          setIsComplete(true);
        }
      }, stepInfo.time * (stepInfo.step - 1));
 
      timeoutIds.push(id);
    });
 
    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, []);
    
    const handleViewTemplate = () => {
  navigate("/templates", {
    state: {
      dimensions,
    },
  });
};
 
  const steps = [
    { id: 1, name: "Analyzing image" },
   
    { id: 3, name: "Applying templates" },
    { id: 4, name: "Finalizing results" },
  ];
 
  return showTemplateView ? (
  <DemoModelPage />
) : (
  <main className="container mx-auto py-8 px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Processing Your Image</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="relative aspect-video w-full">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Uploaded image"
                className="object-contain w-full h-full"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Reference Object: {referenceObject}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded-md text-center">
                  <div className="text-sm text-gray-500">Length</div>
                  <div className="font-medium">{dimensions.length} cm</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md text-center">
                  <div className="text-sm text-gray-500">Width</div>
                  <div className="font-medium">{dimensions.width} cm</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md text-center">
                  <div className="text-sm text-gray-500">Height</div>
                  <div className="font-medium">{dimensions.height} cm</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Template Processing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <ul className="space-y-4">
              {steps.map((step) => (
                <li key={step.id} className="flex items-center">
                  <div className="mr-4">
                    {processingStep > step.id ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : processingStep === step.id ? (
                      <div className="h-6 w-6 flex items-center justify-center">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                      </div>
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${processingStep >= step.id ? "text-gray-900" : "text-gray-500"}`}>
                      {step.name}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {isComplete && (
              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-md">
                <h3 className="text-lg font-medium text-green-800 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Processing Complete!
                </h3>
                <p className="text-green-700 mt-2">
                  Your template has been successfully generated based on the object dimensions.
                </p>
                <Button className="mt-4 w-full" onClick={handleViewTemplate}>
                  View Generated Template 
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  </main>
);

}