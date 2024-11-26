import { redirect } from 'next/navigation';
import { currentUser } from "@/lib/auth";

// Components
import { SearchInput } from '@/components/search-input';

// DB Actions
import { db } from '@/lib/db';
import { RouteList } from './_components/route-list';

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const user = await currentUser()
  const userId = user?.userId;

  if (!userId) {
    return redirect('/');
  }

  // const categories = await db.category.findMany({
  //   orderBy: {
  //     name: 'asc',
  //   },
  // });

  // const courses = await getCourses({ userId, ...searchParams });
  const routes = await db.route.findMany({
    where: {
      userId,
      isPublished:true
    },
    include:{
      courses:true
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        {/* <Categories items={categories} /> */}
        <RouteList items={routes} />
      </div>
    </>
  );
};

export default SearchPage;
