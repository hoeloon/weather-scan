"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex justify-end p-3">
        <label className="switch">
        <input type="checkbox" id="theme-switcher" onChange={(event)=>{
          if(event.currentTarget.checked) setTheme("dark")
          else setTheme("light")
        }}/>
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;