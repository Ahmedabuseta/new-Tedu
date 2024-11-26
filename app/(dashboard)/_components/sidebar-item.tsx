import { usePathname, useRouter } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { logout } from '@/actions/logout';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  className? :string
}

const SidebarItem = ({ icon: Icon, label, href,className }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === '/' && href === '/') ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    if (label === 'logout') {
      logout();
      return;
    }
    router.push(href);
  };

  return (

    <button
      onClick={onClick}
      type="button"
      className={cn(
        `flex   items-center gap-x-2 text-slate-700 dark:text-slate-100 text-sm font-[500] pl-6 transition-all hover:text-slate-600 dark:hover:bg-slate-300/20 hover:bg-slate-300/70 ${className}`,
        isActive &&
          'text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700 border-r-sky-700 border-r-[3px]'
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn('text-slate-700 dark:text-slate-100', isActive && 'text-sky-700')}
        />
        {label}
      </div>
      <div
        className={cn(
          'ml-auto opacity-0 border-2 border-sky-700 h-full transition-all',
          // isActive && 'opacity-100'
        )}
      />
    </button>
  );
};

export default SidebarItem;
