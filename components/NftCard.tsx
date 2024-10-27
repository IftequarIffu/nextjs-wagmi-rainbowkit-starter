/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from './ui/card'
import Image from 'next/image'
import axios from 'axios'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog'
import { DialogHeader } from './ui/dialog'
import { useWriteContract, useReadContract, useAccount } from 'wagmi'
import { basicNftAbi, marketPlaceAbi, NFT_MARKETPLACE_CONTRACT_ADDRESS } from '@/lib/constants'
import { parseEther } from 'viem'
import { Heart } from 'lucide-react';
import { Badge } from './ui/badge'
import { timeAgo } from '@/lib/utils'


const NftCard = ({nft} : {nft: any}) => {

  const { data: hash, isPending, error,  writeContract } = useWriteContract()



  const {address} = useAccount()

  interface NFT {
    tokenId: number
    price: string
    tokenUri: string
    isListed: boolean
    isSold: boolean
    owner: string
  }

  console.log("Nft: ", nft)

  const [selectedNFT, setSelectedNFT] = React.useState<NFT | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)


  const openModal = (nft: NFT) => {
    setSelectedNFT(nft)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedNFT(null)
    setSelectedNFT(null)
  }

  let listingPrice = Number(useReadContract({
    abi: marketPlaceAbi,
    address: NFT_MARKETPLACE_CONTRACT_ADDRESS,
    functionName: 'getListingPrice',
    // args: [BigInt(0)]
    account: address
  }).data)

  listingPrice = listingPrice/(10**18)

  const basicNftAddress: `0x${string}` = useReadContract({
    abi: marketPlaceAbi,
    address: NFT_MARKETPLACE_CONTRACT_ADDRESS,
    functionName: 'getBasicNftContractAddress'
  }).data as `0x${string}`

  const numberOfLikes = Number(useReadContract({
    abi: basicNftAbi,
    address: basicNftAddress,
    functionName: 'getNumberOfLikesOfAnNft',
    args: [BigInt(nft.tokenId)]
  }).data)

  console.log("Number of Likes: ", numberOfLikes)

  const listNft = async(tokenId: number) => {
    console.log("Listing NFT...")
    console.log("Basic NFT contract address: ", basicNftAddress)
    try {
      writeContract({
        abi: marketPlaceAbi,
        functionName: 'listNft',
        args: [BigInt(tokenId)],
        address: NFT_MARKETPLACE_CONTRACT_ADDRESS,
        account: address,
        value: parseEther('1')
      })
      // writeContract(data?.request)
      console.log("Listing NFT complete...")
    } catch (error: any) {
      console.log("Error while listing: ", error.message)
    }
  }

  const buyNft = async(tokenId: number, valueInEth: number) => {
    console.log("Buying NFT...")
    console.log("Basic NFT contract address: ", basicNftAddress)
    try {
      writeContract({
        abi: basicNftAbi,
        functionName: 'buyNft',
        args: [BigInt(tokenId)],
        address: basicNftAddress,
        account: address,
        value: parseEther(`${valueInEth}`)
      })
      // writeContract(data?.request)
      console.log("Buying NFT complete...")
    } catch (error: any) {
      console.log("Error while buying: ", error.message)
    }
  }


  const likeOrUnlikeNft = async(tokenId: number) => {
    console.log("Liking NFT...")
    console.log("Basic NFT contract address: ", basicNftAddress)
    try {
      writeContract({
        abi: basicNftAbi,
        functionName: 'likeOrUnlikeAnNft',
        args: [BigInt(tokenId)],
        address: basicNftAddress,
        account: address,
        //value: parseEther('1')
      })
      // writeContract(data?.request)
      console.log("Liking NFT complete...")
    } catch (error: any) {
      console.log("Error while Liking: ", error.message)
    }
  }

  const myLikedNfts = useReadContract({
    abi: basicNftAbi,
    address: basicNftAddress,
    functionName: 'getMyLikedNfts',
    // args: [BigInt(0)]
    account: address
  }).data

  let isNftLiked = false;

  if(myLikedNfts){
    for (const nftItem of myLikedNfts) {
      if(nftItem.tokenId == nft.tokenId){
        isNftLiked = true;
        break;
      }
    }
  }
  

  console.log("Errrrrror: ", error)


    const nftTokenUri = nft.tokenUri;

    const [nftName, setNftName] = useState("")
    const [nftImageUrl, setNftImageUrl] = useState("")
    const [nftMintDate, setNftMintDate] = useState("")

    const getNftDetailsFromTokenUri = async(tokenUri: string) => {
      const jsonData = await axios.get(tokenUri)
      return {
        name: jsonData.data.name,
        imageUrl: jsonData.data.image,
        mintDate: jsonData.data.mintDate
      }
    }

    useEffect(() => {
      
      const getDataFromIPFS = async() => {
        const data = await getNftDetailsFromTokenUri(nftTokenUri)
        setNftName(data.name)
        setNftImageUrl(data.imageUrl)
        setNftMintDate(data.mintDate)
      }
      
      getDataFromIPFS()

    }, [])

    console.log("Image Url: ", nftImageUrl)
    console.log("Nft: ", nft)

    if(nft.owner == "0x0000000000000000000000000000000000000000") {
      return null
    }
  

  return (
    <>
    <Card key={Number(nft.tokenId)} className="overflow-hidden border-none hover:bg-secondary hover:cursor-pointer p-2">
        <CardHeader className="p-0">
        <div className="group relative w-64 h-64 overflow-hidden">
          <h1>Minted {timeAgo(new Date(nftMintDate))}</h1>
        <Image
            src={nftImageUrl}
            alt={nftName}
            width={50}
            height={50}
            unoptimized
            className="h-48 w-full object-contain transition-transform duration-300 ease-in-out transform group-hover:scale-110"
        />
        </div>
        </CardHeader>
        <CardContent className="px-4 py-2 flex justify-between">
          <div className='flex-col space-y-1'>
            <CardTitle>{nftName}</CardTitle>
            <p className="text-sm text-gray-500">{Number(nft.price)/(10**18)} ETH</p>
          </div>
          <Badge className='rounded-3xl py-0 px-4'>{nft.category}</Badge>
        </CardContent>
        <CardFooter className="p-4">
        <div className='flex space-x-4 items-center w-full'>
          <Button className="w-full" 
            onClick={() => openModal(nft)}
          >View Details</Button>

            {
              isNftLiked ? 
              (<Heart fill='red' color='red' strokeWidth={0} size={36} onClick={() => likeOrUnlikeNft(nft.tokenId)} />) : 
              (<Heart size={36}  color='red' onClick={() => likeOrUnlikeNft(nft.tokenId)} />)
            }
            {numberOfLikes}
            
        </div>
        
        </CardFooter>
    </Card>
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{nftName}</DialogTitle>
        <DialogDescription>NFT Details</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          {selectedNFT && (
            <Image
              src={nftImageUrl}
              alt={nftName}
              unoptimized
              layout="fill"
              objectFit="contain"
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold">Price:</span>
          <span>{Number(Number(nft.price)/(10**18))} ETH</span>
        </div>
        <div className='flex flex-col space-y-1'>
        {
          nft.isListed == true ? (<Button disabled>Listed</Button>) : (
        
        <Button onClick={async() => {
          console.log(`Listing NFT: ${nftName}`)
          try {
            await listNft(Number(nft.tokenId))
          } catch (error: any) {
            console.log("Errorrrrrrrrrrr: ", error.message)
          }

        }} disabled={isPending}>
          List NFT
        </Button>
        
        )
      }
      {
        nft.isListed == true && nft.isSold == false && (
          <Button onClick={async() => {
            console.log(`Buying NFT: ${nftName}`)
            try {
              await buyNft(Number(nft.tokenId), Number(nft.price)/(10**18))
            } catch (error: any) {
              console.log("Errorrrrrrrrrrr: ", error.message)
            }
  
          }}>
            Buy NFT
        </Button>
        )
      }
      </div>
      </div>
    </DialogContent>
  </Dialog>
  </>

  )
}

export default NftCard