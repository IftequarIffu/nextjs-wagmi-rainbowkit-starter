/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { IPFS_BASE_URL } from "@/lib/constants";
import { pinata } from "@/lib/pinataConfig";
export const uploadNftToIpfs = async(nftImgUrl: string, name: string) => {


    if(nftImgUrl == "" || nftImgUrl == undefined || nftImgUrl == null) {
      throw new Error("No NFT Image URL")
    }

    try {
      const nftMetadata = {
        name: name,
        image: nftImgUrl,
        mintDate: new Date(),
      }
    //   const keyRequest = await fetch("/api/key");
    //   const keyData = await keyRequest.json();
      console.log("Uploading NFT to IPFS")
      const upload = await pinata.upload.json(nftMetadata)
      const nftCid = upload.IpfsHash
      const nftUrl = `${IPFS_BASE_URL}/${nftCid}`
      console.log("Uploaded NFT to IPFS at: ", nftUrl)
      return nftUrl;
    } catch (error: any) {
      console.log("Trouble uploading NFT to IPFS. Error: ", error.message)
    }
    
  }