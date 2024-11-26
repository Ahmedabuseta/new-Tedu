
import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { IconBadge } from '@/components/icon-badge';

interface WalletCardProps {
  icon: LucideIcon;
  label: string;
  data: string;
  className? :string
 variant?: "default" | "success" | "orange" | "indigo" | null | undefined
}

const WalletCard = ({ icon: Icon, label,data,variant,className }: WalletCardProps) => {
 
  return (

    <div
      className={cn(
        `flex flex-col items-start gap-x-2 rounded-2xl flex-1 border  p-6 shadow-sm bg-opacity-30 dark:bg-black/40 bg-white backdrop-blur-md   text-sm font-[500] pl-6 transition-all  ${className}`,)}
    >
      <div className="flex items-center text-xl gap-x-4 py-4">
        <IconBadge
          size='default'
          variant={variant}
          icon={Icon}
        />
        {label}
      </div>
        <p className='font-bold ps-16 text-3xl'>
          {data}
        </p>
    </div>
  );
};

export default WalletCard;
