import { NextResponse } from 'next/server';
import { currentUser } from "@/lib/auth";

import { db } from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { routeId: string } }
) {
  try {
    const user = await currentUser()
  const userId = user?.userId;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const route = await db.route.findUnique({
      where: {
        id: params.routeId,
        userId,
      },
    });

    if (!route) {
      return new NextResponse('Not found', { status: 404 });
    }


    const publishedRoute = await db.route.update({
      where: {
        id: params.routeId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedRoute);
  } catch (error) {
    console.log('[COURSES_COURSE-ID_PUBLISH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
