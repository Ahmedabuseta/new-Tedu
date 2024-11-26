import { redirect } from "next/navigation";

import { currentUser } from "@/lib/auth";
import { Chapter, Course, UserProgress } from "@prisma/client";

import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";

import { db } from "@/lib/db";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const user = await currentUser();
  const userId = user?.userId;

  if (!userId) {
    return redirect("/auth/login");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: userId,
        courseId: course.id,
      },
    },
  });

  return (
    <div className="h-full flex flex-col overflow-y-auto shadow-sm">
      <Accordion type="single" collapsible  className="p-">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="p- flex flex-col border- text-xl ps-6 text-start text-slate-700 dark:text-slate-100 w-full">
              <h1 className="font-semibold">{course.title} -Playlist</h1>
              {purchase && (
                <div className="mt-5">
                  <CourseProgress
                    variant={progressCount === 100 ? "success" : "default"}
                    value={progressCount}
                  />
                </div>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col w-full">
              {course.chapters.map((chapter) => (
                <CourseSidebarItem
                  key={chapter.id}
                  id={chapter.id}
                  label={chapter.title}
                  isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                  courseId={course.id}
                  isLocked={!chapter.isFree && !purchase}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
