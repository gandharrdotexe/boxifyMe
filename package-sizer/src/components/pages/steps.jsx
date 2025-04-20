import React from "react"
import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function Step({ title, description, isActive, isCompleted }) {
  return (
    <div className="flex items-center">
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            "h-8 w-8 rounded-full border flex items-center justify-center",
            isActive
              ? "border-primary bg-primary text-primary-foreground"
              : isCompleted
                ? "border-primary bg-primary text-primary-foreground"
                : "border-gray-300 bg-gray-100 text-gray-500"
          )}
        >
          {isCompleted ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <span className="text-sm font-medium">{isActive ? "●" : "○"}</span>
          )}
        </div>
      </div>
      <div className="ml-4">
        <p className={cn("text-sm font-medium", isActive || isCompleted ? "text-gray-900" : "text-gray-500")}>
          {title}
        </p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
  )
}

export function Steps({ currentStep, children, className }) {
  const childrenArray = React.Children.toArray(children)

  const steps = childrenArray.map((step, index) => {
    if (React.isValidElement(step)) {
      return React.cloneElement(step, {
        isActive: currentStep === index + 1,
        isCompleted: currentStep > index + 1,
      })
    }
    return step
  })

  return (
    <div className={cn("space-y-4", className)}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-start">
          <div className="flex-1">{step}</div>
          {index < steps.length - 1 && (
            <div className="hidden sm:flex w-full items-center">
              <div className="w-full border-t border-gray-200 ml-4 mr-4"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
