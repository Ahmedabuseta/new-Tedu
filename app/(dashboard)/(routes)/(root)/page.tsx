import { redirect } from 'next/navigation';

import { currentUser } from "@/lib/auth";
import { CheckCircle, Clock } from 'lucide-react';

import { CoursesList } from '@/components/courses-list';
import { InfoCard } from './_components/info-card';

import { getDashboardCourses } from '@/actions/get-dashboard-courses';

export default async function Dashboard() {
  const user = await currentUser()
  const userId = user?.userId;
  if (!userId) {
    return redirect('/');
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
