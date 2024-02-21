import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SearchBar } from "./_components/searchbar";


export default function Home() {

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-128 p-6 shadow-lg bg-white rounded-md">
        Hello
        <SearchBar/>
      </div>
      
      {/* <div className="max-w-2xl bg-slate-500">
        <SearchBar/>
        <div className="rounded-sm bg-slate-800 p-10">
          <p>Today's Weather</p>
          <h1>26</h1>

        </div>
        <Button variant="light">Click</Button>
        <Image
                src="weather-scan/vercel.svg"
                alt="Vercel Logo"
                className="dark:invert"
                width={100}
                height={24}
                priority
              />
      </div> */}

    </div>
  );
}
