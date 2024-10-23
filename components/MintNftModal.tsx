'use client'

import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle, Upload } from "lucide-react"
import { Card, CardContent } from './ui/card'
import Image from 'next/image'

export default function MintNftModal() {
  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [image, setImage] = React.useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Submitting NFT:', { name, price, image })
    // Reset form after submission
    setName('')
    setPrice('')
    setImage(null)
    setPreviewUrl(null)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create NFT
        </Button> */}
        <Card className="flex items-center justify-center">
            <CardContent>
                <Button
                variant="outline"
                size="lg"
                className="h-48 w-48 rounded-full"

                >
                <PlusCircle className="h-24 w-24" />
                <span className="sr-only">Add new NFT</span>
                </Button>
            </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New NFT</DialogTitle>
          <DialogDescription>
            Enter the details of your new NFT here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price (ETH)
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <div className="col-span-3 relative">
                {
                    previewUrl && (<button className="absolute top-1 right-2  text-white rounded-full p-1 text-2xl hover:font-extrabold" onClick={() => setPreviewUrl(null)}>
                        &times;
                    </button>)
                }
                
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    {previewUrl ? (
                        
                        <Image
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-contain rounded-lg"
                            width={40}
                            height={40}
                        />
                            
                        
                      
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    )}
                    <input
                      id="image"
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save NFT</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}