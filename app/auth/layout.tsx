import trad from "@/public/trad4.jpg";
import Image from "next/image";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative bg-gradient-to-r from-indigo-500 to-cyan-500 md:p-9 p-0 backdrop-blur-md flex items-center justify-center ">
      <div className="w-full h-full absolute inset-0 bg-black opacity-40 backdrop-blur-md -z-10" />
      <div className="flex items-center shadow-md justify-center h-full rounded-md overflow-hidden">
        <Image
          src={trad}
          alt="img"
          className="w-full h-full runded-md hidden lg:block"
        />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
