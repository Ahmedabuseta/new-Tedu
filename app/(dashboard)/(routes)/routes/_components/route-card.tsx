import Image from 'next/image';
import Link from 'next/link';

import { BookOpen } from 'lucide-react';

import { IconBadge } from '@/components/icon-badge';

import { formatPrice } from '@/lib/format';

interface routeCardProps {
  id: string;
  title: string;
  imageUrl: string;
  coursesLength: number;
  price: number;
}

export const RouteCard = ({
  id,
  title,
  imageUrl,
  coursesLength,
  price,
}: routeCardProps) => {
  return (
    <Link href={`/routes/${id}`}>
      <div className="group hover:shadow-md hover:-translate-y-1 shadow-lg transition overflow-hidden border rounded-lg p-3 h-full dark:bg-slate-900/50 bg-slate-100/50  backdrop-blur-lg">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          {/* <p className="text-xs text-muted-foreground">{category}</p> */}
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {coursesLength} {coursesLength === 1 ? 'course' : 'courses'}
              </span>
            </div>
          </div>

            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
            </p>
        </div>
      </div>
    </Link>
  );
};
