import DarkLightToggle from "@/components/shadCn/DarkLightToggle";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" font-bold w-full h-screen relative">
      <div className="flex flex-col gap-10 items-center justify-center h-full">
        <h1 className="text-6xl">Adding dark mode switcher</h1>
        <h2 className="text-4xl">
          <span className=" rounded p-2 bg-muted-foreground text-white">
            shadcn
          </span>
        </h2>
        <DarkLightToggle />
          <Link className="hover:text-primary duration-150 ease-in-out cursor-pointer" href="/cloudinary">Couldinary</Link>
          <Link className="hover:text-primary duration-150 ease-in-out cursor-pointer" href="/myuploader">My Uploader</Link>
      </div>
    </main>
  );
}
