import Link from 'next/link';
import { redirect } from 'next/navigation';

import { currentUser } from "@/lib/auth";

// Components
import { Button } from '@/components/ui/button';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

// Database
import { db } from '@/lib/db';

const CoursesPage = async () => {
  const user = await currentUser()
  const userId = user?.userId;
  console.log(userId,user);

  if (!userId) {
    return redirect('/');
  }

  const routes = await db.route.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={routes} />
    </div>
  );
};

export default CoursesPage;
