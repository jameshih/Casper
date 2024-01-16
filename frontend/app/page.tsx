import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl h-screen flex flex-col justify-center items-center">
        <div className="w-full h-2/3 p-12 flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24 ">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold uppercase">John Doe</h1>
          <p className="w-full break-all">
            Donate GHO to support the development of
            baskjfbkesjhfwedasdjalsijdalsjdkljaslkdjlasjdkjaslkdjklasjdlkajskldjalskjdkljaslkdjsalkjdlkajslkdjaslkjdlkasjdlkjaslkdjasljdlasjdlkasjdlajshfwehfkhwekfhkwejhfkwehkjfhwekjfhwekjhwekjfhweblahblahblah...
          </p>
        </div>
        <div className="w-full p-12 flex flex-col items-center space-y-1">
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
        </div>
      </div>
    </div>
  );
}
