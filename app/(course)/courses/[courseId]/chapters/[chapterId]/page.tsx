import { redirect } from "next/navigation";

import { currentUser } from "@/lib/auth";
import { File } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Banner } from "@/components/banner";
import { Preview } from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";

// DB & Actions
import { getChapter } from "@/actions/get-chapter";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const user = await currentUser();
  const userId = user?.userId;

  if (!userId) {
    return redirect("/auth/login");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId: userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label="You already completed this chapter." variant="success" />
      )}
      {isLocked && (
        <Banner
          label="You need to purchase this course to watch this chapter."
          variant="warning"
        />
      )}
      <div className="flex flex-col max-w-4l mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-start justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <Tabs defaultValue="description" className=" p-4 h-full w-full text-slate-800  ">
            <TabsList className="w-full p-0 text-slate-80  dark:text-slate-100 rounded-none  bg-sky-100/0 backdrop-blur-lg ">
              <TabsTrigger value="description" className="w-full  py-2">Description</TabsTrigger>
              <TabsTrigger value="attachments" className="w-full py-2 ">Attachments</TabsTrigger>
              <TabsTrigger value="commnets" className="w-full  py-2">Commnets</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="text-center text-slate-800  dark:text-slate-100">
            <div >
            <Preview value={chapter.description!} />
          </div>
            </TabsContent>
            <TabsContent value="attachments" className="text-center text-slate-800  dark:text-slate-100">
            {!!attachments.length && (
            <>
              <Separator />

              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
            </TabsContent>
            <TabsContent value="commnets" className="text-center text-slate-800  dark:text-slate-100">
              no comments yet
            </TabsContent>
          </Tabs>
          {/* <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />

              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
