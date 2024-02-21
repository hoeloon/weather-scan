"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { AlertCircle, Search, Trash } from "lucide-react"
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

   function handleSearch(e: any) {
    
    const country = e.currentTarget.getAttribute("data-value")
    console.log("country", country)
    if(country !== null){
      setSearch(country)
    }
    console.log("search", search)
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${openWeatherMapAPIKey}`)
    .then((data: any) => {
      setError(false)
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
  };


  useEffect(() => {
    var tempLocalStorage = localStorage.getItem("history")
    var histories = []
    if (tempLocalStorage !== null){
      histories = JSON.parse(tempLocalStorage)
    }
    setHistories(histories)
    console.log("useEffect")
  },[done]);
  

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
        <div className="bg-white bg-opacity-20 rounded-2xl">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Not Found
              </AlertDescription>
            </Alert>
          )}

        </div>

        {/* main content */}
        <div className="p-6 shadow-lg bg-white bg-opacity-20 rounded-2xl">
          {current?.data ?
           (
            <div>
            <p>{`Today's Weather`}</p>
            <div className="flex justify-between items-end">
              <p className="text-6xl">{current?.data?.data?.main?.temp}°</p>
              <p>{current?.data?.data?.weather[0]?.description}</p>
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
          ):
          <p>no search</p>}



          <div className="flex flex-col p-5 bg-white bg-opacity-20 rounded-2xl ">
            <div><p>search History</p></div>
            
            {histories && histories.map((item: any, index) => (
              <div className="flex justify-between p-5 bg-white bg-opacity-20 rounded-2xl" key={index}>
              <div flex-col>
                <p>{item.data.data.name}, {item.data.data.sys.country}</p>
                <p>{item.datetime}</p>
              </div>
              <div className="flex pr-2">
                <Button className="btn rounded-full" data-value={item.data.data.name} onClick={handleSearch}>
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
