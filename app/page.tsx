"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { AlertCircle, Search, Trash } from "lucide-react"
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import cloud from "../public/cloud.png"
import sun from "../public/sun.png"

export default function Home() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [current, setCurrent] = useState<any>({});
  const [histories, setHistories] = useState([])
  const [done, setDone] = useState(false)

  const openWeatherMapAPIKey = "a50ee6d2afa1eb2029d4ad931f75cfd7"

  const  getDateTime = () => {
    return new Date().toLocaleString() + ""
  }

  const insertHistories = (item: any) => {
    var tempHistories = getHistories()
    tempHistories.push(item)
    localStorage.setItem('history', JSON.stringify(tempHistories))
  }

  const getHistories = () => {
    
    var tempLocalStorage = localStorage.getItem("history")
    var histories = []
    if (tempLocalStorage !== null){
      histories = JSON.parse(tempLocalStorage)
    }
    setDone(!done)
    return histories
  }
  
  const handleDelete = (e:any) => {
    
    const index = e.currentTarget.getAttribute("data-value")

    var tempHistories = getHistories()
    const reducedArr = [...tempHistories];
    reducedArr.splice(index, 1);
    localStorage.setItem('history', JSON.stringify(reducedArr))
    setDone(!done)
  }

  const getWeather = (country: string) => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${openWeatherMapAPIKey}`)
    .then((data: any) => {
      setError(false)
      setSearch("")
      if(data?.name === "False"){
        console.log(error)
        setError(true)
        return
      }
      const temp = {
        data,
        datetime: getDateTime()
      }
      setCurrent({
        data,
        datetime: getDateTime()
      })
      insertHistories(temp)
      setDone(!done)
    })
    .catch(error => {
      console.log(error)
      setError(true)
    });
  }

  function handleSearch(e: any) {
    getWeather(search)
  };

  const handleHistorySearch = (e: any) => {
    const country = e.currentTarget.getAttribute("data-value")
    if(country !== ""){
      setSearch(country)
    }
    getWeather(country)
  }

  useEffect(() => {
    var tempLocalStorage = localStorage.getItem("history")
    var histories = []
    if (tempLocalStorage !== null){
      histories = JSON.parse(tempLocalStorage)
    }
    setHistories(histories)
  },[done]);
  
  return (
    <div className="flex justify-center items-top h-screen">
      <div className="w-128 space-y-4 p-5">

        {/* search bar */}
        <div className="flex flex-row space-x-4">
            <Input className="box" value={search} placeholder="Search" onChange={(e: any) => setSearch(e.target.value)}/>
            <Button className="rounded-2xl box" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>


        </div>
        <div className="bg-white bg-opacity-20 rounded-2xl">
          {error && (
            <Alert variant="destructive" className="rounded-2xl">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Not Found
              </AlertDescription>
            </Alert>
          )}

        </div>

        {/* main content */}
        <div className="flex flex-col p-6 shadow-lg bg-white bg-opacity-20 rounded-2xl">
          <div className="">
            <p className="font-bold">{`Today's Weather`}</p>

          </div>
          {current?.data ?
           (
            <div className="pb-6">
              {/* Today's Weather */}

              
              <div className="flex justify-between items-end">
                <p className="text-8xl heading">{current?.data?.data?.main?.temp.toFixed(0)}°</p>
                <div className="flex flex-col justify-end">
                  {
                    current?.data?.data?.weather[0]?.description.toLowerCase().includes("cloud") ?
                      <Image
                        src={cloud}
                        alt="cloud"
                        className="dark:invert"
                        width={100}
                        height={24}
                        priority
                      />
                    :
                      <Image
                        src={sun}
                        alt="sun"
                        className="dark:invert"
                        width={100}
                        height={24}
                        priority
                      />
                    
                  }
                  <div className="flex flex-row justify-end">
                  <p className="capitalize">{current?.data?.data?.weather[0]?.description}</p>
                  </div>
                  
                </div>
                
              </div>
              <div className="flex justify-between items-end">
                <p>H: {current?.data?.data?.main?.temp_max}° L: {current?.data?.data?.main?.temp_min}°</p>
                <p>Humidity: {current?.data?.data?.main?.humidity}%</p>
              </div>
              <div className="flex justify-between items-end">
                <p>{current?.data?.data?.name}, {current?.data?.data?.sys?.country}</p>
                <p>{current?.datetime}</p>
              </div>
            </div>
          ):
            <p className="pb-6">No Result</p>
          }


          {/* Search History */}
          <div className="flexs p-5 bg-white bg-opacity-20 rounded-2xl ">
            <div className="pb-6">
              <p className="font-bold">Search History</p>
            </div>
            <div className="flex flex-col-reverse space-y-4 space-y-reverse ">
              {histories && histories.map((item: any, index) => (
                <div className="flex justify-between p-3 bg-white bg-opacity-20 rounded-2xl" key={index}>

                    <div className="">
                      <p className="font-medium">{item.data.data.name}, {item.data.data.sys.country}</p>
                      <p className="text-xs">{item.datetime}</p>
                    </div>
                    <div className="flex pr-2 space-x-1">
                      <Button className="btn rounded-full box" data-value={item.data.data.name} onClick={handleHistorySearch}>
                        <Search className="h-3 w-3" />
                      </Button>
                      <Button className="btn rounded-full box" data-value={index} onClick={handleDelete}>
                        <Trash className="h-3 w-3" />
                      </Button>

                  </div>
                </div>
              ))
              }
            </div>

          </div>
        </div>
        
      </div>

    </div>
  );
}
