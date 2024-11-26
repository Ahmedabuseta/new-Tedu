import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";
import pioneer from '@/public/text-logo2.png'
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold", font.className)}>
        {/* 🔐 Auth */}
        </h1>
        {/* <h1 className={cn("text-3xl font-semibold flex gap-0", font.className)}> */}
      <Image alt="paoneer" className="w-full h-20" src={pioneer} />
 
        {/* </h1> */}
      <p className={"text-muted-foreground text-sm"+`${font.className}`}>{label}</p>
    </div>
  );
};