import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2020-08-27',
// });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export async function purchase(req:Request,{ params }: { params: { routeId: string } }) {
  try {
    const { routeId } =params;
    const user = await currentUser();
    const userId = user?.userId;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    let totalPrice = 0;

    if (routeId) {
      const route = await db.route.findUnique({
        where: { id: routeId },
        include: { courses: true },
      });

      if (!route) {
        return new NextResponse('Route not found', { status: 404 });
      }

      for (const course of route.courses) {
        const coursePurchase = await db.purchase.findUnique({
          where: {
            userId_courseId: {
              userId: userId,
              courseId: course.id,
            },
          },
        });

        if (!coursePurchase) {
          totalPrice = route?.price as number
        }
        // if (coursePurchase) {
        //   totalPrice = route?.price as number - (course.price as number)
        // }
      }
    } 

    if (totalPrice === 0) {
      return new NextResponse('Nothing to purchase', { status: 400 });
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100), // Amount in cents
      currency: 'usd',
      metadata: { userId, routeId },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log('[PURCHASE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
