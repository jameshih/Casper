"use client";
import { useSearchParams } from "next/navigation";
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
import GHO_ABI from "../../lib/contracts/GHO_ABI.json";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";
import LZString from "lz-string";
import Link from "next/link";

const contract_address = "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60"; //GHO on Sepolia

export default function UserPage() {
  const [context, setContext] = useState({
    name: "[Name]",
    address: "[Address]",
    description: "[Description]",
  });
  const { address, isConnecting, isDisconnected } = useAccount();
  const [myGHOBalance, setMyGHOBalance] = useState("");
  const [tip, setTip] = useState("0");

  const param = useSearchParams();
  const q = param.get("q");

  useEffect(() => {
    const decompressed = LZString.decompressFromBase64(q);
    setContext(JSON.parse(decompressed));
  }, [q]);

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
    args: [context.address, parseEther(tip)],
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
          <h1 className="text-3xl font-bold uppercase">{context.name}</h1>
          <Badge variant="outline" className="bg-purple-100 p-2">
            <a
              href={`https://sepolia.etherscan.io/address/${context.address}`}
              target="_blank"
            >
              {context.address}
            </a>
          </Badge>
          <p className="w-full break-normal text-center">
            {context.description}
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
          <Link href="/" className="pt-4 underline">
            Create My GHO Widget
          </Link>
        </div>
      </div>
    </div>
  );
}
