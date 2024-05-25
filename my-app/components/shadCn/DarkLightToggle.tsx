"use client";
import { useTheme } from "next-themes";
import React from "react";
import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";
import { Switch } from "@/components/ui/switch"


export default function DarkLightToggle() {
  const { setTheme } = useTheme();
  const [usedTheme, setUsedTheme] = React.useState("dark");

  return (
      <Switch onClick={() => {setTheme(usedTheme === 'dark' ? 'light' : 'dark') , setUsedTheme(usedTheme === 'dark' ? 'light' : 'dark') }} />
    // <div className="flex gap-10 text-4xl mt-10">
    //   <button onClick={() => setTheme("dark")}><IoMoonSharp/></button>
    //   <button onClick={() => setTheme("light")}><IoSunnySharp/></button>
    //   <Switch onClick={() => {setTheme(usedTheme === 'dark' ? 'light' : 'dark') , setUsedTheme(usedTheme === 'dark' ? 'light' : 'dark') }} />
    // </div>
  );
}
