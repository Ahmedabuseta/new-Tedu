'use client';

import { usePathname } from 'next/navigation';
import { Layout, Compass, List, BarChart, Wallet, Settings, LogOut , TrainTrack } from 'lucide-react';

import SidebarItem from './sidebar-item';

const guestRotues = [
  {
    icon: Layout,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/search',
  },
  {
    icon: Wallet,
    label: 'Wallet',
    href: '/wallet',
  },
  {
    icon: TrainTrack,
    label: 'Routes',
    href: '/routes',
  },
];

const teacherRotues = [
  {
    icon: List,
    label: 'Courses',
    href: '/teacher/courses',
  },
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/teacher/analytics',
  },
  {
    icon: Wallet,
    label: 'Wallet',
    href: '/teacher/wallet',
  },
  {
    icon: TrainTrack,
    label: 'Routes',
    href: '/teacher/routes',
  },
];
const bottomRotues = [
  {
    icon: Settings,
    label: 'Settings',
    href: '/settings',
  },
  {
    icon: LogOut,
    label: 'logout',
    href: '/',
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes('/teacher');

  const routes = isTeacherPage ? teacherRotues : guestRotues;

  return (
    <div className="flex flex-col h-full w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
      <div className='mt-auto flex flex-col w-full'>
      {bottomRotues.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
          className={route.label === 'logout' ? 'hover:bg-red-500/40  dark:hover:bg-red-700/20 ' : ''}
        />
      ))}
      </div>
    </div>
  );
};

export default SidebarRoutes;
