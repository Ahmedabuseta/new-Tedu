import Image from "next/image";
import SidebarRoutes from "./sidebar-routes";
import pioneer from '@/public/text-logo2.png'
import Logo from "./logo";
const Sidebar = () => {
  return (
    <div className="h-full border-r border-slate-100 flex flex-col overflow-y-auto shadow-sm backdrop-filter  backdrop-blur-lg  bg-opacity-30">
      <div className="p-6">
        <Logo />
      </div>

      <div className="flex flex-col h-full w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
