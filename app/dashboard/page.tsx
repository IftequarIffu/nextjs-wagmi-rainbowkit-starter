/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import * as React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, LayoutDashboard, ShoppingBag, Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAccount } from 'wagmi';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import MintNftModal from '@/components/MintNftModal'


export default function Dashboard() {
  const nfts = [
    { id: 1, name: "Cosmic Voyager #1", price: "0.5 ETH", image: "/6.svg" },
    { id: 2, name: "Digital Dream #42", price: "0.7 ETH", image: "/7.svg" },
    { id: 3, name: "Neon Nebula #7", price: "0.3 ETH", image: "/8.svg" },
    { id: 4, name: "Pixel Paradise #13", price: "0.6 ETH", image: "/9.svg" },
    { id: 5, name: "Ethereal Echo #21", price: "0.4 ETH", image: "/10.svg" },
  ]
  
  interface NFT {
    id: number
    name: string
    price: string
    image: string
  }

  const [selectedNFT, setSelectedNFT] = React.useState<NFT | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const openModal = (nft: NFT) => {
    setSelectedNFT(nft)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedNFT(null)
    setIsModalOpen(false)
  }


  const {address} = useAccount()

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className='bg-background border-border'>
          <SidebarHeader>
            <SidebarMenuButton size="lg">
              <div className="flex items-center space-x-2">
                {/* <div className="rounded-full bg-primary p-1">
                  <PlusCircle className="h-4 w-4 text-primary-foreground" />
                </div> */}
                <span className="font-bold text-2xl tracking-wider ms-4">CartooNFT</span>
              </div>
            </SidebarMenuButton>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className='space-y-2 mt-4'>
              <SidebarMenuItem >
                <SidebarMenuButton asChild isActive>
                  <Link href="/dashboard" className="flex items-center space-x-2 ps-6">
                    <LayoutDashboard className="h-4 w-4" />
                    <span className='text-lg'>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className='ms-3'>
                <SidebarMenuButton asChild>
                  <Link href="/marketplace" className="flex items-center space-x-2">
                    <ShoppingBag className="h-4 w-4" />
                    <span className='text-lg'>Marketplace</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <span className='mt-auto text-ellipsis w-full'>{`${address}`}</span>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="flex flex-col flex-grow w-full">
          <header className="flex h-16 items-center gap-4 border-border px-6 w-full">
            <SidebarTrigger />
            <div className="flex flex-1 items-center space-x-4">
              <form className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search NFTs..."
                    className="w-full pl-8 md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-y-auto w-full p-6">
            <h1 className="mb-8 text-2xl font-bold">My NFTs</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {nfts.map((nft) => (
                <Card key={nft.id} className="overflow-hidden border-none hover:bg-secondary hover:cursor-pointer p-2">
                  <CardHeader className="p-0">
                  <div className="group relative w-64 h-64 overflow-hidden">
                    <Image
                      src={nft.image}
                      alt={nft.name}
                      width={50}
                      height={50}
                      className="h-48 w-full object-contain transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                    />
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 py-2 flex flex-col space-y-1">
                    <CardTitle>{nft.name}</CardTitle>
                    <p className="text-sm text-gray-500">{nft.price}</p>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Button className="w-full" onClick={() => openModal(nft)}>View Details</Button>
                  </CardFooter>
                </Card>
              ))}
              {/* <Card className="flex items-center justify-center">
                <CardContent>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-24 w-24 rounded-full"

                  >
                    <PlusCircle className="h-12 w-12" />
                    <span className="sr-only">Add new NFT</span>
                  </Button>
                </CardContent>
              </Card> */}
              <MintNftModal />
            </div>
          </main>
        </SidebarInset>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedNFT?.name}</DialogTitle>
            <DialogDescription>NFT Details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              {selectedNFT && (
                <Image
                  src={selectedNFT.image}
                  alt={selectedNFT.name}
                  layout="fill"
                  objectFit="contain"
                />
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold">Price:</span>
              <span>{selectedNFT?.price}</span>
            </div>
            <Button onClick={() => console.log(`Listing NFT: ${selectedNFT?.name}`)}>
              List NFT
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}