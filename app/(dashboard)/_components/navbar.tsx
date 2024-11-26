import NavbarRoutes from '@/components/navbar-routes';

import MobileSidebar from './mobile-sidebar';
import { ModeToggle } from '@/components/mode-toggle';

const Navbar = () => {
  return (
    <div className="p-4 border-b border-sky-100 h-full flex items-center backdrop-blur-md  shadow-sm">
      <MobileSidebar />
      
      <NavbarRoutes />
      <ModeToggle />
    </div>
  );
};

export default Navbar;
