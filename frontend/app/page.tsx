"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ConnectKitButton } from "connectkit";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import GHO_ABI from "../lib/contracts/GHO_ABI.json";
import { useRef, useState } from "react";
import { formatEther, parseEther } from "viem";
import Link from "next/link";

const contract_address = "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60"; //GHO on Sepolia

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [recipient] = useState("0x174199e670194c18645A4e3dD32870c0C882170c");
  const [myGHOBalance, setMyGHOBalance] = useState("");
  const [tip, setTip] = useState("0");

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

  const { config } = usePrepareContractWrite({
    address: contract_address,
    abi: GHO_ABI,
    functionName: "transfer",
    args: [recipient, parseEther(tip)],
  });

  const { isLoading, write } = useContractWrite(config);

  function handleInputChange(e) {
    setTip(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    write?.();
    setTip("0");
  }

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
          <Badge variant="outline" className="bg-purple-100 p-2">
            <Link
              href={`https://sepolia.etherscan.io/address/${recipient}`}
              target="_blank"
            >
              {recipient}
            </Link>
          </Badge>
          <p className="w-full break-all">
            Donate GHO to support the development of
            baskjfbkesjhfwedasdjalsijdalsjdkljaslkdjlasjdkjaslkdjklasjdlkajskldjalskjdkljaslkdjsalkjdlkajslkdjaslkjdlkasjdlkjaslkdjasljdlasjdlkasjdlajshfwehfkhwekfhkwejhfkwehkjfhwekjfhwekjhwekjfhweblahblahblah...
          </p>
        </div>
        <div className="w-full p-12 flex flex-col items-center space-y-1">
          {address && !isLoading ? (
            <>
              <Input
                className="w-full"
                type="number"
                placeholder="Enter amount of GHO to tip"
                value={tip}
                onChange={handleInputChange}
              />
              <Button
                disabled={tip === "" || tip === "0"}
                className="w-full bg-black text-white hover:bg-gray-400 hover:text-white"
                variant="outline"
                onClick={handleSubmit}
              >
                Send Tip
              </Button>
            </>
          ) : isLoading ? (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Processing transaction
            </Button>
          ) : (
            <ConnectKitButton />
          )}
        </div>
      </div>
    </div>
  );
}
