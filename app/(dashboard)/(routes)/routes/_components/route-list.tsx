import { Category, Course, Route } from '@prisma/client';

import { CourseCard } from '@/components/course-card';
import { RouteCard } from './route-card';

type CourseWithProgressCategory = Route & {
  courses: { id: string }[];
};

interface RouteListProps {
  items: CourseWithProgressCategory[];
}

export const RouteList = ({ items }: RouteListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <RouteCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            coursesLength={item.courses.length}
            price={item.price!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};
