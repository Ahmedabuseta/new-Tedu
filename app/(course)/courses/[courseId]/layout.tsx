import { redirect } from "next/navigation";

import { currentUser } from "@/lib/auth";

// Database & actions
import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import DashboardLayout from "@/app/(dashboard)/layout";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const user = await currentUser();
  const userId = user?.userId;

  if (!userId) {
    return redirect("/auth/login");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId: userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <DashboardLayout>
      <div className="h-full flex  overflow-auto items-start flex-1  gap-6 justify-around">
        {/* <div className="h-[80px] md:pl-80 inset-y-0 w-full z-50">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div> */}{" "}
        <main className="md:pl-  h-full rounded-lg flex-1">{children}</main>
        <div className="  absolute px-4 lg:relative  bottom-0 mt-4  overflow-hidden m-6 lg:flex h-ful w-[80%] md:w-80 flex-col  rounded-2xl bg-sky-200/30 z-50 backdrop-blur-md">
          <CourseSidebar course={course} progressCount={progressCount} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseLayout;
