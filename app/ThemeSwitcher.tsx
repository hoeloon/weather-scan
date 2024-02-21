"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

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
    <div>
      <p>The current theme is: {theme}</p>
        <select value={theme} onChange={e => setTheme(e.target.value)}>
            <option value="system">System</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
        </select>
        <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
    </div>
  );
};

export default ThemeSwitcher;