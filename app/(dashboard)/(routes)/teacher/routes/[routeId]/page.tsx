import { redirect } from 'next/navigation';
import { currentUser } from "@/lib/auth";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from 'lucide-react';

import { db } from '@/lib/db';

// Components
import { IconBadge } from '@/components/icon-badge';
import { Banner } from '@/components/banner';
import TitleForm from './_components/title-form';
import DescriptionForm from './_components/description-form';
import ImageForm from './_components/image-form';
// import CategoryForm from './_components/category-form';
import PriceForm from './_components/price-form';
import Actions from './_components/actions';
import MultiSelect from './_components/course-form';
import { getCourses } from '@/actions/route';

const CourseIdPage = async ({ params }: { params: { routeId: string } }) => {
  // To verify if the course creator, is the one editing it
  const user = await currentUser()
  const userId = user?.userId;

  if (!userId) {
    return redirect('/');
  }

  // Query to database to check for presence of course id passed in url
  const route = await db.route.findUnique({
    where: {
      id: params.routeId,
      userId: userId,
    },
    include:{
      courses:{
        orderBy:{
          createdAt:'desc'
        }
      }
    }
  });
  const courses = await getCourses()
  const courseIds = route?.courses.map((course) => course.id) || [];

  if (!route) {
    return redirect('/');
  }

  const requiredFields = [
    route.title,
    route.description,
    route.imageUrl,
    route.price,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!route.isPublished && (
        <Banner
          variant="warning"
          label="This route is unpublished. It will not be visible to the students."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
           routeId={params.routeId}
            isPublished={route.isPublished}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your route</h2>
            </div>
            <TitleForm initialData={route} routeId={route.id} />
            <DescriptionForm initialData={route} routeId={route.id} />
            <ImageForm initialData={route} routeId={route.id} />
            {/* <CategoryForm
              initialData={route}
              routeId={route.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            /> */}
            
          </div>
          <div className="space-y-6">
            {/* <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChaptersForm initialData={route} routeId={route.id} />
            </div> */}
            <div className='w-full'>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your route</h2>
              </div>
              <PriceForm initialData={route} routeId={route.id} />
            </div>
            <MultiSelect initialData={ {courseIds} } routeId={route.id} courses={courses}  />
            {/* <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm initialData={route}routeId={course.id} />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
