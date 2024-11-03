'use client'
import { basicNftAbi, marketPlaceAbi, NFT_MARKETPLACE_CONTRACT_ADDRESS } from '@/lib/constants';
import { QueryKey } from '@tanstack/react-query';
import React, { ReactNode, useEffect, useState } from 'react'
import { createContext, useContext } from 'react'
import { useAccount, useReadContract } from 'wagmi';

type ContextType = { 
    basicNftContractAddress: `0x${string}`; 
    myNfts: NftArrayType | undefined;
    getMyNftsQueryKey: QueryKey | undefined;
    accountAddress: `0x${string}`;
 }


const AppContext = createContext<ContextType | undefined>(undefined);

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

type NftArrayType = readonly NftType[]


export const AppContextProvider = ({children}: {children: ReactNode}) => {


    const [accountAddress, setAccountAddress] = useState("")
    const [basicNftContractAddress, setBasicNftContractAddress] = useState("")
    const [myNfts, setMyNfts] = useState<NftArrayType | undefined>()
    const [myLikedNfts, setMyLikedNfts] = useState<NftArrayType | undefined>()
    const [listedNfts, setListedNfts] = useState<NftArrayType | undefined>()
    
    const [getMyNftsQueryKey, setGetMyNftsQueryKey] = useState<QueryKey | undefined>()



    const {address} = useAccount()

    useEffect(() => {
        if (address) {
            setAccountAddress(address)
        }
    }, [address])


    const basicNftAddress: `0x${string}` = useReadContract({
        abi: marketPlaceAbi,
        address: NFT_MARKETPLACE_CONTRACT_ADDRESS,
        functionName: 'getBasicNftContractAddress'
      }).data as `0x${string}`

    // setBasicNftContractAddress(basicNftAddress)

    useEffect(() => {
        if (basicNftAddress) {
            setBasicNftContractAddress(basicNftAddress)
        }
    }, [basicNftAddress])
    
    //   console.log("Basic Nft address: ", basicNftAddress)

    const {data: myNftsData, queryKey: myNftsQueryKey} = useReadContract({
        abi: basicNftAbi,
        address: basicNftAddress,
        functionName: 'getMyNfts',
        // args: [BigInt(0)]
        account: address
    })

    // setMyNfts(myNftsData)
    // setGetMyNftsQueryKey(myNftsQueryKey)

    useEffect(() => {
        if (myNftsData) {
            setMyNfts(myNftsData)
            setGetMyNftsQueryKey(myNftsQueryKey)
        }
    }, [myNftsData, myNftsQueryKey])


    const {data: myLikedNftsData, queryKey: getMyLikedNftsQueryKey} = useReadContract({
        abi: basicNftAbi,
        address: basicNftAddress,
        functionName: 'getMyLikedNfts',
        // args: [BigInt(0)]
        account: address
      })

    // setMyLikedNfts(myLikedNftsData)
    useEffect(() => {
        if (myLikedNftsData) {
            setMyLikedNfts(myLikedNftsData)
            
        }
    }, [myLikedNftsData])

      const {data: listedNftsData, queryKey: getListedNftsQueryKey} = useReadContract({
        abi: basicNftAbi,
        address: basicNftAddress,
        functionName: 'getListedNfts',
        // args: [BigInt(0)]
        account: address
      })

      useEffect(() => {
        if (listedNftsData) {
            setListedNfts(listedNftsData)
        }
    }, [listedNftsData])

    // setListedNfts(listedNftsData)


    // const getMyNfts = () => {

    // }


    const contextValue = {
        basicNftContractAddress,
        myNfts,
        getMyNftsQueryKey,
        accountAddress
    }




  return (
    <AppContext.Provider value={contextValue}>
        {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
      throw new Error("useAppContext must be used within a AppContextProvider");
    }
    return context;
}