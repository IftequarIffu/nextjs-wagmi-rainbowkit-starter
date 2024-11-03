/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import * as React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, LayoutDashboard, ShoppingBag, Search, X, Heart, ShoppingCart } from "lucide-react"
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
import NftCard from '@/components/NftCard'
import { useReadContract, useWriteContract, useSimulateContract } from 'wagmi'
import { BASIC_NFT_CONTRACT_ADDRESS, basicNftAbi, marketPlaceAbi, NFT_MARKETPLACE_CONTRACT_ADDRESS } from '@/lib/constants'
import { useQueryClient } from '@tanstack/react-query'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { createElement } from 'react'
import { usePathname } from 'next/navigation'



export default function DashboardPagesSidebarProvider({ children }: { children: React.ReactNode}) {
  
  
  interface NFT {
    id: number
    name: string
    price: string
    image: string
  }

  const pathName = usePathname()

  const basicNftAddress: `0x${string}` = useReadContract({
    abi: marketPlaceAbi,
    address: NFT_MARKETPLACE_CONTRACT_ADDRESS,
    functionName: 'getBasicNftContractAddress'
  }).data as `0x${string}`

  console.log("Basic Nft address: ", basicNftAddress)

  const {address} = useAccount()


  const {data: myNfts, queryKey: readContractsQueryKey} = useReadContract({
    abi: basicNftAbi,
    address: basicNftAddress,
    functionName: 'getMyNfts',
    // args: [BigInt(0)]
    account: address
  })

  console.log("My NFTs: ", myNfts)

  const myLikedNfts = useReadContract({
    abi: basicNftAbi,
    address: basicNftAddress,
    functionName: 'getMyLikedNfts',
    account: address
  }).data

  const sidebarNav = [
    {
        name: "dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "favorites",
        icon: Heart
    },
    {
        name: "purchases",
        icon: ShoppingBag
    },
    {
        name: "marketplace",
        icon: ShoppingCart
    }
]



  return (
    <SidebarProvider>
      <div className="flex h-screen w-full ">
        <Sidebar className=' border-border'>
          <SidebarHeader>
            <SidebarMenuButton size="lg">
              <div className="flex items-center space-x-2">
                <Link href={"/"} >
                    <span className="font-bold text-2xl tracking-wider ms-4">CartooNFT</span>
                </Link>
              </div>
            </SidebarMenuButton>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className='space-y-2 mt-4'>

            {
                sidebarNav.map((item) => {
                    return (
                        <SidebarMenuItem key={item.name} className='ms-3'>
                            <SidebarMenuButton asChild isActive={pathName == `/${item.name}`}>
                                <Link href={`/${item.name}`} className="flex items-center space-x-2">
                                {createElement(item.icon, { className: "h-4 w-4" })}

                                <span className='text-lg'>{item.name[0].toUpperCase() + item.name.slice(1)}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem >
                    )
                })
            }

            </SidebarMenu>
          </SidebarContent>

          <SidebarRail />
        </Sidebar>
        
            {children}

      </div>
          
    </SidebarProvider>
  )
}