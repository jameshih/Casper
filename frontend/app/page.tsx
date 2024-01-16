"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ConnectKitButton } from "connectkit";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import GHO_ABI from "./contracts/GHO_ABI.json";
import { useState } from "react";
import { formatEther } from "viem";

const contract_address = "0x5d00fab5f2F97C4D682C1053cDCAA59c2c37900D"; //GHO on Sepolia

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [myGHOBalance, setMyGHOBalance] = useState("");

  useContractRead({
    address: contract_address,
    abi: GHO_ABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data: bigint) => {
      setMyGHOBalance(formatEther(data));
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl h-screen flex flex-col justify-center items-center">
        <div className="z-10 absolute right-0 top-0 p-4">
          {address && (
            <>
              <ConnectKitButton />
              <div>My Balance: {myGHOBalance} GHO</div>
            </>
          )}
        </div>
        <div className="w-full h-2/3 p-12 flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24 ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold uppercase">John Doe</h1>
          <p className="w-full break-all">
            Donate GHO to support the development of
            baskjfbkesjhfwedasdjalsijdalsjdkljaslkdjlasjdkjaslkdjklasjdlkajskldjalskjdkljaslkdjsalkjdlkajslkdjaslkjdlkasjdlkjaslkdjasljdlasjdlkasjdlajshfwehfkhwekfhkwejhfkwehkjfhwekjfhwekjhwekjfhweblahblahblah...
          </p>
        </div>
        <div className="w-full p-12 flex flex-col items-center space-y-1">
          {address ? (
            <>
              <Input
                className="w-full"
                type="number"
                placeholder="Enter amount of GHO to tip"
              />
              <Button
                className="w-full bg-black text-white hover:bg-gray-400 hover:text-white"
                variant="outline"
              >
                Send Tip
              </Button>
            </>
          ) : (
            <ConnectKitButton />
          )}
        </div>
      </div>
    </div>
  );
}
