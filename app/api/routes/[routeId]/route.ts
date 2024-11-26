import { NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import Mux from "@mux/mux-node";

import { db } from "@/lib/db";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function DELETE(
  req: Request,
  { params }: { params: { routeId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const route = await db.route.findUnique({
      where: {
        id: params.routeId,
        userId,
      },
      include: {
        courses: {
          include: {
            chapters: {
              include: {
                muxData: true,
              },
            },
          },
        },
      },
    });

    if (!route) {
      return new NextResponse("Not found", { status: 404 });
    }

    for (const course of route.courses) {
      for (const chapter of course.chapters) {
        if (chapter.muxData?.assetId) {
          await Video.Assets.del(chapter.muxData.assetId);
        }
      }
    }

    const deletedRoute = await db.route.delete({
      where: {
        id: params.routeId,
      },
    });

    return NextResponse.json(deletedRoute);
  } catch (error) {
    console.log("[ROUTE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { routeId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.userId;
    const { routeId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { courseIds } = values;
    if (!courseIds) {
      const route = await db.route.update({
        where: {
          id: routeId,
          userId,
        },
        data: {
          ...values,
        },
      });
      return NextResponse.json(route);
    } else {
      const route = await db.route.update({
        where: { id: routeId },
        data: {
          courses: {
            connect: courseIds.map((courseId: string) => ({ id: courseId })),
          },
        },
        include: { courses: true },
      });
      return NextResponse.json(route);
    }
    
  } catch (error) {
    console.log("[Route_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
