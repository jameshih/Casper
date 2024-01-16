"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import LZString from "lz-string";

export default function Home() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");

  function handleSetName(e) {
    setName(e.target.value);
  }

  function handleSetAddress(e) {
    setAddress(e.target.value);
  }
  function handleSetDescription(e) {
    setDescription(e.target.value);
  }

  function handleGetWidget(e) {
    e.preventDefault();
    const data = {
      name: name.trim(),
      address: address.trim(),
      description: description.trim(),
    };
    const compressed = LZString.compressToBase64(JSON.stringify(data));
    const url = `${
      "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
    }/u?q=${compressed}`;
    setCode(
      `[![Casper the Friendly GHO Tipper](https://i.ibb.co/Xjr2hb5/Group-8.png)](${url})`
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl h-screen flex flex-col justify-center items-center">
        <div className="z-10 absolute right-0 top-0 p-4"></div>
        <div className="w-full h-2/3 p-12 flex flex-col items-center space-y-4">
          <h1>Name</h1>
          <Input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={handleSetName}
          />
          <h1>Address</h1>
          <Input
            type="text"
            value={address}
            placeholder="Enter your ETH address"
            onChange={handleSetAddress}
          />
          <h1>Description</h1>
          <Textarea
            value={description}
            placeholder="Enter your bio"
            onChange={handleSetDescription}
          />
          <Button onClick={handleGetWidget}>Get Widget</Button>
        </div>
        <div className="w-full p-12 flex flex-col items-center space-y-1">
          <h1>Add the following code to GitHub README</h1>
          <p className="w-full break-all p-4 border-2 rounded-md border-black bg-gray-200">
            {code}
          </p>
        </div>
      </div>
    </div>
  );
}
