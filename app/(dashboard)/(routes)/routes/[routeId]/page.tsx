import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";

// Components
import { SearchInput } from "@/components/search-input";
import { CoursesList } from "@/components/courses-list";
import { Categories } from "./_components/categories";

// DB Actions
import { db } from "@/lib/db";
import { getCourses } from "@/actions/get-courses";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async (params: { params: { routeId: string } }) => {
  const user = await currentUser();
  const userId = user?.userId;
  const {routeId} = params.params
  if (!userId) {
    return redirect("/auth/login");
  }

  // const categories = await db.category.findMany({
  //   orderBy: {
  //     name: 'asc',
  //   },
  // });

  const courses = await getCourses({ userId, routeId });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        {/* <SearchInput /> */}
      </div>
      <div className="p-6 space-y-4">
        {/* <Categories items={categories} /> */}
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
