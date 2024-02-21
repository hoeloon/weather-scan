"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Search, Trash } from "lucide-react"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [search, setSearch] = useState(false);
  const [error, setError] = useState(false);
  const [current, setCurrent] = useState<any>({});
  const [histories, setHistories] = useState([])

  const  getDateTime = () => {
    return new Date().toLocaleString() + ""
  }

  const handleDelete = (e:any) => {
    const value1 = e.currentTarget.getAttribute("data-value")
    console.log(value1)
    var tempLocalStorage = localStorage.getItem("history")
    var tempHistories = []
    if (tempLocalStorage !== null){
      tempHistories = JSON.parse(tempLocalStorage)
    }
    const idx = tempHistories.indexOf(value1);
    tempHistories.splice(idx, idx !== -1 ? 1 : 0);
    localStorage.setItem('history', JSON.stringify(tempHistories))
  }

   function handleSearch() {
    console.log(search)

    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=a50ee6d2afa1eb2029d4ad931f75cfd7`)
    .then(data => {
      console.log(data.data)
      setError(false)
      const temp = {
        data,
        datetime: getDateTime()
      }
      setCurrent({
        data,
        datetime: getDateTime()
      })
      console.log("temp", temp)
      console.log("current", current)
      var tempLocalStorage = localStorage.getItem("history")
      var tempHistories = []
      if (tempLocalStorage !== null){
        tempHistories = JSON.parse(tempLocalStorage)
      }
      tempHistories.push(temp)
      localStorage.setItem('history', JSON.stringify(tempHistories))
    })
    .catch(error => {
      console.log(error)
      setError(true)
    });
  };
  useEffect(() => {
    var tempLocalStorage = localStorage.getItem("history")
    var histories = []
    if (tempLocalStorage !== null){
      histories = JSON.parse(tempLocalStorage)
    }
    setHistories(histories)
  },[]);
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-128 ">

        {/* search bar */}
        <div className="flex-auto">

            <Input onChange={(e: any) => setSearch(e.target.value)}/>
            <Button className="rounded-2xl" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>


        </div>


        {/* main content */}
        <div className="p-6 shadow-lg bg-white bg-opacity-20 rounded-2xl">
          {current && (
            <div>
            <p>Today's Weather</p>
            <div className="flex justify-between items-end">
              <p className="text-6xl">{current?.data?.data?.main?.temp}°</p>
              <p></p>
            </div>
            <div className="flex justify-between items-end">
              <p>H: {current?.data?.data?.main?.temp_max }° L: {current?.data?.data?.main?.temp_min  }°</p>
              <p>Humidity: {current?.data?.data?.main?.humidity}%</p>
            </div>
            <div className="flex justify-between items-end">
              <p>{current?.data?.data?.name}, {current?.data?.data?.sys?.country}</p>
              <p>{current?.datetime}</p>
            </div>
          </div>
          )}



          <div className="flex flex-col p-5 bg-white bg-opacity-20 rounded-2xl ">
            <div><p>search History</p></div>
            
            {histories && histories.map((item: any, index) => (
              <div className="flex justify-between p-5 bg-white bg-opacity-20 rounded-2xl" key={index}>
              <div flex-col>
                <p>{item.data.data.name}, {item.data.data.sys.country}{index}</p>
                <p>{item.datetime}</p>
              </div>
              <div className="flex pr-2">
                <Button className="btn rounded-full">
                  <Search className="h-4 w-4" />
                </Button>
                <Button className="btn rounded-full" data-value={index} onClick={handleDelete}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            ))}


          </div>
        </div>
        
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
