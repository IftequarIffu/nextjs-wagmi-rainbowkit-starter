'use client'

import * as React from 'react'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


interface NFTMintingProgressProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onUploadToIPFS: () => Promise<string|undefined>
  onMintNFT: () => Promise<void>
}

export function NFTMintingProgress({ isOpen, onOpenChange, onUploadToIPFS, onMintNFT }: NFTMintingProgressProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [error, setError] = React.useState<string | null>(null)


  const steps = [
    { name: 'Uploading to IPFS', description: 'Your NFT is being uploaded to IPFS', action: onUploadToIPFS },
    { name: 'Minting NFT', description: 'Calling the smart contract to mint your NFT', action: onMintNFT },
  ]

  const runStep = async (step: number) => {
    setError(null)
    try {
      await steps[step].action()
      setCurrentStep(step + 1)
    } catch (err) {
      setError(`Error during ${steps[step].name}: ${err instanceof Error ? err.message : String(err)}`)
    }
  }




  React.useEffect(() => {
    if (isOpen && currentStep < steps.length) {
      runStep(currentStep)
    } else if (isOpen && currentStep === steps.length) {
      setTimeout(() => onOpenChange(false), 1000)
    }
  }, [isOpen, currentStep])

  const handleClose = () => {
    setCurrentStep(0)
    setError(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Minting your NFT</DialogTitle>
          <DialogDescription>
            Please wait while we process your NFT.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {steps.map((step, index) => (
            <div key={step.name} className="flex items-center space-x-2">
              {index < currentStep ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : index === currentStep ? (
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium">{step.name}</p>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        {error && (
          <div className="mt-4 p-2 bg-red-100 border border-red-300 rounded-md flex items-center space-x-2">
            <XCircle className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        <Progress value={(currentStep / steps.length) * 100} className="mt-4" />
        {(currentStep === steps.length || error) && (
          <Button onClick={handleClose} className="mt-4 w-full">
            Close
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}