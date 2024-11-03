/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAccount, useReadContract } from 'wagmi'
import { basicNftAbi, marketPlaceAbi, NFT_MARKETPLACE_CONTRACT_ADDRESS } from '@/lib/constants'
import NftCard from '@/components/NftCard'
import { categories } from '@/lib/constants'
import { config } from '@/lib/wagmiConfig'
import { readContract } from '@wagmi/core'

// const categories = ['Art', 'Music', 'Virtual Worlds', 'Trading Cards', 'Collectibles', 'Sports', 'Utility']

export default function Marketplace() {

    const {address} = useAccount()

    let listingPrice = Number(useReadContract({
        abi: marketPlaceAbi,
        address: NFT_MARKETPLACE_CONTRACT_ADDRESS,
        functionName: 'getListingPrice',
        // args: [BigInt(0)]
        account: address
      }).data)

    listingPrice = listingPrice/(10**18)
    
    console.log("Listing Price: ", listingPrice)

    const basicNftAddress: `0x${string}` = useReadContract({
        abi: marketPlaceAbi,
        address: NFT_MARKETPLACE_CONTRACT_ADDRESS,
        functionName: 'getBasicNftContractAddress'
      }).data as `0x${string}`

    // const useNumberOfLikesOfAnNft = (tokenId: number) => {
    //     return Number(useReadContract({
    //     abi: basicNftAbi,
    //     address: basicNftAddress,
    //     functionName: 'getNumberOfLikesOfAnNft',
    //     args: [BigInt(tokenId)]
    //   }).data)
    // }


  // const [nfts, setNfts] = React.useState([
  //   { id: 1, name: "Cosmic Voyager #1", price: "0.5 ETH", category: "Art", likes: 24, image: "/1.svg" },
  //   { id: 2, name: "Digital Dream #42", price: "0.7 ETH", category: "Music", likes: 18, image: "/2.svg" },
  //   { id: 3, name: "Neon Nebula #7", price: "0.3 ETH", category: "Virtual Worlds", likes: 31, image: "/3.svg" },
  //   { id: 4, name: "Pixel Paradise #13", price: "0.6 ETH", category: "Art", likes: 27, image: "/4.svg" },
  //   { id: 5, name: "Ethereal Echo #21", price: "0.4 ETH", category: "Music", likes: 22, image: "/5.svg" },
  //   { id: 6, name: "Quantum Quasar #9", price: "0.8 ETH", category: "Collectibles", likes: 36, image: "/6.svg" },
  //   // Add more NFTs as needed
  // ])

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 1])
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const [sortOption, setSortOption] = React.useState('recent')
  const [notSoldNfts, setNotSoldNfts] = React.useState(false)

  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 4


  type NftType = {
    tokenId: bigint;
    name: string;
    isListed: boolean;
    isSold: boolean;
    price: bigint;
    tokenUri: string;
    owner: `0x${string}`;
    category: string;
    mintDate: string;
    numberOfLikes: bigint;
}

  
    


  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handlePriceRangeChange = (newValues: number[]) => {
    setPriceRange([newValues[0], newValues[1]])
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSortChange = (value: string) => {
    setSortOption(value)
  }

  const handleNotSoldChange = (checked: boolean) => {
    setNotSoldNfts(checked)
    setCurrentPage(1)
  }

  // const [listedNfts, setListedNfts] = React.useState()


  const {data: listedNftsTokenIds, queryKey: getListedNftsTokenIdsQueryKey} = useReadContract({
    abi: basicNftAbi,
    address: basicNftAddress,
    functionName: 'getListedNftsTokenIds',
    // args: [BigInt(0)]
    account: address
  })

//   const useFetchNft = (tokenId: number, address: `0x${string}`, basicNftAbi: any, basicNftAddress: `0x${string}`) => {
//     return useReadContract({
//         abi: basicNftAbi,
//         address: basicNftAddress,
//         functionName: 'getNftFromTokenId',
//         args: [tokenId],
//         account: address,
//     });
// };

  const fetchNft = async(tokenId: number) => {
    const result = await readContract(config, {
      abi: basicNftAbi,
      address: basicNftAddress,
      functionName: 'getNftFromTokenId',
      args: [BigInt(tokenId)]
    })

    return result
  }


  const [listedNfts, setListedNfts] = React.useState<NftType[] | undefined>();

  React.useEffect(() => {
    if (!listedNftsTokenIds) return;

    const fetchNfts = async () => {
      const nftData = await Promise.all(
          listedNftsTokenIds.map(async (tokenId) => {
              const nft = await fetchNft(Number(tokenId));
              console.log("Nft in Fetch NFTs: ", fetchNfts)
              return nft;
          })
      );
      setListedNfts(nftData.filter(Boolean) as NftType[]); // Filter out any undefined results
  };

    fetchNfts();
}, [listedNftsTokenIds, basicNftAddress]);

  // React.useEffect(() => {

  //   if(listedNftsTokenIds) {
  //     listedNf
  //   }

  // }, [listedNftsTokenIds, listedNfts])


  // const myLikedNfts = useReadContract({
  //   abi: basicNftAbi,
  //   address: basicNftAddress,
  //   functionName: 'getMyLikedNfts',
  //   // args: [BigInt(0)]
  //   account: address
  // }).data

  // console.log("My Liked NFTs: ", myLikedNfts)


  // const {data: listedNfts, queryKey: getListedNftsQueryKey} = useReadContract({
  //   abi: basicNftAbi,
  //   address: basicNftAddress,
  //   functionName: 'getListedNfts',
  //   // args: [BigInt(0)]
  //   account: address
  // })

  

//   const filteredNFTs = React.useMemo(() => {
//     if (selectedCategories.length === 0) return listedNfts
//     return listedNfts?.filter(nft => selectedCategories.includes(nft.category))
//   }, [listedNfts, selectedCategories])

// const filteredNFTs = React.useMemo(() => {
//     const result = listedNfts?.filter(nft => {

//       const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(nft.category)
//       const priceMatch = Number(nft.price)/(10**18) >= priceRange[0] && Number(nft.price)/(10**18) <= priceRange[1]
//       const searchMatch = nft.name.toLowerCase().includes(searchQuery.toLowerCase())
//       // let sellStatusMatch = false;
//     //   if((notSoldNfts && !nft.isSold)) {
//     //     sellStatusMatch = true
//     //   }
      
//       const notSoldMatch = !notSoldNfts || !nft.isSold   
//       console.log("Not Sold filter: ", notSoldMatch)
//       return categoryMatch && priceMatch && searchMatch && notSoldMatch
//     //   && sellStatusMatch
//     })

//     switch (sortOption) {
//         case 'recent':
//           return result?.sort((a, b) => new Date(b.mintDate).getTime() - new Date(a.mintDate).getTime())
//         case 'price-low':
//           return result?.sort((a, b) => Number(a.price) - Number(b.price))
//         case 'price-high':
//           return result?.sort((a, b) => Number(b.price) - Number(a.price))
//         case 'likes':
//           return result?.sort((a, b) => Number(b.numberOfLikes) - Number(a.numberOfLikes))
//         default:
//           return result
//       }

//     // return result
//   }, [listedNfts, selectedCategories, priceRange, searchQuery, sortOption])

const filteredNFTTokenIds = React.useMemo(() => {
  const result = listedNfts
      ?.filter(nft => {
          const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(nft.category);
          const priceMatch = Number(nft.price) / (10 ** 18) >= priceRange[0] && Number(nft.price) / (10 ** 18) <= priceRange[1];
          const searchMatch = nft.name.toLowerCase().includes(searchQuery.toLowerCase());
          const notSoldMatch = !notSoldNfts || !nft.isSold;
          
          return categoryMatch && priceMatch && searchMatch && notSoldMatch;
      })
      .map(nft => nft.tokenId); // Extract only the tokenId of each matching NFT

  switch (sortOption) {
      case 'recent':
          return result?.sort((a, b) => {
              const nftA = listedNfts?.find(nft => nft.tokenId === a);
              const nftB = listedNfts?.find(nft => nft.tokenId === b);
              return new Date(nftB?.mintDate as unknown as Date).getTime() - new Date(nftA?.mintDate as unknown as Date).getTime();
          });
      case 'price-low':
          return result?.sort((a, b) => {
              const nftA = listedNfts?.find(nft => nft.tokenId === a);
              const nftB = listedNfts?.find(nft => nft.tokenId === b);
              return Number(nftA?.price) - Number(nftB?.price);
          });
      case 'price-high':
          return result?.sort((a, b) => {
              const nftA = listedNfts?.find(nft => nft.tokenId === a);
              const nftB = listedNfts?.find(nft => nft.tokenId === b);
              return Number(nftB?.price) - Number(nftA?.price);
          });
      case 'likes':
          return result?.sort((a, b) => {
              const nftA = listedNfts?.find(nft => nft.tokenId === a);
              const nftB = listedNfts?.find(nft => nft.tokenId === b);
              return Number(nftB?.numberOfLikes) - Number(nftA?.numberOfLikes);
          });
      default:
          return result;
  }
}, [listedNfts, selectedCategories, priceRange, searchQuery, sortOption, notSoldNfts]);



  let totalPages = 0;
  // if(filteredNFTs?.length !== undefined && filteredNFTs?.length !=0 ){
  //   totalPages = Math.ceil(filteredNFTs?.length / itemsPerPage)
  // }

  if(filteredNFTTokenIds?.length !== undefined && filteredNFTTokenIds?.length !=0 ){
    totalPages = Math.ceil(filteredNFTTokenIds?.length / itemsPerPage)
  }


  // const currentNFTs = filteredNFTs?.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  //   )

  const currentNFTsTokenIds = filteredNFTTokenIds?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
    )

    const goToPage = (page: number) => {
        setCurrentPage(page)
      }
      
      const goToPreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1))
      }
      
      const goToNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages))
      }



  console.log("Listed NFTs: ", listedNfts)

  console.log("Price Range: ", priceRange[0], priceRange[1])

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <aside className="w-64  p-6 hidden lg:block">
        <Link href={"/"}>
            <h1 className="text-3xl font-bold mb-4 sm:mb-0">CartooNFT</h1>
        </Link>
        <h2 className="text-lg font-semibold mb-4 mt-20">Filters</h2>
        {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search NFTs..."
              className="pl-10 w-full sm:w-64"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div> */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Price Range</label>
            {/* <Slider defaultValue={[0, 100]} max={100} step={1} className="mt-2" /> */}
            <Slider
                value={priceRange}
                min={0}
                max={1}
                step={0.1}
                className="mt-2"
                onValueChange={handlePriceRangeChange}
            />
            <div className="flex justify-between mt-1">
                <span className="text-sm">{priceRange[0]} ETH</span>
                <span className="text-sm">{priceRange[1]} ETH</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Categories</label>
            <div className="mt-2 space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox 
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label htmlFor={category} className="ml-2 text-sm">{category}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium flex items-center justify-between">
              Not Sold
              <Switch checked={notSoldNfts}
                onCheckedChange={handleNotSoldChange} />
            </label>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <Link href={"/dashboard"}>
                <Button className='bg-border text-white hover:text-black'>
                  <ChevronLeft />
                  Back to Dashboard
                  
                </Button>
                {/* <h1 className="text-3xl font-bold mb-4 sm:mb-0">CartooNFT</h1> */}
            </Link>
            {/* <p>Listing Price: {listingPrice}</p> */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search NFTs..."
                  className="pl-10 w-full sm:w-64"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Select onValueChange={handleSortChange} value={sortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="likes">Most Liked</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <ThemeToggle />
            </div>
          </header>

          {/* NFT Grid */}
          <h1 className="text-2xl font-bold mb-12">Marketplace</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
            {currentNFTsTokenIds?.map((tokenId: any) => (
            //   <Card key={nft.id} className="overflow-hidden">
            //     <CardHeader className="p-0">
            //       <div className="relative aspect-square">
            //         <Image
            //           src={nft.image}
            //           alt={nft.name}
            //           layout="fill"
            //           objectFit="contain"
            //         />
            //       </div>
            //     </CardHeader>
            //     <CardContent className="p-4">
            //       <CardTitle className="text-lg">{nft.name}</CardTitle>
            //       <div className="flex justify-between items-center mt-2">
            //         <span className="text-sm text-gray-500">{nft.price}</span>
            //         <Badge>{nft.category}</Badge>
            //       </div>
            //     </CardContent>
            //     <CardFooter className="p-4 flex justify-between items-center">
            //       <Button variant="outline" size="sm">
            //         View Details
            //       </Button>
            //       <div className="flex items-center space-x-1">
            //         <Heart className="h-4 w-4 text-gray-400" />
            //         <span className="text-sm text-gray-500">{nft.likes}</span>
            //       </div>
            //     </CardFooter>
            //   </Card>
            <NftCard key={tokenId} nftsTokenId={tokenId}/>
            ))}
          </div>

          {/* Pagination */}
          {/* <div className="mt-8 flex justify-center">
            <Button variant="outline" className="mx-1">Previous</Button>
            <Button variant="outline" className="mx-1">1</Button>
            <Button variant="outline" className="mx-1">2</Button>
            <Button variant="outline" className="mx-1">3</Button>
            <Button variant="outline" className="mx-1">Next</Button>
          </div> */}
          <div className="mt-8 flex justify-center items-center space-x-2">
            <Button
                variant="outline"
                size="icon"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
            >
                <ChevronLeft  className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => goToPage(page)}
                >
                {page}
                </Button>
            ))}
            <Button
                variant="outline"
                size="icon"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
            </div>
        </div>
      </main>
    </div>
  )
}