import { NextResponse } from 'next/server';
import { currentUser } from "@/lib/auth";

import { db } from '@/lib/db';
import { isTeacher } from '@/lib/teacher';

export async function POST(req: Request) {
  try {
    const user = await currentUser()
  const userId = user?.userId;
    const { title } = await req.json();

    if (!userId || !isTeacher(userId)) {
      return new NextResponse('Unauthorized operation', { status: 401 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log('[COURSES]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
