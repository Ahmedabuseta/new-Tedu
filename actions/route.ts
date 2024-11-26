// import { db } from "@/lib/db";

import { db } from "@/lib/db";

// export async function createRoute(values:Route) {
//   const {title , userId ,description,imageUrl ,isPublished,price} = values
//   const route = await db.route.create({
//     data: {
//       title,
//       userId,
//       description,
//       imageUrl,
//       price,
//       isPublished
//     },
//   });
//   return route;
// }

// export async function addCoursesToRoute(routeId: string, courseIds: string[]) {
//   const routeCourses = courseIds.map(courseId => ({
//     routeId,
//     courseId,
//   }));

//   await db.routeCourse.createMany({
//     data: routeCourses,
//     skipDuplicates: true,
//   });

//   console.log(`Courses added to route`);
// }

// export async function findRouteWithCourses(routeId: string) {
//   const route = await db.route.findUnique({
//     where: { id: routeId },
//     include: {
//       courses: {
//         include: {
//           course: true,
//         },
//       },
//     },
//   });
//   return route;
// }


// export async function getPurchasedRoutes(userId: string) {
//   const purchasedRoutes = await db.purchase.findMany({
//     where: {
//       userId,
//       routeId: {
//         not: null,
//       },
//     },
//     include: {
//       route: {
//         include: {
//           courses: {
//             include: {
//               course: true,
//             },
//           },
//         },
//       },
//     },
//   });

//   return purchasedRoutes;
// }

// export async function billRoute(userId: string, routeId: string) {
//   const purchase = await db.purchase.create({
//     data: {
//       userId,
//       routeId,
//     },
//   });
// }

// import { Category, Course, Route } from '@prisma/client';

// import { getProgress } from '@/actions/get-progress';

// type CourseWithProgressWithCategory = Course & {
//   category: Category | null;
//   chapters: { id: string }[];
//   progress: number | null;
// };

// type GetCourses = {
//   userId: string;
//   title?: string;
//   categoryId: string;
// };

export const getCourses = async () => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return courses;
  } catch (error) {
    console.log('[GET_COURSES]', error);
    return [];
  }
};
